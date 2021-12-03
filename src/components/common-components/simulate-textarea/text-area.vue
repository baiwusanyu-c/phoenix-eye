<template>
    <div id="analysisTextArea" class="analysis-textarea">
        <ul class="scrollDiy">
            <li
                v-for="(item, index) in addressList"
                :key="index"
                :class="[
                    item.flag || item.tipMsg ? 'error-addr' : 'correct-addr',
                ]"
                :style="{
                    width: `${100 / rowNum - 1}%`,
                    'margin-right': index % rowNum === rowNum - 1 ? '0' : '1%',
                }"
            >
                <div>{{ item.value }}</div>
                <span
                    class="el-icon-close close-btn"
                    @click="handelRemove(index)"
                ></span>
            </li>
            <el-input
                @change="getAddressList"
                v-model="inputValue"
                :placeholder="
                    addressList.length
                        ? ''
                        : placeholderTitle
                "
            >
            </el-input>
        </ul>
        <div :class="errorTip ? 'addr-tip-msg' : ''">{{ errorTip }}</div>
    </div>
</template>

<script>
export default {
    name: "AnalysisTextArea",
    components: {},
    props: {
        /**
         *  链平台
         */
        platform: {
            type: String,
        },
        /**
         *  已经添加的地址集合
         */
        hasAddAddress: {
            type: Array,
            default: () => {
                return [];
            },
        },
        /**
         *  每行显示几列
         */
        rowNum: {
            type: Number,
            default: 2,
        },
        /**
         *  最长个数限制
         */
        limitNum: {
            type: [Number, String],
            default: "nolimit",
        },
        /**
         *  是否通过api验证地址正确性
         */
        isApiVerify: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        const placeholderTitle =
            this.limitNum === "nolimit"
                ? `请输入，地址之间用空格或换行隔开`
                : `请输入，地址之间用空格或换行隔开，不超过${this.limitNum}个`;
        return {
            inputValue: "",
            addressList: this.hasAddAddress,
            placeholderTitle,
        };
    },
    computed: {
        errorTip() {
            const errorNum = this.addressList.filter((v) => v.flag).length;
            const tipNum = this.addressList.filter((v) => v.tipMsg).length;
            const limitNum = (this.$root.versionNoSuger === "FREE" &&
                (this.$route.path === '/analysis/addrAnalysis' || this.$route.path === '/analysis/smartAnalysis')) ? 1 : this.limitNum;
            if (
                Object.prototype.toString.call(limitNum) ===
                    "[object Number]" &&
                this.addressList.length > limitNum
            ) {
                return this.$root.versionNoSuger === "FREE"
                    ? `免费版仅支持添加${limitNum}个地址`
                    : `地址数量超过${limitNum}个`;
            }
            if (tipNum && this.isApiVerify) {
                return "有标签地址，不支持分析";
            }
            if (errorNum) {
                return "有错误地址";
            }
            return null;
        },
    },
    watch: {
        hasAddAddress: {
            handler: function (val) {
                if (val) {
                    this.$nextTick(() => {
                        this.addressList = val;
                    });
                }
            },
            immediate: true, //关键
            deep: true,
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.addressList = this.hasAddAddress;
        });
    },
    methods: {
        /**
         * 获取输入的地址，处理数据
         */
        getAddressList() {
            // 处理粘贴的字符串
            const inputValue = this.inputValue
                .replace(/[,，\s]+/gim, ",")
                .split(",")
                .filter((v) => v);
            // 合并本次和上次输入地址
            const newValue = this.addressList
                .map((v) => v.value)
                .concat(inputValue);
            const platform = this.platform;
            // 去重 (eth 需要转换大小写比较，对大小写不敏感)
            const newlist = Array.from(
                new Set(
                    newValue.map((v) => {
                        return this.ETHhash.test(v) || this.ETHaddress.test(v)
                            ? v.toLowerCase()
                            : v;
                    })
                )
            );
            this.addressList = newlist.map((item) => {
                return {
                    value: item,
                    flag: this.verifyTxOrAddress(item, platform, "addr"), // 地址验证
                };
            });
            // 下面的代码包含了重复的地址
            // let repetList =[]; // 找到重复项,
            // let newList = []; // 新数据
            // newValue.forEach(item =>{
            //     let isRepet = false;
            //     if(newValue.indexOf(item) !== newValue.lastIndexOf(item) && repetList.indexOf(item) === -1){
            //         isRepet = true;
            //         repetList.push(item)
            //     }
            //     newList.push({
            //         value : item,
            //         flag : this.verifyTxOrAddress(item, platform, 'addr'), // 地址验证
            //         isRepet : isRepet || repetList.includes(item) // 是否是重复地址,
            //     })
            // })
            // this.addressList = newList;
            this.inputValue = "";
        },
        /**
         * 校验地址/交易
         * @param {String} targetData 目标地址
         * @param {String} platform 链平台
         * @param {String} valueType 类型
         */
        verifyTxOrAddress(targetData, platform, valueType = "addr") {
            let noInput = false;
            let type = "";
            const testRegFunc = (testAddr,testTx,addr)=>{
                if (testAddr(addr)) {
                    type = "tx";
                } else if (testTx(addr)) {
                    type = "addr";
                } else {
                    noInput = true;
                }
                return {type,noInput}
            }
            if(/^btc/.test(platform)){
                let res = testRegFunc(this.BTChash.test,this.BTCaddress.test,targetData)
                noInput = res.noInput
                type = res.type
            }
            if(/^eth/.test(platform)){
                if (targetData.substr(0, 2) !== "0x") {
                    targetData = "0x" + targetData;
                }
                let res = testRegFunc(this.ETHhash.test,this.ETHaddress.test,targetData)
                noInput = res.noInput
                type = res.type
            }
            if(/^tron/.test(platform)){
                let res = testRegFunc(this.TRONhash.test,this.TRONaddress.test,targetData)
                noInput = res.noInput
                type = res.type
            }
            if (valueType !== type) {
                noInput = true;
            }
            return noInput;
        },
        /**
         * 删除地址
         * @param {Number} index 地址序号
         */
        handelRemove(index) {
            this.addressList.splice(index, 1);
        },
    },
};
</script>

<style lang="scss" scoped>
#analysisTextArea {
    width: calc(100% - 70px);
    background-color: #ffffff;
    flex-shrink: 1;
    ul {
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        border: 1px solid #206596;
        border-radius: 3px;
        box-sizing: border-box;
        max-height: 205px;
        min-height: 60px;
        overflow: auto;
        li {
            // width: 32%;
            padding: 6px 5px;
            box-sizing: border-box;
            margin-bottom: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 3px;
            flex-grow: 0;
            max-height: 33px;
            > div {
                width: 80%;
                flex-shrink: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 14px;
            }
            .close-btn {
                width: 16px;
                font-size: 16px;
                cursor: pointer;
            }
        }
        .error-addr {
            background-color: rgba(255, 0, 0, 0.1);
            border: 1px solid rgba(255, 0, 0, 0.3);
            color: #ff0000;
        }
        .correct-addr {
            background-color: #d1d1d1;
        }
        .el-input {
            width: 33%;
            flex-grow: 1;
        }
    }
    .addr-tip-msg {
        margin-top: 8px;
        color: #ff0000;
        font-size: 12px;
    }
}
</style>
<style lang="scss">
#analysisTextArea {
    .el-input__inner {
        border: none;
    }
    .el-input__inner:hover {
        border: none;
    }
}
</style>