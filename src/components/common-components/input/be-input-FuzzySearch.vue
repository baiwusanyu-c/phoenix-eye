/*
* be-input.vue
* @deprecated 带输入建议远程搜索的输入框
* @author czh
* @create (czh 2021/5/31)
* @update (czh 2021/6/2)
*/
<template>
    <div class="be-input" v-click-outside="closeDisplay">
        <div class="be-input-body" :class="{'be-input__inner_isActive': isActive, expandStyle}">
            <!-- @slot 前置插槽-->
            <slot name="preSlot"></slot>
            <!--这里应该用自己封在icon组件，code在公司，先暂时用element-->
            <i @click="handleIcon" :class='`el-icon-${nextIcon}`' class="be-input-preIcon" v-if="preIcon"></i>
            <input
                :disabled="disabled"
                :readonly="readonly"
                :type="handleInputType"
                :placeholder="placeholder"
                :value="value"
                :maxlength="maxLen"
                @input="handleInput($event.target.value,$event)"
                @blur="handleFocus($event.target.value,$event)"
                @focus="handleBlur($event.target.value,$event)"
                @change="handleChangeFun()"
                autocomplete="off"
                :id="`be_input_${this._uid}`"
                class="be-input__inner"
                @mouseover="value.length > 0 && (isShowClear = true)"
                @mouseout="isShowClear = false">
            <i @click="handleIcon" :class='`el-icon-${nextIcon}`' class="be-input-nextIcon" v-if="nextIcon"></i>
            <!--清除按钮-->
            <i @click="handleClear" class="el-icon-close be-input-close"
               @mouseover="value.length > 0 && (isShowClear = true)" @mouseout="isShowClear = false"
               v-show="clearable && isShowClear"></i>
            <!--建议输入下拉框-->
            <be-input-select
                @select="handleSelect"
                :select-style="selectStyle"
                :select-list="selectList"
                @onClose="onCloseSelect"
                :is-show="isShowSelect && selectList.data.length > 0">
            </be-input-select>
            <!-- @slot 后置插槽-->
            <slot name="nextSlot"></slot>
        </div>
    </div>
</template>

<script>
/**
 * 带输入建议远程搜索的输入框
 */
import BeInputSelect from "./be-input-select";
import {fuzzy_matching} from '@/api/browser.js';

