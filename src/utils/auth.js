/*
 * @Author: yinian430 
 * @Date: 2020-07-06 18:36:28 
 * @Last Modified by: yinian430
 * @Last Modified time: 2021-02-24 11:07:00
 */
import Vue from 'vue'
import _this from '../main.js'
//常用的js方法
/**
 * 存储localStorage
 */
Vue.prototype.$win = null
/**
 * 存储localStorage
 */
Vue.prototype.setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = (name, isListen = false) =>{
    if (!name) return;
    //开启监听
    if(isListen){

    }
    return window.localStorage.getItem(name);
}
Vue.prototype.getStore = getStore

/**
 * 删除localStorage
 */
Vue.prototype.removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 存储sessionStorage
 */
Vue.prototype.setSessionStore = (name, content, isListen = false) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    //开启监听
    if(isListen){
        // 创建一个StorageEvent事件
               let newStorageEvent = document.createEvent('StorageEvent');
               const storage = {
                    setItem: function (k, val) {
                        sessionStorage.setItem(k, val);
                         // 初始化创建的事件
                         newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
                         // 派发对象
                         window.dispatchEvent(newStorageEvent)
                     }
                }
                return storage.setItem(name, content);
    }else{
        window.sessionStorage.setItem(name, content);
    }

}

/**
 * 获取sessionStorage
 */
Vue.prototype.getSessionStore = name => {
    if (!name) return;
    return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
Vue.prototype.removeSessionStore = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}

/**
 * 获取cookie
 */
import Cookies from 'js-cookie'
Vue.prototype.getCookie = CookieKey => {
        return Cookies.get(CookieKey)
    }
    /**
     * 存储cookie
     */
Vue.prototype.setCookie = (CookieKey, cookie) => {
        return Cookies.set(CookieKey, cookie)
    }
    /**
     * 删除cookie
     */
Vue.prototype.removeCookie = CookieKey => {
    return Cookies.remove(CookieKey)
}

Array.prototype.remove = function(obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}

//时间格式化
Vue.prototype.formatDate = (timestamp, formats) => {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    // 5. 20210513135233 年月日时分秒
    formats = formats || 'Y-m-d H:i:s';

    var zero = function(value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };
    // 第五中情况处理
    if(formats === 'YMDHMS'){
        let year = timestamp.getFullYear();
        let month = zero(timestamp.getMonth() + 1);
        let day = zero(timestamp.getDate());
        let hour = zero(timestamp.getHours());
        let minite = zero(timestamp.getMinutes());
        let second = zero(timestamp.getSeconds());
        return year + month + day + hour + minite + second
    }
    // console.log(timestamp)

    // var myDate = timestamp ? new Date(timestamp): '';
    // 兼容ie
    const dates = createDate(timestamp)
    var myDate = timestamp ? dates : '';

    let date = '';
    if (myDate !== '') {
        var year = myDate.getFullYear();
        var month = zero(myDate.getMonth() + 1);
        var day = zero(myDate.getDate());
        var hour = zero(myDate.getHours());
        var minite = zero(myDate.getMinutes());
        var second = zero(myDate.getSeconds());
        date = formats.replace(/Y|m|d|H|i|s/ig, function(matches) {
            return ({
                Y: year,
                m: month,
                d: day,
                H: hour,
                i: minite,
                s: second
            })[matches];
        });
    } else {
        date = '--';
    }

    return date;
};

Vue.prototype.getTimer = (stringTime) => {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;

    var time1 = createDate().getTime(); //当前的时间戳
    var time2 = Date.parse(createDate(stringTime)); //指定时间的时间戳
    var time = time1 - time2;

    var result = null;
    if (time < 0) {
        result = "1分钟前";
    } else if (time / month >= 1) {
        result = Vue.prototype.formatDate(stringTime, 'Y-m-d');
    } else if (time / week >= 1) {
        result = Vue.prototype.formatDate(stringTime, 'Y-m-d');
    } else if (time / day >= 1) {
        result = parseInt(time / day) + "天前";
    } else if (time / hour >= 1) {
        result = parseInt(time / hour) + "小时前";
    } else if (time / minute >= 1) {
        result = parseInt(time / minute) + "分钟前";
    } else {
        result = "1分钟前";
    }
    return result;
}

