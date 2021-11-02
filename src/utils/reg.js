import Vue from 'vue'

//邮箱
// eslint-disable-next-line
// Vue.prototype.emailReg = /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
Vue.prototype.emailReg = /^(\w)+((\.\w+)|(\-\w+))*@(\w|\-)+((\.\w+)+)$/;
//手机
Vue.prototype.phoneReg =  /^1\d{10}$/;
//币种与交易
Vue.prototype.BTChash = /^[0-9a-fA-F]{64}$/;
Vue.prototype.BTCaddress = /^(1|3)[1-9a-km-zA-HJ-NP-Z]{32,33}$|^(bc1)[0-9a-z]{39}$|^(bc1)[0-9a-z]{59}$|^(p|q)[0-9a-hj-np-z]{41}$/;
Vue.prototype.ETHhash = /^(0x)[0-9a-zA-Z]{64}$/;
Vue.prototype.ETHaddress = /^(0x)[0-9a-zA-Z]{40}$/;
Vue.prototype.ETHhashN0x = /^[0-9a-zA-Z]{64}$/;
Vue.prototype.ETHaddressN0x = /^[0-9a-zA-Z]{40}$/;
Vue.prototype.TRONaddress = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
Vue.prototype.TRONhash = /^[0-9a-zA-Z]{64}$/;

//中文与空格
Vue.prototype.hzReg = new RegExp("[\u4e00-\u9fa5]");
//空格
Vue.prototype.spaceReg = new RegExp("\\s");
//密码
Vue.prototype.pwdReg = new RegExp("^[0-9a-zA-Z,./?@#$%，。、？~`！￥…&*（）()+_‘’|；:;!,\",\'-~]{6,12}$"); //new RegExp(/^[^\u4e00-\u9fa5\s]{6,20}$/);
Vue.prototype.specialChar = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\s]/img; //new RegExp("^[0-9a-zA-Z,./?@#$%，。、？~`！￥…&*（）()+_‘’|；:;!,\",\'-~]{6,20}$");
//用户名(根据bug 2828，修改为15位)
Vue.prototype.nameReg = /^(?!\d+$)[\da-zA-Z]{1,15}$/;