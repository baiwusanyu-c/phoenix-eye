/*
* @Author: yinian430
* @desc: 基于element的消息小弹窗
* @Date: 2020-07-21 17:06:49
* @Last Modified by: czh
* @Last Modified time: 2021-04-21 14:19:09
*/
<template>
    <div class="be-msg-dialog" :class="customClass" id="be_msg_dialog">
        <be-dialog
                ref='beMsgDialog'
                :is-show.sync="isShow"
                :is-open-modal="true"
                :is-drag="false"
                :titles="headerTitle"
                @close="closeMsg"
                custom-class="msg-dialog">

            <div class="msg-dialog-body">
                <img class="img" src="@/assets/image/pc/caveat.png" alt="">
                <p class="title" v-if="title">{{title}}</p>
                <p class="subTitle" v-if="subTitle">{{subTitle}}</p>
            </div>
            <template #footer>
            <div class="dialog-footer" v-if="isShowBtn">
                <be-button customClass="eagle-cancel-btn" type="success" v-if="isShowCancel" @click="closeMsg">{{ $t('lang.createProject.createProjectCancel') }}</be-button>
                <be-button customClass="eagle-btn" type="success" v-if="isShowConfirm" @click="confirm">{{ $t('lang.createProject.createProjectConfirm') }}</be-button>
            </div>
            </template>
        </be-dialog>
    </div>
</template>

<script lang="ts">
    import {BeDialog,BeButton} from "../../../../public/be-ui/be-ui.es.js";
    import {ref,defineComponent,computed} from "vue";
    export default defineComponent({
        /**
         * 基于element的消息小弹窗
         */
        name: 'MsgDialog',
        emits:[
            'confirm',
            'close'
        ],
        components:{BeButton,BeDialog},
        props: {
            /**
             * 自定义主题
             */
            theme: {
                type: String,
                default: ''
            },
            headerTitle:{
                type: String,
                default: ''
            },
            /**
             * 弹窗标题
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * 弹窗子标题
             */
            subTitle: {
                type: String,
                default: ''
            },
            /**
             * 是否显示下方按钮
             */
            isShowBtn: {
                type: Boolean,
                default: true
            },
            /**
             * 是否显示确认按钮
             */
            isShowConfirm: {
                type: Boolean,
                default: true
            },
            /**
             * 是否显示取消按钮
             */
            isShowCancel: {
                type: Boolean,
                default: true
            },
            /**
             * 是否显示
             */
            isShow: {
                type: Boolean,
                default: false
            },
            /**
             * 是否显示loading
             */
            isLoading:{
                type: Boolean,
                default: false
            }
        },
        setup(props,ctx){
            const customClass = computed(()=>{
                return `be-msg-dialog--${props.theme}`
            })
            /**
             * 确认方法
             */
            const confirm = ():void => {
                ctx.emit('confirm');
                closeMsg()
            }
            /**
             * 关闭方法
             */
            const closeMsg = ():void => {
                ctx.emit('close');
            }
            return{
                confirm,
                closeMsg
            }
        }
    })
</script>

<style lang='scss' scoped>
  .be-msg-dialog {

    .img {
      display: block;
      width: 62px;
      margin: auto;
    }

    .title {
      margin-top: 20px;
      text-align: center;
      @include text($fz16, $textColor3, 21px, 400);
      word-break: break-all;
    }

    .subTitle {
      margin-top: 8px;
      text-align: center;
      @include text($fz16, $textColor5, 21px, 400);
    }
  }
</style>
<style lang='scss'>

  #be_msg_dialog {

    .msg-dialog{
      top: 26vh;
      left: calc(50% - 218px);
      width: 436px;
      min-height: 280px;
      background: white;

      .be-dialog-title{
        line-height: 24px;

        .be-dialog-contanter-head{
          height: 30px;
          padding: 0;

          .be-title{
            font-size: 18px;
            font-weight: bold;
            line-height: 20px;
            color:$textColor3;
          }
        }
      }

      .msg-dialog-body{
        box-sizing: border-box;
        padding: 0 22px;
      }

      .dialog-footer{
        display: flex;
        justify-content: space-around;
        width: 56%;
      }
    }
  }
</style>

