/*
* small-dialog.vue
* @deprecated 基于element的el-dialog修改的弹框(用于下载和保存)
*/
<template>
    <div class="small-dialog">
        <el-dialog
            :title="title"
            :width="width"
            :custom-class="className"
            :modal-append-to-body="isAppendToBody"
            :visible ="visible"
            :close-on-click-modal="isClickExit"
            :close-on-press-escape="isEscExit"
            @close="close"
        >
            <div class="dialog-container">
                <div class="label-name">命名为：</div>
                <el-input maxlength="30" placeholder="请输入" v-model="fileName" class="handle-label-input" @change="valideValue"></el-input>
                <div class="label-error-tip" v-if="errorTip">{{errorTxt}}</div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="default" @click="close">取消</el-button>
                <el-button class="primary" type="primary" @click="save" >确认</el-button>
                
            </div>
        </el-dialog>
    </div>
</template>

<script>
/**
 * 下载的方案和接口一致，保存需要根据当前的业务进行保存操作
 */
export default {
    name: "smallDialog",
    data() {
        return {
            // 是否显示错误提示
            errorTip: false,
            // 错误提示内容
            errorTxt : null,
            // 文件名称
            fileName: this.saveFileName || ''
        };
    },
    props: {
        /**
         * 标题
         */
        title: {
            type: String,
            default: "",
        },
        /**
         * 弹框宽度
         */
        width:{
            type: String,
            default: "416px",
        },
        /**
         * Dialog 的自定义类名 
         */
        className:{
            type: String,
            default: "",
        },
        /**
         * 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
         */
        isAppendToBody: {
            type: Boolean,
            default: false,
        },
        /**
         * 显示隐藏
         */
        visible: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否开启点击退出
         */
        isClickExit: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否开启esc退出
         */
        isEscExit: {
            type: Boolean,
            default: false,
        },
        /**
         * 文件名称
         */
        saveFileName:{
            type: String,
            default: '',
        }
    },
    methods: { 
        valideValue(){
            if (!this.fileName) {
                this.errorTip = true;
                this.errorTxt = `请输入文件名称`;
            } else if (this.specialChar.test(this.fileName)) {
                this.errorTip = true;
                this.errorTxt = '文件名不能包含特殊字符';
            } else {
                this.errorTip = false;
                this.errorTxt = '';
            }
        },
        save(){
            let reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\s]/img
            if(!this.fileName){
                this.errorTip = true;
                this.errorTxt = '请输入文件名称';
            } else if(reg.test(this.fileName)){
                this.errorTip = true;
                this.errorTxt = '文件名不能包含特殊字符';
            } else {
                this.$emit("confirmResult", this.fileName, this.title);
                this.$emit('closepop');
            }
        },
        close(){
            this.$emit('closepop');
        }
    },
};
</script>

<style lang="scss" scoped>
    .small-dialog{
        .dialog-container{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .label-name{
                flex-shrink: 0;
            }
            .label-error-tip{
                position: absolute;
                bottom: -18px;
                left: 56px;
                color: #f01;
                font-size: 12px;
            }
        }
    }
</style>
