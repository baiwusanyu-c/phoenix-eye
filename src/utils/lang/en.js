import enLocale from 'element-ui/lib/locale/lang/en'
let obj = {...enLocale }.el
export const lang = {
    ...obj,
    loginConfig:{
        prodWelcome:'欢迎使用成都链安',
        prodName:'区块链态势感知管理平台',
        loginInfo:'登录成功!',
        register:'注册',
        rember:'忘记密码',
        login:'登 录',
        loging:'登 录 中..',
        loginNameP:'请输入用户名/手机号',
        loginPwdP:'请输入密码',
        loginVerCodeP:'请输入验证码',
        phoneLogin:'手机验证码登录',
        loginNameValid:'请输入用户名称',
        loginPwdValid:'请输入登录密码',
        loginVerCodeValid:'请输入验证码',
    },
    navTextConfig:{
        navName0:'BlockchainSituation',
        navName1:'ProjectRanking',
        navName2:'RiskWarning',
        navName3:'ProjectManagement',
        navName4:'SystemConfig',
    }
}