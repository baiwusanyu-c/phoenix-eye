/*
* be-input-select.vue
* @deprecated 远程搜索的下拉框
* @author czh
* @create (czh 2021/5/31)
* @update (czh 2021/6/2)
*/
<template>
    <transition name="be-zoom-in-top">
        <div class="be-input-select" v-if="showSelect" :id="`be-input-select${this._uid}`" :style="selectStyle">
            <ul v-show="!loading" :style="selectStyle"
                :id="`be-input-select-ul${this._uid}`" :key="`be-input-select-ul${this._uid}`">
                <!-- <li class="be-input-select__line" v-show="selectList.data.length > 0"></li>-->
                <li class="be-input-select__inner"
                    v-for="(item, index) in selectList.data"
                    :key="item[selectList.keyName] + GenNonDuplicateID()"
                    @click="handleSelect(item,index)">
                    {{ item[selectList.label] }}
                </li>
            </ul>
            <ul v-show="loading" :key="`be-input-select${this._uid}-loading`">
                <li class="be-input-select__line"></li>
                <li class="be-input-select__inner" style="text-align: center">
                    载入中...
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
export default {
    name: "BeInputSelect",
    data() {
        return {
            showSelect: false
        }
    },
    props: {
        /**
         * 数据列表
         */
        selectList: {
            type: Object,
            default: () => {
                return {}
            }
        },
        /**
         * 输入建议样式
         */
        selectStyle: {
            type: Object,
            default: () => {
                return {left: '0px', top: '0px'}
            }
        },
        /**
         * 是否显示
         */
        isShow: {
            type: Boolean,
            default: false
        },
        /**
         * 是否显示 loading
         */
        loading: {
            type: Boolean,
            default: false
        },
    },

    watch: {
        isShow(nVal) {
            this.showSelect = nVal
        }
    },
    methods: {
        /**
         * 生成key
         */
        GenNonDuplicateID() {
            return Math.random().toString(36).substr(2)
        },
        /**
         * 下拉搜索选择事件方法
         * @param {String | Number} value - 更新后值
         * @param {Number} index - 点击索引
         */
        handleSelect(value, index) {
            this.$emit('select', value, index)
            this.$emit('onClose')
        },
        /**
         * 将组件渲染到body下
         */
        appendEleToBody() {
            this.$nextTick(() => {
                const bodyElement = document.querySelector('body')
                if (bodyElement.append) {
                    bodyElement.append(this.$el)
                } else {
                    bodyElement.appendChild(this.$el)
                }
            })
        }
    },
    beforeDestroy() {
        this.$nextTick(() => {
            const bodyElement = document.querySelector('body')
            const selectElement = document.getElementById(`be-input-select${this._uid}`)
            if (selectElement) {
                bodyElement.removeChild(selectElement);
            }
        })
    },
    mounted() {
        const _this = this
        this.appendEleToBody()
        window.addEventListener("scroll", (e) => {
            if(_this.$el !== e.target){
                _this.showSelect = false
                _this.$emit('onClose')
                const dom = document.getElementById(`be_input_${this.$parent._uid}`)
                dom && dom.blur()
            }
        },true)
    },
}
</script>

<style scoped lang='scss'>
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
    box-shadow: 0 6px 13px rgba(0, 0, 0, 0.16);
   /* border: 1px solid $mainColor3;*/
    border-top: 0;
    position: absolute;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    // z-index: 2077;
    z-index: 9999;

    ul {
        padding: 0;
    }

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
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;

        &:hover {
            background-color: #dcdfe6;
        }
    }
}

.be-zoom-in-top-enter-active, .be-zoom-in-top-leave-active {
    opacity: 1;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1);
    transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
    -webkit-transform-origin: center top;
    transform-origin: center top
}

.be-zoom-in-top-enter, .be-zoom-in-top-leave-active {
    opacity: 0;
    -webkit-transform: scaleY(0);
    transform: scaleY(0)
}
</style>