/**
 * 获取指定月数的时间 (只支持前后12个月内，实测没问题，往今后超过15，往以前超过20 会有问题)
 * @param monthNum 指定月数范围，往前几个月，往后几个月
 * @param direct 方向，往前往后
 * @returns {number} 时间戳
 */
function getSectionTime (monthNum,direct = 'pre') {
    // let timeOne = new Date(1575158521000)
    let timeOne = new Date()
    let year = timeOne.getFullYear()
    let month = timeOne.getMonth() + 1
    let day = timeOne.getDate()
    let hours = timeOne.getHours()
    let minutes = timeOne.getMinutes()
    let seconds = timeOne.getSeconds()
    let ThreeMonths = 0
    if(direct === 'pre'){
        // 计算x个月后的月份
        ThreeMonths = month - monthNum
        // 如果小于 0 说明是去年
        if (ThreeMonths <= 0) {
            year = year - 1
            // 计算去年的月份
            ThreeMonths = 12 + ThreeMonths
        }
    }
    if(direct === 'next'){
        // 计算x个月后的月份
        ThreeMonths = month + monthNum
        // 如果小于 0 说明是去年
        if (ThreeMonths > 12) {
            year = year + 1
            // 计算去年的月份
            ThreeMonths = ThreeMonths - 12
        }
    }
    // 获取当前的时间的日期字符串
    // **如果天数的值为零，则默认返回当前月份的最后一天
    let timeTow = new Date(year, ThreeMonths, 0, hours, minutes, seconds)

    // 获取x个月前的最后一天
    let ThreeMonthsDay = timeTow.getDate()

    // 获取x个月前的小时数
    let ThreeMonthsHour = timeTow.getHours() < 10 ? '0' + timeTow.getHours() : timeTow.getHours()

    // 获取x个月前的分钟数
    let ThreeMonthsMinutes = timeTow.getMinutes() < 10 ? '0' + timeTow.getMinutes() : timeTow.getMinutes()

    // 获取x个月前的秒数
    let ThreeMonthsSeconds = timeTow.getSeconds() < 10 ? '0' + timeTow.getSeconds() : timeTow.getSeconds()

    // 判断如果当前月份的天数大于三个月前的天数时，则当前天数等于三个月前的天数
    if (day > ThreeMonthsDay) {
        day = ThreeMonthsDay
    }

    day = day < 10 ? '0' + day : day
    // 格式化时间
    const THREE_MONTHS_AGO = `${year}/${ThreeMonths}/${day} ${ThreeMonthsHour}:${ThreeMonthsMinutes}:${ThreeMonthsSeconds}`

    // 生成时间戳
    const THREE_STAMP = new Date(THREE_MONTHS_AGO).getTime()

    return THREE_STAMP
}

Vue.prototype.$getSectionTime = getSectionTime
//求百分比
Vue.prototype.GetPercent = (num, total) => {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00);
}


//北京时间转UTC时间
Vue.prototype.beijing2utc = (now, formats) => {
    let timestamp
        // 处理成为时间戳
    if (typeof(now) == 'number') {
        timestamp =createDate(now);
    } else {
        timestamp = createDate(Date.parse(now));
    }
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    timestamp = timestamp + (createDate().getTimezoneOffset() * 60);
    // 时间戳转为时间
    // var utc_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    var utc_datetime = Vue.prototype.formatDate(createDate(parseInt(timestamp) * 1000), formats)
    return utc_datetime;
}

