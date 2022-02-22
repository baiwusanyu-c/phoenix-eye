/*
* @login-dialog.vue
* @deprecated
* @author czh
* @update (czh 2022/2/22)
*/
<template>
    <div id="login_dialog">
        <be-dialog
            titles=" "
            ref='loginDialogInner'
            :is-show="showDialog"
            :is-open-modal="true"
            :is-drag="false"
            layout="center"
            @close="handleClose"
            custom-class="login-dialog">
            <div>
                <el-select v-model="val" class="m-2" placeholder="Select" size="large">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
            <template #footer>
                <be-button customClass="eagle-btn" type="primary">
                    注册
                </be-button>
            </template>
        </be-dialog>
    </div>

</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {BeDialog,BeButton} from "../../../../public/be-ui/be-ui.es.js";
export default defineComponent({
    name: "login-dialog",
    components:{
        BeDialog,BeButton
    },
    setup(){
        const showDialog = ref<boolean>(false)
        const val = ref<string>('')
        const options = [
            {
                value: 'Option1',
                label: 'Option1',
            },
            {
                value: 'Option2',
                label: 'Option2',
            },
            {
                value: 'Option3',
                label: 'Option3',
            },
            {
                value: 'Option4',
                label: 'Option4',
            },
            {
                value: 'Option5',
                label: 'Option5',
            },
        ]

        const handleClose = ():void =>{
            // 重置表单

            // 关闭弹窗
            showDialog.value = false
        }
        return {
            options,
            val,
            showDialog,
            handleClose,
        }
    }
})

</script>

<style lang="scss">
#login_dialog{

  .login-dialog {
    width: 1080px;
    height: 592px;
    background-image: url("../../../assets/image/pc/login-bg.png");
    background-repeat: round;
    background-size: 100%;
    border: 4px;

    .be-dialog-title{
      background-color: transparent;

    }

  }
}

</style>