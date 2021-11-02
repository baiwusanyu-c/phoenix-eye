import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
let obj = {...zhLocale }.el

export const lang = {
    ...obj,
    loginConfig:{
        prodWelcome:'欢迎使用成都链安',
        prodName:'区块链态势感知管理平台',
        titleLogin:'登录',
        titleRegister:'新用户注册',
        titleReset:'忘记密码',
        titleDeadline:'到期提示',
        infoDeadLine:'您的账号权益已到期，请及时续费。在此期间可通过免费版用户登录入口使用产品免费版!',
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
        navName0:'链上态势',
        navName1:'项目排行',
        navName2:'风险警告',
        navName3:'项目管理',
        navName4:'系统配置',
        createProjectTitle:'创建项目',
        createProjectName:'项目名称',
        createProjectNameInput:'如: PancakeSwap',
        createProjectCancel:'取消',
        createProjectConfirm:'确定',
        createProjectKeyWords:'',
        createProjectKeyWordsInput:'',
    }
}