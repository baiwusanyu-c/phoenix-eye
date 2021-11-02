/*
* @project-manage-card.vue
* @deprecated 项目管理列表卡片
* @author czh
* @update (czh 2021/11/2)
*/
<template>
    <div :class="`project-manage-card`">
        <div v-if="type === 'edit'" :class="`card-title card-title-${projectType}`">
            <div style="display: flex">
                <h3>
                    {{ title }}
                </h3>
                <span>{{
                        projectType === 'public' ? $t('lang.proManageConfig.proPublic') : $t('lang.proManageConfig.proPrivate')
                    }}</span>
            </div>
            <div>
                <be-svg-icon @click='emitFunc("fresh")' style="cursor: pointer" icon-class="-shuaxin"
                             disabled-tool-tip></be-svg-icon>
                <be-svg-icon @click='emitFunc("edit")' style="cursor: pointer" icon-class="-renwuguanli-xiugai"
                             disabled-tool-tip></be-svg-icon>
                <be-svg-icon @click='emitFunc("delete")' style="cursor: pointer" icon-class="-renwuguanli-shanchu"
                             disabled-tool-tip></be-svg-icon>
            </div>
        </div>
        <div v-if="type === 'edit'" class="card-edit">
            <div>
                <el-tag v-for="(item) in tagList" :key="item + _uid">{{ item }}</el-tag>
            </div>
            <div class="card-edit-addr scrollDiy">
                <ul>
                    <li v-for="(addrItem) in addrList" :key="addrItem.addr">
                        <span class="addr-cury">{{ addrItem.currency }}</span>
                        <be-ellipsis-copy :targetStr="addrItem.addr" fontLength="14" endLength="14">
                        </be-ellipsis-copy>
                    </li>
                </ul>
            </div>
            <p>{{ $t('lang.proManageConfig.createTime') }} : {{ createTime }}</p>
        </div>
        <!--    新增时显示   -->
        <div v-if="type === 'add'" class="card-add">
            <div class="card-add-body" @click='emitFunc("add")'>
                <img src="@/assets/image/pc/add-type-icon.png"/>
                <p>{{ $t('lang.proManageConfig.addPro') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import BeSvgIcon from "../../../../components/common-components/svg-icon/be-svg-icon";

export default {
    name: "project-manage-card",
    components: {BeSvgIcon},
    data() {
        return {}
    },
    props: {
        type: {
            type: String,
            default: 'add'
        },
        tagList: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
        },
        projectType: {
            type: String,
            default: 'public'
        },
        createTime: {
            type: String,
        },
        addrList: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
    },
    methods: {
        /**
         * 触发事件方法
         * @param {String} evtName - 事件名称
         */
        emitFunc(evtName) {
            this.$emit(evtName)
        }
    },
}
</script>

<style lang="scss">
.project-manage-card {
    background-color: $mainColor7;
    width: 400px;
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
            height: 180px;
            margin: 10px 0;

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin-bottom: 5px;
                .addr-cury{
                    font-size: 14px;
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