//币种转换
Vue.prototype.currencyConverter = (type_f, type_t, value) => {
    let currency = JSON.parse(getStore('currencyRates'));
    return (((value / currency[type_f]) * currency[type_t]).toFixed(2) - 0).toLocaleString();
}
Vue.prototype.currencyConverterNumber = (type_f, type_t, value) => {
    let currency = JSON.parse(getStore('currencyRates'));
    return (((value / currency[type_f]) * currency[type_t]).toFixed(2) - 0)
}
Vue.prototype.currencyConverterNolocal = (type_f, type_t, value) => {
    let currency = JSON.parse(getStore('currencyRates'));
    return (((value / currency[type_f]) * currency[type_t]).toFixed(2) - 0)
}
Vue.prototype.currencyConverterTRC20 = (type_f, type_t, value) => {
    let currency = JSON.parse(getStore('currencyRates'));
    return ((value * currency[type_t]).toFixed(2) - 0)
}
//币种显示
Vue.prototype.selectPlatform = (item, platforms) => {
    let platform = '';
    platforms.map(val => {
        if (val.value === item) {
            platform = val.label;
        }
    })
    return platform;
}

// 获取币种
Vue.prototype.getPlatform = (item, platforms) => {
    let platform = '';
    platforms.map(val => {
        if (item && (val.label === item || val.label === item.toUpperCase())) {
            platform = val.value;
        }
    })
    return platform;
}

//obj排序
Vue.prototype.fn = (attr, type) => {
    return function getSort(obj1, obj2) {
        if (attr == "size") {
            obj1[attr] = parseInt(obj1[attr]);
            obj2[attr] = parseInt(obj2[attr]);
        }
        //升序
        if (type == 'asc') {
            if (obj1[attr] > obj2[attr]) {
                return 1;
            }
            if (obj1[attr] < obj2[attr]) {
                return -1;
            }
        }
        //降序
        if (type == 'desc') {
            if (obj1[attr] < obj2[attr]) {
                return 1;
            }
            if (obj1[attr] > obj2[attr]) {
                return -1;
            }
        }
        return 0;
    }
}
//eg
// data.sort(fn("age"));

//去重
Vue.prototype.unique = (arr) => {
    return Array.from(new Set(arr))
}

//下载文件
Vue.prototype.downloadFile = (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    //设置请求头参数的方式,如果没有可忽略此行代码
    // xhr.setRequestHeader("Authorization", window.localStorage.getItem('authorization'));
    xhr.setRequestHeader("Authorization", _this.getStore('token') === undefined ? '' : _this.getStore('token'));
    // xhr.setRequestHeader("User", JSON.parse(window.localStorage.getItem('userInfo')).username);
    //设置响应类型为 blob
    xhr.responseType = 'blob';
    //关键部分
    xhr.onload = function() {
        //如果请求执行成功
        if (this.status == 200) {
            var blob = this.response;
            var a = document.createElement('a');
            // blob.type = "application/octet-stream";
            var url = window.URL.createObjectURL(blob);
            var fileName = decodeURIComponent(xhr.getResponseHeader("content-disposition").split(";")[1].split("filename=")[1]);
            if (window.navigator.msSaveBlob) {
                try {
                    window.navigator.msSaveBlob(blob, fileName)
                } catch (e) {
                    console.log(e);
                }
            } else {
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a); // 火狐浏览器 必须把元素插入body中
                a.click();
                document.body.removeChild(a);
                //释放之前创建的URL对象
                window.URL.revokeObjectURL(url);
            }
        }
    }
    xhr.send();
}


//根据输入地址匹配币种
Vue.prototype.matchCurrency = (address) => {
    _this.$root.userInfo.matchPlatformList = [];
    let currencyList = [],
        platformList = {};
    _this.$root.userInfo.platformList.map(val => {
        currencyList.push(val.value);
        platformList[val.value] = val;
    })
    if (_this.$root.BTCaddress.test(address)) {
        currencyList.includes('btc') && _this.$root.userInfo.matchPlatformList.push(platformList['btc']);
        currencyList.includes('usdt_btc') && _this.$root.userInfo.matchPlatformList.push(platformList['usdt_btc']);
        currencyList.includes('bch') && _this.$root.userInfo.matchPlatformList.push(platformList['bch']);
    }
    if (_this.$root.LTCaddress.test(address)) {
        currencyList.includes('ltc') && _this.$root.userInfo.matchPlatformList.push(platformList['ltc']);
    }
    // if(_this.$root.BCHaddress.test(address)){
    //   currencyList.includes('bch') && _this.$root.userInfo.matchPlatformList.push(platformList['bch']);
    // }
    if (_this.$root.ETHaddress.test(address)) {
        currencyList.includes('eth') && _this.$root.userInfo.matchPlatformList.push(platformList['eth']);
        currencyList.includes('etc') && _this.$root.userInfo.matchPlatformList.push(platformList['etc']);
        currencyList.includes('usdt_eth') && _this.$root.userInfo.matchPlatformList.push(platformList['usdt_eth']);
    }
    if (_this.$root.userInfo.matchPlatformList.length === 0) {
        _this.$root.userInfo.matchPlatformList = _this.$root.userInfo.platformList;
    }
}

