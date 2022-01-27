/*
* @project-manage-card.vue
* @deprecated 项目管理列表卡片
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div :class="`project-manage-card`">
        <!--    非新增时显示   -->
        <div v-if="type === 'edit'" :class="`card-title card-title-${isPublic ? 'public' : 'private'}`">
            <div style="display: flex;align-items: center;">
                <h3 @click="openDetailProject(projectId)" style="cursor: pointer">
                    <be-ellipsis-copy :targetStr="title"
                                      :isShowCopyBtn="false"
                                      :isEllipsis="title.length > 12"
                                      :emptyText="$t('el.emptyData')"
                                      fontLength="5"
                                      endLength="5">
                    </be-ellipsis-copy>
                </h3>
                <span class="card-title-public-txt">{{isPublic? $t('el.proManageConfig.proPublic') : $t('el.proManageConfig.proPrivate')}}</span>
            </div>
            <div>
            <!-- <be-svg-icon @click='emitFunc("fresh")' style="cursor: pointer" icon-class="-shuaxin"
                             disabled-tool-tip></be-svg-icon>-->
                <be-svg-icon @click='emitFunc("edit")' style="cursor: pointer" icon-class="-renwuguanli-xiugai"
                             disabled-tool-tip></be-svg-icon>
                <be-svg-icon @click='emitFunc("delete")' style="cursor: pointer" icon-class="-renwuguanli-shanchu"
                             disabled-tool-tip></be-svg-icon>
            </div>
        </div>
        <!--   非新增时显示 卡片地址列表   -->
        <div v-if="type === 'edit'" class="card-edit">
            <div style="width: 100%; display: flex; overflow-x: auto;height: 40px" class="scrollDiy">
                <el-tag v-for="(item) in keywordList" :key="item + _uid">{{ item }}</el-tag>
            </div>
            <div class="card-edit-addr scrollDiy">
                <ul>
                    <li v-for="(addrItem) in contractList" :key="addrItem.contract_address">
                        <span class="addr-cury">{{ formatePlatform(addrItem.platform) }}</span>
                        <be-ellipsis-copy :targetStr="addrItem.contract_address"
                                          :is-ellipsis="addrItem.contract_address.length > 30"
                                          :emptyText="$t('el.emptyData')"
                                          :fontLength="showLength"
                                          :endLength="showLength">
                        </be-ellipsis-copy>
                    </li>
                </ul>
            </div>
            <p>{{ $t('el.proManageConfig.createTime') }} :
                <el-tooltip placement="top" effect="light">
                    <span slot="content">UTC：{{beijing2utc(createTime)}}</span>
                    <span class="cursor"> {{ formatDate($createDate(createTime),'Y-m-d H:i:s')}}</span>
                </el-tooltip>
            </p>
        </div>
        <!--    新增时显示   -->
        <div v-if="type === 'add'" class="card-add">
            <div class="card-add-body" @click='emitFunc("add")'>
                <img src="@/assets/image/pc/add-type-icon.png" alt=""/>
                <p>{{ $t('el.proManageConfig.addPro') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import BeSvgIcon from "../../../../components/common-components/svg-icon/be-svg-icon";
import {getContractProjectTs} from "../../../../api/project-ranking";
import {setStore} from "../../../../utils/auth";

export default {
    name: "project-manage-card",
    components: {BeSvgIcon},
    data() {
        return {
            showLength:'14'
        }
    },
    props: {
        /**
         * 类型
         * @value add/edit
         */
        type: {
            type: String,
            default: 'add'
        },
        /**
         * 关键词列表
         */
        keywordList: {
            type: Array,
            default: () => []
        },
        /**
         * 卡片标题
         */
        title: {
            type: String,
        },
        /**
         * 是否公共项目
         * @value public/private
         */
        isPublic: {
            type: Boolean,
            default: true
        },
        /**
         * 创建时间
         */
        createTime: {
            type: String,
        },
        /**
         * 项目合约地址列表
         */
        contractList: {
            type: Array,
            default: () => []
        },
        /**
         * 项目id
         */
        projectId: {
            type: [String,Number],
        },
    },
    computed:{
      formatePlatform(){
          return function (val){
              return val.toUpperCase()
          }
      }
    },
    mounted() {
        this.initView()
    },
    methods: {
        /**
         * 根据屏幕分辨率调整
         */
        initView(){
            const width = window.screen.availWidth
            const height = window.screen.availHeight
            if(height >= 680 || width >=1280) {
                this.showLength = '12'
            }
        },
        /**
         * 触发事件方法
         * @param {String} evtName - 事件名称
         */
        emitFunc(evtName) {
            this.$emit(evtName)
        },
        /**
         * 搜索接口调用方法
         * @param {Object} params - 参数对象
         * @param {String} type - 搜索类型
         * @param {Function} cb - 回调方法
         */
        searchDetail(params,type,cb){
            const _this = this
            let param = JSON.parse(JSON.stringify(params))
            delete param.type
            getContractProjectTs(param).then(res=>{
                if(res.data){
                    // 存储数据
                    setStore('ProjectTs',JSON.stringify(res.data))
                    _this.$isFunction(cb) && cb()
                }else{
                    _this.$message.error('option error')
                }
            }).catch(err=>{
                _this.loadingSearch = false
                _this.$message.error(err)
                console.error(err)
            })
        },
        /**
         * 打開项目态势详情
         */
        openDetailProject(params,num){
            let param = {
                type:'search',
                project_id:params
            }
            if(num === true){
                this.$router.push('/projectRanking')
            }
            this.searchDetail(param,'click',()=>{
                this.$router.push({path: '/projectRanking/project', query: param})
            })
        },
    },
}
</script>

