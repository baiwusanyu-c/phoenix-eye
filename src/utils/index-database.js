/*
* @index-database.js
* @deprecated
* @author czh
* @update (czh 2021/7/8)
*/
// 数据库实例缓存
let WebDataBaseObj = {}
/**
 * 一些不常用的个钩子方法，比如blocked这些,
 * 这个方法用于打印异常信息
 */
let consoleInfo = function (e){
    console.error(e)
}
/**
 * 删除数据库方法
 * @param {String} name - 数据库名称
 * @returns {Promise<unknown>}
 */
export function deleteDataBase (name) {
    return new Promise((resolve, reject) => {
        let DBDeleteRequest = window.indexedDB.deleteDatabase(name);
        DBDeleteRequest.onerror = function (event) {
            console.log(event)
            reject(event)
        };
        DBDeleteRequest.onsuccess = function (event) {
            console.log(event)
            if (Reflect.has(WebDataBaseObj, name)) {
                Reflect.deleteProperty(WebDataBaseObj, name);
            }
            resolve()
        };
        DBDeleteRequest.onblocked = consoleInfo
        DBDeleteRequest.onupgradeneeded =  consoleInfo
    })
}

/**
 * 获取开启过的，未关闭删除的数据库实例
 * @param {String} name - 数据库名称
 * @returns {*}
 */
export function getDataBase (name = '') {
    return name ? WebDataBaseObj[name] : WebDataBaseObj
}



export default class WebDataBase {
    constructor(tableName, keyPath) {
        this.dataBase = window.indexedDB
        this.openRequest = null
        this.keyPath = keyPath // 表对应主键
        this.tableName = tableName // 表名
        this.dbInstance = ''
        this.dbName = ''
        if (!this.dataBase) {
            console.error(`Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.`)
        }
    }

    /**
     * 重置变量
     */
    reset() {
        this.openRequest = null
        this.dbInstance = ''
        this.dbName = ''
    }

    /**
     * 打开数据库方法
     * @param {String} name - 数据库名称，可以整个项目公用一个数据库
     * @param {Boolean} isDelete - 是否是删除
     * @returns {Promise<unknown>}
     */
    open(name, isDelete = false) {
        const _this = this
        this.dbName = name
        // 打开数据库，并添加对应钩子
        return new Promise((resolve) => {
            const newVer = this.updateVersion(_this.tableName)
            if(newVer){
                // 更新版本先关闭连接
                WebDataBaseObj[this.dbName].dbInstance.close()
                this.openRequest = this.dataBase.open(name,newVer)
            }else{
                this.openRequest = this.dataBase.open(name)
            }
            // this.openRequest = this.dataBase.open(name)
            // 添加数据库开启钩子事件监听
            /**
             * 数据库开启成功钩子方法
             */
            this.openRequest.onsuccess = function () {
                _this.dbInstance = _this.openRequest.result
                console.log(`"${_this.dbName}"数据库开启成功`)
                WebDataBaseObj[_this.dbName] = _this
                resolve(_this)
            }
            /**
             * 数据库开启失败钩子方法
             */
            this.openRequest.onerror = function (e) {
                console.error(`"${_this.dbName}"数据库开启失败`)
                consoleInfo(e)
                resolve(e)
            }
            /**
             * 数据库开启前的钩子方法，这一步通常都是创建一个数据库实例
             */
            this.openRequest.onupgradeneeded = function (e) {
                let db = e.target.result;
                // 创建一个数据库实例
                if (!db.objectStoreNames.contains(_this.tableName)) {
                    db.createObjectStore(_this.tableName, {keyPath: _this.keyPath});
                } else {
                    isDelete && db.deleteObjectStore(_this.tableName);
                }
            }
            /**
             * 数据库开启阻塞的钩子方法
             */
            this.openRequest.onblocked = consoleInfo

        })
    }

    /**
     * 更新数据库版本
     * @param {String} tableName - 表名
     */
    updateVersion(tableName){
        if(!WebDataBaseObj[this.dbName]){
            return null
        }
        // 获取调用open时，传递进来的dbName对应的数据库版本号
        let curVer = WebDataBaseObj[this.dbName].dbInstance.version
        // 获取调用open时，传递进来的dbName对应的数据库版存储对象（可以理解成表名列表）名称列表
        let objectStoreNames = Array.from(WebDataBaseObj[this.dbName].dbInstance.objectStoreNames)
        const isHas = objectStoreNames.filter(val=>{
            return val === tableName
        })
        // 如果不存在与tableName相同的，说明是新创建的数据存储对象，需要更新数据库版本号
        return isHas.length === 0 ? curVer + 1 : null
    }
    /**
     * 批量插入
     * @param {Array} data - 表对象名称
     * @param {String} table - 表对象名称
     */
    batchInsert(data, table) {
        if (!Array.isArray(data)) {
            console.error(`你必须传入一个数组用于批量插入`)
            return
        }
        return new Promise((resolve, reject) => {
            let transaction = this.dbInstance.transaction([table], 'readwrite')
                .objectStore(table)
            data.forEach(val => {
                transaction.put(val);
            })

            transaction.transaction.oncomplete = function (event) {
                console.log('数据写入成功')
                resolve({msg: '数据写入成功', e: event})
            };
            transaction.transaction.onerror = function (event) {
                reject({msg: '数据写入失败', e: event})
            }
            transaction.transaction.onabort = consoleInfo
        })
    }

    /**
     * 批量读取
     * @param {String} table - 表对象名称
     * @returns {Promise<unknown>}
     */
    readAll(table) {
        return new Promise((resolve) => {
            let objectStore = this.dbInstance.transaction(table).objectStore(table);
            let resArr = []
            objectStore.openCursor().onsuccess = function (event) {
                let cursor = event.target.result;
                if (cursor) {
                    resArr.push(cursor.value)
                    cursor.continue();
                } else {
                    resolve(resArr)
                }
            };
        })

    }

    /**
     * 根据主键获取对应数据
     * @param {String} table - 表对象名称
     * @param {String} key - 表对象组件名称
     * @param {Number} count - 获取数据数量
     * @returns {Promise<unknown>}
     */
    readByKey(table, key, count) {
        return new Promise((resolve) => {
            let objectStore = this.dbInstance.transaction(table).objectStore(table);
            objectStore.getAll(key, count).onsuccess = function (event) {
                resolve(event.target.result)
            };
        })

    }

    /**
     * 删除数据对象表
     * @param {String} name - 数据对象表名称
     * @returns {Promise<unknown>}
     */
    clearTable(name) {
        return new Promise((resolve, reject) => {
            let transaction = this.dbInstance.transaction([name], 'readwrite')
                .objectStore(name).clear()
            transaction.onerror = function (event) {
                reject(event)
            };
            transaction.onsuccess = function () {
                resolve()
            };
            transaction.onabort = consoleInfo
            transaction.oncomplete = consoleInfo
        })
    }
}