//判断canvas是否有内容
Vue.prototype.isCanvasBlank = (canvas) => {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() == blank.toDataURL();
}

//去掉字符串前后空格
Vue.prototype.trim = (str) => {
    return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
}
// 去除所有空格
Vue.prototype.$AllTrim = (str,is_global) => {
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()==="g")
    {
        result = result.replace(/\s/g,"");
    }
    return result;
}
//复制内容到剪贴板
Vue.prototype.copyShaneUrl = (shareLink) => {
    var input = document.createElement("input");   // 直接构建input
    input.value = shareLink;  // 设置内容
    document.body.appendChild(input);    // 添加临时实例
    input.select();   // 选择实例内容
    document.execCommand("Copy");   // 执行复制
    document.body.removeChild(input); // 删除临时实例
    _this.$message.success('复制成功！');
}
// 保留位小数（不四舍五入）
Vue.prototype.formatDecimal = (num, decimal)=> {
    num = num.toString()
    let index = num.indexOf('.')
    if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
    } else {
        num = num.substring(0)
    }
    return parseFloat(num).toFixed(decimal)
}
/**
 * 模拟tofixed 实现保留小数点功能
 * @param num 数值
 * @param decimal 保留的位置
 * @returns {*}
 */
Vue.prototype.$simulateToFixed = (num, decimal = 6)=> {
    if(num === undefined) {
        return;}
    if(num.toString() === '0'){
        return 0;
    }
    num = Vue.prototype.$transferToNumber(num).toString()
    let index = num.indexOf('.')
    if (index === -1) {
        return num;
    }
    let decimalBeforeLenght = num.split('.')[1].length; // 获取小数点后位数
    if(decimalBeforeLenght <= decimal){
        return num
    }else{
        const minimumStr = '0.';
        const minimum = minimumStr.padEnd( decimal + 2, 0); // 匹配小额资金规则
        return parseFloat(num).toFixed(decimal) === minimum ? minimum.toString() : parseFloat(num).toFixed(decimal);
    }
}
/**
 * 科学计数法转化成小数点
 * @param num 数值
 * @returns Number
 */
Vue.prototype.$transferToNumber = (inputNumber) => {
    if (isNaN(inputNumber)) {
      return inputNumber
    }
    inputNumber = '' + inputNumber
    inputNumber = parseFloat(inputNumber)
    let eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
    let tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
    let number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]))
    return number 
}
/**
 * 数组拍平方法
 * @param arr
 * @returns {*}
 */
Vue.prototype.$flatten = (arr) => {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat.apply([], arr);
    }
    return arr;
}

/**
 * 判断ie浏览器
 * @returns {string|number}
 * @constructor
 */
export function ieVersion() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        // let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        // reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion === 7) {
            return 7;
        } else if(fIEVersion === 8) {
            return 8;
        } else if(fIEVersion === 9) {
            return 9;
        } else if(fIEVersion === 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}

/**
 * 创建日期对象（兼容ie）
 */
