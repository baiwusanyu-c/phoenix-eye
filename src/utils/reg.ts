

//邮箱
// eslint-disable-next-line
// export const emailReg:RegExp = /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export const emailReg:RegExp = /^(\w)+((\.\w+)|(\-\w+))*@(\w|\-)+((\.\w+)+)$/;
//手机
export const phoneReg:RegExp = /^1\d{10}$/;
//币种与交易
export const BTChash:RegExp = /^[0-9a-fA-F]{64}$/;
export const BTCaddress:RegExp = /^(1|3)[1-9a-km-zA-HJ-NP-Z]{32,33}$|^(bc1)[0-9a-z]{39}$|^(bc1)[0-9a-z]{59}$|^(p|q)[0-9a-hj-np-z]{41}$/;
export const ETHhash:RegExp = /^(0x)[0-9a-zA-Z]{64}$/;
export const ETHaddress:RegExp = /^(0x)[0-9a-zA-Z]{40}$/;
export const ETHhashN0x:RegExp = /^[0-9a-zA-Z]{64}$/;
export const ETHaddressN0x:RegExp = /^[0-9a-zA-Z]{40}$/;
export const TRONaddress:RegExp = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
export const TRONhash:RegExp = /^[0-9a-zA-Z]{64}$/;

//中文与空格
export const hzReg:RegExp = new RegExp("[\u4e00-\u9fa5]");
//空格
export const spaceReg:RegExp = new RegExp("\\s");
//密码
export const pwdReg:RegExp = new RegExp("^[0-9a-zA-Z,./?@#$%，。、？~`！￥…&*（）()+_‘’|；:;!,\",\'-~]{6,12}$"); //new RegExp(/^[^\u4e00-\u9fa5\s]{6,20}$/);
export const specialChar:RegExp = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\s]/img; //new RegExp("^[0-9a-zA-Z,./?@#$%，。、？~`！￥…&*（）()+_‘’|；:;!,\",\'-~]{6,20}$");
//用户名(根据bug 2828，修改为15位)
export const nameReg:RegExp = /^(?!\d+$)[\da-zA-Z]{1,15}$/;
// 只允許中英文，和中英文分號，且不允许符号开头
export const ceSemicolonReg:RegExp = /^(?![;；])[ \u4e00-\u9fa5a-zA-Z0-9；;()（）]+$/
// 项目名称，只允許中英文数字、空格、括号
export const ceReg:RegExp = /^[ \u4e00-\u9fa5a-zA-Z0-9()（）]+$/