<style lang="scss">
.project-manage-card {
    background-color: $mainColor7;
    width:398px;
    height: 340px;
    margin: 6px 10px;
    box-shadow: 0 1px 4px 0 $mainColor8;
    display: inline-block;
    float: left;

    .card-title {
        border-radius: 4px 4px 0 0;
        line-height: 20px;
        display: flex;
        padding: 16px 20px;
        box-sizing: border-box;
        color: white;
        justify-content: space-between;

        .svg-icon {
            margin: 0 5px;
        }
        .card-title-public-txt{
            border: 1px solid $mainColor7;
            margin-left: 10px;
            padding: 0 5px;
        }
        .ellipsis-copy{
            min-width: initial !important;
        }
    }

    .card-title-public {
        background: linear-gradient(270deg, #00A865 0%, #0468C2 100%);
    }

    .card-title-private {
        background: linear-gradient(270deg, #07168F 0%, #0468C2 100%);
    }

    .card-edit {
        padding: 20px;
        box-sizing: border-box;

        p {
            color: $textColor4;
            margin-bottom: 15px;
            font-size: 14px;
        }

        .card-edit-addr {
            overflow-y: auto;
            height: 170px;
            margin: 10px 0;

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin-bottom: 5px;
                .addr-cury{
                    font-size: 14px;
                    font-weight: bold;
                    font-family: PingFang-SC-Heavy, PingFang-SC sans-serif;
                    color: $mainColor15;
                }
                .ellipsis-copy{
                    margin-left: 15px;
                    font-size: 14px;
                    color: $textColor4;

                }
            }
        }

        .el-tag {
            height: 23px;
            line-height: 23px;
            margin-right: 10px;
            margin-top: 5px;
            border-radius: 0;
        }
    }

    .card-add {
        width: 100%;
        height: 100%;
        background-image: url("../../../../assets/image/pc/type-add.png");
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;

        .card-add-body {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p {
                color: $mainColor3;
            }
        }
    }
}

</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px) {
    .project-manage-card{
        width: 336px;
        height: 280px;
        .card-title{
            padding: 10px 15px;
        }
        .card-edit{
            padding: 5px 10px;
            .card-edit-addr{
                height: 168px;
                margin: 5px 0;
            }
        }
    }
}
</style>