let createDate =  function createDate(dateStr) {
    if(dateStr instanceof Date){
        return  dateStr
    }
    if(dateStr && dateStr.constructor === String){
        // 替换成ie支持的字符串
        return ieVersion() === -1 ? new Date(dateStr) : new Date(dateStr.replace(/-/g, '/').replace('.000+0000', ''))
    }else if (dateStr && dateStr.constructor === Number){
        return new Date(dateStr)
    }else{
        return new Date()
    }
}
Vue.prototype.$createDate = createDate

/**
 * 图片转base64
 */
let getBase64Image =  function getBase64Image(url) {
    return new Promise((resolve) => {
        let img = new Image();
        img.crossOrigin = ''
        img.src = url;
        img.onload = function(){
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            resolve(canvas.toDataURL("image/png"))
        }
    })
}
Vue.prototype.$getBase64Image = getBase64Image
/**
 * 解析url获取参数方法
 * @returns {{}}
 */
const getUrlkey = function () {
    let params = {};
    let url = window.location.href
    if(url.indexOf("?")>-1){//判断如果请求地址中包含参数
        var urls = url.split("?");
        var arr = urls[1].split("&");
        for (var i = 0, l = arr.length; i < l; i++) {
            var a = arr[i].split("=");
            params[a[0]] = a[1];
        }
    }
    return params;
}
Vue.prototype.$getUrlkey = getUrlkey

const closePage = function () {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
        } else {
            window.openWindow('', '_top');
            window.top.close();
        }
    } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        window.location.href = 'about:blank ';
    } else if (navigator.userAgent.indexOf("Chrome") > 0) {
        window.location.href = "about:blank";
        window.opener = null;
        window.openWindow('', '_self', '');
        window.close();
    }
    {
        window.opener = null;
        window.openWindow('', '_self', '');
        window.close();
    }
}
Vue.prototype.$closePage = closePage

/**
 * 生成随机id
 * @returns {string}
 * @constructor
 */
function GenNonDuplicateID(){
    return Math.random().toString(36).substr(2)
}
Vue.prototype.$createKeys = GenNonDuplicateID

/**
 * 根据角度计算两点之间贝塞尔曲线的赋值点
 * @param {Object} source 节点数据
 * @param {Object} target 节点数据
 * @param {Object} angle 角度
 * @return {Array} 坐标
 */
function getPosition (source, target, angle) {
    let x1 = source.x;
    let y1 = source.y;
    let x2 = target.x;
    let y2 = target.y;
    let PI = Math.PI;
    // 两点间的x轴夹角弧度
    let xAngle=Math.atan2((y2-y1), (x2-x1));
    // 转为角度
    xAngle = 360*xAngle/(2*PI);
    // 两点间的长度
    let L=Math.sqrt((y2-y1)*(y2-y1)+(x2-x1)*(x2-x1));
    // 计算等腰三角形斜边长度
    let L2 = L/2 / Math.cos(angle* 2*PI/360);

    // 求第一个顶点坐标，位于下边
    let val1={};
    // 求第二个顶点坐标，位于上边
    let val2={};
    val1['x']=x1+Math.round(L2 * Math.cos((xAngle+angle)* 2*PI/360));
    val1['y']=y1+Math.round(L2 * Math.sin((xAngle+angle)* 2*PI/360));
    val2['x']=x1+Math.round(L2 * Math.cos((xAngle-angle)* 2*PI/360));
    val2['y']=y1+Math.round(L2 * Math.sin((xAngle-angle)* 2*PI/360));

    return [val1,val2];
}
Vue.prototype.$getPosition = getPosition

/**
 * 币种转换人民币
 * @param {string} value 数值
 * @param {string} unit 单位
 * @param {string} cnyvalue 人民币金额
 * @param {Boolean} isShowCny  是否显示人民币金额
 * @returns {string}
 */
function unitShowFilter(value, unit, isShowCny = false, cny = '') {
    // // 数据处理
    const val = (value || value === 0) ? this.$simulateToFixed(value, 6) : '';
    let isOtherToken = false;
    let unitValue = currencyUnit(unit);
    isOtherToken = unitValue === '' ? true : false
    let cnyValue = '';
    // isShowCny = val === '0.000000' ? false : isShowCny; // 小额资金不显示人民币
    if (cny === 0 || cny) {
        cnyValue = toSwitchMillion(Number(cny))
    }
    return (isShowCny && !isOtherToken) ? `${val} ${unitValue} ≈ ${cnyValue}` : `${val} ${unitValue}`;
}
Vue.prototype.$unitShowFilter = unitShowFilter