export default {
    name: "BeInput",
    components: {BeInputSelect},
    data() {
        return {
            // 输入建议显示
            isShowSelect: false,
            // 输入建议数据列表
            selectList: {data: [], label: '', keyName: ''},
            // 输入建议数据列表缓存
            selectListCache: {data: [], label: '', keyName: ''},
            // 输入建议数据列表
            selectStyle: {left: '0px', top: '0px'},
            // 输入建议loading标志
            loading: false,
            // 输入建议展开时，input样式
            expandStyle: '',
            // 输入建议数据列表最大显示长度
            maxStrLen: 0,
            // 事件触发dom
            eventDom: null,
            // 清空按钮状态
            isShowClear: false,
            // 当前币种
            platformNow: null,
            isActive: false,
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        /**
         * 币种
         */
        platform: {
            type: String,
            default: ''
        },
        /**
         * 绑定值
         */
        value: [String, Number],
        /**
         * 输入框占位文本
         */
        placeholder: String,
        /**
         * 是否禁用
         */
        disabled: Boolean,
        /**
         * 是否只读
         */
        readonly: Boolean,
        /**
         * 输入框类型
         */
        type: {
            type: String,
            default: 'text'
        },
        /**
         * 是否可以清除
         */
        clearable: {
            type: Boolean,
            default: false
        },
        /**
         * 是否显示密码
         */
        showPassword: {
            type: Boolean,
            default: false
        },
        /**
         * 最大长度限制
         */
        maxLen: {
            type: Number,
            default: null
        },
        /**
         * 最小长度限制
         */
        minLen: {
            type: Number,
            default: null
        },
        /**
         * 输入建议方法
         */
        // fetchSuggestions: {
        //   type: Function,
        //   default: null
        // },
        /**
         * 前置icon类型
         */
        preIcon: {
            type: String,
            default: ''
        },
        /**
         * 后置icon图标类型
         */
        nextIcon: {
            type: String,
            default: ''
        },
        restaurants: {
            type: Array,
            default: undefined
        },
        /**
         * 获取历史记录方法
         */
        getHistory: {
            type: Function,
            default: undefined
        },
        /**
         * 失焦事件
         */
        blurFun: {
            type: Function,
            default: undefined
        },
        /**
         * 失焦事件参数
         */
        blurItem: {
            type: Object,
            default: undefined
        },
        /**
         * change事件
         */
        changeFun: {
            type: Function,
            default: undefined
        },
        /**
         * change参数
         */
        changeItem: {
            type: Number,
            default: null
        },
    },
    computed: {
        // 根据传入计算input类型
        handleInputType() {
            // 显示密码
            if (this.type === 'password' && this.showPassword) {
                return 'text'
            }
            return this.type
        },
    },
    watch: {
        // 监听value变化，触发change
        value(nVal, oVal) {
            // 处理最小长度
            if (this.minLen && this.minLen !== 0) {
                let values = this.value
                let isNum = false
                // 现将数字转化为字符串判断长度
                if (Object.prototype.toString.call(this.value) === '[object Number]') {
                    values = this.value.toString()
                    isNum = true
                }
                if (values.length <= this.minLen) {
                    if (nVal && !oVal) values = isNum ? Number(nVal) : nVal
                    if (!nVal && oVal) values = isNum ? Number(oVal) : oVal
                    this.$emit('input', values)
                }
            }
            this.handleChange(nVal, oVal)
        },
    },
    methods: {
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            // cb(results);
            cb(results, 'value', 'address');
        },
        /**
         * input change 事件处理方法
         */
        handleChangeFun() {
            this.changeFun != undefined && this.changeFun(this.changeItem);
        },
        /**
         * change 事件处理方法
         * @param {String | Number} nVal - 更新后值
         * @param {String | Number} oVal - 更新前值
         */
        handleChange(nVal, oVal) {
            /** 输入change事件
             * @event change
             * @param {String | Number} nVal - 更新后值
             * @param {String | Number} nVal - 更新前值
             */
            this.$emit('changeFunc', nVal, oVal)
        },
        /**
         * input 事件处理方法，实现双向绑定
         * @param {String | Number} val - 更新后值
         */
        handleInput(val, event) {
            // 輸入地址、交易模糊匹配直接去除空格
            val = this.$AllTrim(val, 'g')
            this.value.length > 0 && (this.isShowClear = true);
            const $eventDom = event.target.parentElement
            this.eventDom = $eventDom
            this.$emit("update:value", val.replace(/\s*/g, ''));
            // 根据输入值处理输入建议
            if (val === '') {
                if (this.getHistory != undefined) {
                    this.getHistory(val).then(() => {
                        this.getSuggestions(val);
                        this.isShowSelect = true;
                        this.computedPositon($eventDom)
                    });
                }
            } else {
                if (val.length >= 2) {
                    if (this.platform == '') {
                        if (val.substring(0, 2) == '0x' || val.substring(0, 2) == '0X') {
                            this.platformNow = 'eth';
                        } else if (val.substring(0, 1) == 'T') {
                            this.platformNow = 'usdt_tron';
                        } else {
                            this.platformNow = 'btc';
                        }
                        this.getFuzzyData(val);
                    } else {
                        this.platformNow = this.platform;
                        this.getFuzzyData(val);
                    }
                }
            }
        },
        /**
         * focus 事件处理方法
         * @param {String | Number} value - 更新后值
         */
        handleFocus(value) {
            this.isActive = false;
            this.isShowClear = false;
            setTimeout(() => {
                this.isShowSelect = false;
            }, 300)
            this.expandStyle = ''
            /** 输入focus事件
             * @event focus
             * @param {String | Number} value - 输入框值
             */
            this.$emit('blur', value)
            this.blurFun != undefined && this.blurFun(this.blurItem);
        },
        /**
         * 关闭输入建议下拉框，方法由指令v-click-outside调用
         */
        closeDisplay() {
            this.isShowSelect = false
        },
        /**
         * blur 事件处理方法
         * @param {String | Number} value - 更新后值
         * @param {Event} event - 事件对象
         */
        handleBlur(value, event) {
            this.isActive = true;
            this.value.length > 0 && (this.isShowClear = true);
            this.$emit('focus')
            const $eventDom = event.target.parentElement
            this.eventDom = $eventDom
            /** 输入 blur 事件
             * @event blur
             * @param {String | Number} value - 输入框值
             */
            if (value === '') {
                if (this.getHistory != undefined) {
                    this.getHistory(value).then(() => {
                        if (Object.prototype.toString.call(this.querySearch) === '[object Function]') {
                            this.loading = true
                            this.getSuggestions(value)
                            // 设置显示位置,宽度
                            this.computedPositon($eventDom)
                            this.isShowSelect = true
                        }
                    })
                }
            } else {
                if (value.length >= 2) {
                    if (this.platform == '') {
                        if (value.substring(0, 2) == '0x' || value.substring(0, 2) == '0X') {
                            this.platformNow = 'eth';
                        } else if (value.substring(0, 1) == 'T') {
                            this.platformNow = 'usdt_tron';
                        } else {
                            this.platformNow = 'btc';
                        }
                        this.getFuzzyData(value);
                    } else {
                        this.platformNow = this.platform;
                        this.getFuzzyData(value);
                    }
                }
            }
        },
        /**
         * 获取输入建议
         * @param {String | Number} value - 更新后值
         */
        getSuggestions(value) {
            this.querySearch(value, (data, label, keyName) => {
                // 设置输入建议数据
                this.selectList = {data, label, keyName}
                this.selectListCache = JSON.parse(JSON.stringify(this.selectList))
                this.loading = false
            })
        },
        /**
         * 下拉搜索选择事件方法
         * @param {String | Number} value - 更新后值
         * @param {Number} index - 点击索引
         */
        handleSelect(value, index) {
            /** 输入建议选中 select 事件
             * @event select
             * @param {Object} value - 点击对象数据
             * @param {Number} index - 点击的对应列表索引
             */
            this.$emit("update:value", value.address);
            this.$emit('select', value, index)
            this.blurFun != undefined && this.blurFun(this.blurItem);
            this.isShowClear = false;
        },
        /**
         * 输入框内容清除方法
         * @public
         */
        handleClear() {
            this.$emit("update:value", '');
            this.$emit('input', '')
        },
        /**
         * 输入框前后icon点击方法
         */
        handleIcon() {
            /** 输入建议选中 iconClick 事件
             * @event iconClick
             * @param {String | Number} value - 输入框值
             */
            this.$emit('iconClick', this.value)
        },
        /**
         * 计算输入建议下拉框位置
         * @param {Element} $eventDom - 输入建议下拉框dom
         */
        computedPositon($eventDom) {
            // 加if判断是为了修改页面报错问题
            if (Object.prototype.toString.call($eventDom) === '[object HTMLDivElement]') {
                this.selectStyle.width = Number(window.getComputedStyle($eventDom).width.split('px')[0]) + 'px'
                this.selectStyle.top = $eventDom.getBoundingClientRect().top + Number(window.getComputedStyle($eventDom).height.split('px')[0]) + 2 + 'px'
                this.selectStyle.left = $eventDom.getBoundingClientRect().left + 'px'
                this.expandStyle = this.expandStyle + 'be-input-body__expand'
            }

        },
        /**
         * 获取模糊匹配数据
         * @param {Element} value - 输入框参数
         */
        getFuzzyData(value) {
            this.loading = true;
            fuzzy_matching({
                platform: this.platformNow,
                target: value,
            }).then(res => {
                this.computedPositon(this.eventDom)
                this.isShowSelect = true;
                this.loading = false;
                this.selectList = {
                    data: [],
                    keyName: "address",
                    label: "value"
                }
                res.address_or_tx_list.map(i => {
                    this.selectList.data.push({
                        address: i,
                        value: i
                    })
                })
            }).catch(error => {
                this.loading = false;
                console.log(error)
            });
        },
        /**
         * 下拉框关闭时方法
         */
        onCloseSelect() {
            this.closeDisplay()
        }
    },
    mounted() {
        window.onresize = () => {
            const $eventDom = this.eventDom
            // 设置显示位置,宽度
            this.computedPositon($eventDom)
        }
    },
    beforeDestroy() {
        this.eventDom = null
        window.onresize = null
    }
}
</script>

