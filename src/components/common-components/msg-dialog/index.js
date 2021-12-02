import msgDialogComponents from './be-msg-dialog.vue';

const BeMsgDialog = {
    install:function(Vue) {
        Vue.component('BeMsgDialog', msgDialogComponents)
    }
}

export default BeMsgDialog;