/**
 * 金额过万转化 - XX万
 * @param value
 */
function toSwitchMillion(value){
    return value > 10000 ? (value / 10000).toFixed(2) + '万元' : value.toFixed(2) + '元';
}
Vue.prototype.$toSwitchMillion = toSwitchMillion

/**
 * 币种单位转换
 * @param {string} val 单位
 * @returns {string}
 */
function currencyUnit (val) {
    let switchUnit = val ? val.toLowerCase() : '';
    let unitValue = '';
    switch (switchUnit) {
        case 'btc':
            unitValue = 'BTC'
            break;
        case 'eth':
            unitValue = 'ETH'
            break;
        case 'usdt_omni':
            unitValue = 'USDT'
            break;
        case 'tether usd':
            unitValue = 'USDT'
            break;
        case 'trx':
            unitValue = 'TRX'
            break;
        case 'usdt_tron':
            unitValue = 'USDT'
            break;
        default :
            unitValue = '';
            break;
    }
    return unitValue;
}
Vue.prototype.$currencyUnit = currencyUnit
/**
 * 复制地址
 * @param {string} currentAdd 地址
 * @returns {string}
 */
Vue.prototype.$copyAddress = function copyAddress(currentAdd){
    let oInput = document.createElement('input')
    oInput.value = currentAdd;
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand("Copy")
    oInput.style.display = 'none'
    document.body.removeChild(oInput)
    this.$message.success( '已复制到粘贴板');
}
Vue.prototype.$debounceFunc = (fn, wait) => {
    let timer, timeStamp = 0;
    let context, args;
    let run = () => {
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    }
    let clean = () => {
        clearTimeout(timer);
    }
    return function () {
        context = this;
        args = arguments;
        let now = (new Date()).getTime();
        if (now - timeStamp < wait) {
            clean();  // clear running timer
            run();    // reset new timer from current time
        } else {
            run();    // last timer alreay executed, set a new timer
        }
        timeStamp = now;
    }
}

/**
 * 获取浏览器信息
 * @param ua
 * @return {{browser: (string|string), version: (string|string)}|{browser: string, version: (string|string)}|{browser: string, version: string}}
 */
function uaMatch(ua) {
    const rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
    const rFirefox = /(firefox)\/([\w.]+)/;
    const rOpera = /(opera).+version\/([\w.]+)/;
    const rChrome = /(chrome)\/([\w.]+)/;
    const rSafari = /version\/([\w.]+).*(safari)/;
    let match = rMsie.exec(ua);
    if (match != null) {
        return {browser: "IE", version: match[2] || "0"};
    }
    match = rFirefox.exec(ua);
    if (match != null) {
        return {browser: match[1] || "", version: match[2] || "0"};
    }
     match = rOpera.exec(ua);
    if (match != null) {
        return {browser: match[1] || "", version: match[2] || "0"};
    }
     match = rChrome.exec(ua);
    if (match != null) {
        return {browser: match[1] || "", version: match[2] || "0"};
    }
     match = rSafari.exec(ua);
    if (match != null) {
        return {browser: match[2] || "", version: match[1] || "0"};
    }
    if (match != null) {
        return {browser: "", version: "0"};
    }
}


Vue.prototype.$browserInfo = ()=>{
    const browserMatch = uaMatch(navigator.userAgent.toLowerCase());
    return {
        browser:browserMatch.browser,
        version:browserMatch.version,
    }
}
Vue.prototype.$openWindow = (strUrl)=>{
    // 模拟a标签点击，实现无糖浏览器下的新开tab
    let aDom = document.createElement("a");
    aDom.href = strUrl
    aDom.target = '_blank'
    document.body.appendChild(aDom);
    aDom.click();
    document.body.removeChild(aDom);
}