<style scoped lang='scss'>
.be-input {
    display: flex;
    align-items: center;

    .be-input-body {
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 2px;
        border: 1px solid $mainColor12;
        width: 100%;
        padding: 0 5px;
        box-sizing: border-box;

        // &:hover {
        //   border: 1px solid $mainColor3;
        // }

        .be-input__inner {
            height: 30px;
            line-height: 30px;
            outline: 0;
            border: 0;
            border-radius: 2px;
            width: 100%;
        }

        .be-input-nextIcon,
        .be-input-preIcon {
            cursor: pointer;
            color: #e5e5e5;
            width: 14px;
            height: 14px;
            font-size: 14px;

            &:hover {
                color: $mainColor3
            }
        }

        .be-input-preIcon {
            margin-right: 10px;
            margin-left: 10px;
        }

        .be-input-nextIcon {
            margin: 0 10px;
        }

        .be-input-close {
            cursor: pointer;
            border-radius: 50px;
            border: 1px solid #e5e5e5;
            color: #e5e5e5;
            width: 12px;
            height: 12px;
            font-size: 12px;
            margin-right: 10px;

            &:hover {
                border: 1px solid $mainColor3;
                color: $mainColor3
            }
        }

        .be-input-select {
            &::-webkit-scrollbar {
                margin: 5px;
                width: 8px;
                height: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: #c1c1c1;
                border-radius: 5px;
            }

            background-color: white;
            border-radius: 0 0 3px 3px;
            border: 1px solid $mainColor3;
            border-top: 0;
            padding: 0;
            position: absolute;
            max-height: 300px;
            overflow-y: auto;
            overflow-x: hidden;
            margin: 0;

            .be-input-select__line {
                height: 1px;
                background-color: #dcdfe6;
                width: 90%;
                margin: 0 auto;
                list-style: none;
            }

            .be-input-select__inner {
                height: 30px;
                line-height: 30px;
                list-style: none;
                margin: 10px 0;
                padding-left: 10px;
                box-sizing: border-box;
                cursor: pointer;

                &:hover {
                    background-color: #dcdfe6;
                }
            }
        }
    }

    .be-input__inner_isActive {
        border: 1px solid $mainColor3;
    }

    .be-input-body__expand {
        // border: 1px solid $mainColor3;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;

        &:hover {
            border-bottom: 0;
        }
    }

}

</style>
