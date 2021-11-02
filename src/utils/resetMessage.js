import { Message } from 'element-ui'; // 引入message

let messageInstance = null;
const resetMessage = (options) => {
    if(messageInstance) {
        messageInstance.close() //关闭
    }
    messageInstance = Message(options)
};
['error','success','info','warning'].forEach(type => {
    resetMessage[type] = options => {
        if(typeof options === 'string') {
            options = {
                message:options,
                showClose: true,
                offset:60
            }
        }
        options.type = type
        //options.offset = 60
        // options.duration = 0
        return resetMessage(options)
    }
})
export const message = resetMessage