import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
let obj = {...zhLocale }.el
export const el = {
    ...obj,
    companyAddr:'联系地址：成都市武侯区世纪城南路599号天府软件园D7座504室',
    companyTel:'联系电话： 028-8326-2585',
    companyRecord:'蜀ICP备18013498号-1',
    companyName:'成都链安科技有限公司',
    copyright:'版权所有',
    emptyData:'暂无数据',
    scan:'查看',
    success:'成功',
    failed:'失败',
    create:'创建',
    add:'新增',
    edit:'编辑',
    delete:'删除',
    search:'查询',
    operation:'操作',
    pleaseInput:'请输入',
    pleaseSelect:'请选择',
    formatError:'格式错误',
    confirm:'确认',
    header:{
      me:'我',
      language:'语言',
      chinese:'中文',
      english:'英文',
      logout:'退出登录'
    },
    warningType: {
        recall:'重复调用',
        currencyTrade:'币种兑换',
        flash:'闪电贷',
        tradeLoop:'交易回环',
        ContractExecution:'合约执行',
    },
    loginConfig:{
        prodWelcome:'欢迎使用成都链安',
        prodName:'区块链态势感知管理平台',
        titleLogin:'登录',
        titleRegister:'用户注册',
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
        unameErr:'用户名格式错误',
        phoneNumErr:'6-12位字母+数字组合，可含特殊字符',
        tname:'请输入真实姓名',
        unitName:'请输入单位名称',
        addr:'请输入小区住址',
        email:'请输入邮箱地址',
        phone:'请输入手机号',
        goNameLogin:'已有账号去登录',
        getVerCodeValid:'获取验证码',
        phoneErr:'手机号格式错误',
        tnameErr:'英文或英文+数字组合，不超过15个字符',
        emailErr:'邮箱地址错误',
        newPassword:'请输入新密码',
        confirmPassword:'确认新密码',
        confirmReset:'确认重置',
        goLogin:'已有账号去登录',
        passwordAgreement:'两次输入密码不一致',
        resetPassword:'重置密码'
    },
    navTextConfig:{
        navName0:'链上态势',
        navName1:'项目排行',
        navName2:'风险警告',
        navName3:'项目管理',
        navName4:'系统配置',
    },
    subNav:{
        navName0:'链上态势',
        navName1:'项目排行',
        navName2:'风险警告',
        navName3:'项目管理',
        navName4s1:'风险类型配置',
        navName4s2:'风险评分配置',
    },
    systemConfig:{
        addType:'新增风险类型',
        warningType:'风险类型',
        features:'异常特征'
    },
    proManageConfig:{
        addPro:'点击创建项目',
        proPublic:'公开',
        proPrivate:'保密',
        createTime:'创建时间',
        reassess:'重新评估',
        delete:'是否要删除',
        isConfirm:'是否对',
        reassessInfo:'的所有安全项进行重新评估'
    },
    riskConfig:{
        platform:'链平台',
        searchBtn:'搜索',
        searchP:'请输入交易哈希、发送方、接收方',
        platformP:'请选择链平台',
        tableHeader:{
            txHash:'交易哈希',
            txTime:'交易时间',
            state:'交易状态',
            from:'发送方',
            to:'接收方',
            warningType:'疑似风险类型',
            score:'风险评估',
            detail:'分析详情',
        },
        features:'交易特征',
        values:'金额',
        txDetail:'在浏览器查看',
        stateSuccess:'成功',
        stateFailed:'失败',
        profit:'地址收益',
    },
    createProject:{
        createProjectTitle:'创建项目',
        createProjectName:'项目名称',
        createProjectNameInput:'如: PancakeSwap',
        createProjectCancel:'取 消',
        createProjectConfirm:'确 定',
        createProjectKeyWords:'关键词',
        createProjectKeyWordsInput:'多个关键词用“；”隔开，如：PancakeSwap;CAKE',
        createProjectOpenTitle:'是否公开',
        createProjectOpenSecret:'保密',
        contractSite:'合约地址',
        contractLabel:'合约标签',
        selectContractClass:'请选择',
        contractSiteInput:'如: xC1323fe4b68E9a4838168aea...',
        contractSiteLabel:'输入合约标签, 多个用分号隔开',
        verInfo:'请至少填写一条有效合约地址',
        verCE:'输入不合法，请输入仅支持中英文、数字',
        verCeSemicolonReg:'输入不合法，仅支持中英文、数字、分号,且不以分号开头',
        verCeSemicolonTag:'输入不合法'
    },
    addRiskWindow:{
        addRiskWindowTitle:'添加风险类型识别规则',
        addRiskWindowClassName:'类型名称',
        addRiskWindowNameInput:'输入自定义的风险类型名称',
        abnormalSelect:'异常特征',
        abnormalSelectInput:'全选/取消',
        selectAll:'全选/取消'
    },
    systemConfigScore:{
        changeConfig:'修改',
        formatConfigData:'初始化参数',
        changeConfigWarning:'是否要将本页面所有参数重置为初始状态？',
        configProject:'配置项目',
        weight:'权重',
        detailConfig:'详细配置',
        staticDetection:'静态检测',
        dangerHigh:'高危: ',
        dangerMiddle:'中危: ',
        dangerLow:'低危: ',
        // 交易安全
        tradeSafetyClass:'交易安全',
        flash_load_tx:'闪电贷交易: ',
        large_fee:'大额手续费: ',
        huge_profit:'巨额获利: ',
        repeat_call:'重复提交: ',
        tradeStable:'交易稳定性',
        tradeScore:'评分系数: ',
        safetyPublicOptionClass:'安全舆情',
        safetyPublicOption:'安全舆情: ',
        safetyPublicOptionPiece:'条',
        timeRange:'时间范围',
        timeTradeDate:'天内交易数据',
        inputEmpty:'输入为空',
        checkInput:'检查输入信息'
    },
}