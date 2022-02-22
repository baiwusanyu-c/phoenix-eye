/*
* @zh.ts
* @deprecated 
* @author czh
* @update (czh 2021/12/15)
*/
export default {
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
    searchBtn:'搜 索',
    sevenD:'以上为近七日数据分析结果',
    detail:'查看详情',
    total:'共计',
    piece:'条',
    loss:'亏损',
    profit:'收益',
    signUp:'注册',
    contact:'联系我们',
    header:{
        me:'我',
        language:'language',
        chinese:'zh',
        english:'en',
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
        confirmLogout:'确认退出？',
        loginInfo:'登录成功!',
        loginExpire:'登录过期!',
        register:'注册',
        rember:'忘记密码',
        login:'登 录',
        loging:'登 录 中..',
        loginNameP:'请输入邮箱',
        loginNameP2:'请输入邮箱',
        loginPwdP:'请输入密码',
        loginVerCodeP:'请输入验证码',
        loginVerCodeP2:'请输入验证码',
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
        navName2:'风险交易',
        navName3:'项目管理',
        navName4:'系统配置',
        navName5:'项目浏览器',
    },
    subNav:{
        navName0:'链上态势',
        navName1:'项目排行',
        navName1s1:'项目排行/合约态势详情',
        navName1s2:'项目排行/项目态势详情',
        navName2:'风险交易',
        navName3:'项目管理',
        navName4:'系统配置',
        navName4s1:'风险类型配置',
        navName4s2:'风险评分配置',
    },
    systemConfig:{
        addType:'新增风险类型',
        warningType:'风险类型',
        features:'异常特征',
        reassess:'重新评估',
        delete:'是否要删除',
        isConfirm:'是否对',
        reassessInfo:'的所有安全项进行重新评估'
    },
    proManageConfig:{
        addPro:'点击创建',
        proPublic:'公开',
        proPrivate:'保密',
        createTime:'创建时间'
    },
    riskConfig:{
        platform:'链平台',
        searchP:'请输入交易哈希、发送方、接收方',
        platformP:'请选择链平台',
        tableHeader:{
            platform:'链平台',
            txHash:'交易哈希',
            txTime:'交易时间',
            state:'交易状态',
            from:'发送方',
            to:'接收方',
            warningType:'疑似风险类型',
            score:'风险评估',
            detail:'分析详情',
        },
        profitTableHeader:{
            addr:'地址',
            profitSum:'总收益',
            tokenName:'代币',
            tokenNum:'代币数量',
            tokenVal:'代币金额',
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
        editProjectTitle:'编辑项目',
        createProjectName:'项目名称',
        createProjectNameInput:'如: PancakeSwap',
        createProjectCancel:'取 消',
        createProjectConfirm:'确 定',
        createProjectKeyWords:'关键词',
        createProjectKeyWordsInput:'多个关键词用“；”隔开，如：PancakeSwap;CAKE',
        createProjectOpenTitle:'是否公开',
        createProjectOpenSecret:'保密',
        createProjectUnSecret:'公开',
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
        huge_transfer:'巨额转账: ',
        repeat_call:'重复提交: ',
        token_empty:'代币兑空: ',
        privileged_operation:'特权操作: ',
        tradeStable:'交易稳定性',
        tradeScore:'评分系数: ',
        safetyPublicOptionClass:'风险舆情',
        safetyPublicOption:'风险舆情: ',
        safetyPublicOptionPiece:'条',
        tip:'如：波动幅度为80%，则-80。扣分=100-波动幅度*100*评分系数',
        timeRange:'时间范围',
        timeTradeDate:'天内交易数据',
        inputEmpty:'输入为空',
        checkInput:'参数输入错误，请检查输入信息'
    },
    projectRinking:{
        contract:'合约',
        proNum:'编号',
        name:'项目名',
        contractNum:'合约数量',
        score: '安全评分',
        txScale:'交易规模',
        searchP:'输入项目名称或合约地址',
        onlineTime:'上线时间',
        createTime:'创建时间',
        contractSecurity:'合约安全',
        feelingSecurity:'舆情安全',
        txSecurity:'交易安全',
        txStability:'交易稳定',
        staticDetection:'静态检测',
        feeling:'舆论情绪',
        highCall:'高频调用',
        outlineTitle:'项目态势概要',
        outlineSDTxt:'共检测出',
        outlineSDH:'高危漏洞',
        outlineSDM:'中危漏洞',
        outlineSDL:'低危漏洞',
        outlineTS:'共发现',
        outlineTSM:'风险交易，可能遭受',
        outlineTST:'交易金额波动范围为',
        outlineFL:'风险舆情',
        hCRanking:'排名',
        hCAddr:'地址',
        hCCallNum:'调用次数',
        allProJ:'全部项目',
        txSumNum:'交易总量',
        txSumTotal:'交易总数',
        callSumTotal:'调用总数',
        userSumNum:'用户总数',
        contractSumNum:'合约总数',
        txFeatures:'交易特征',
        contractOverview:'合约概况',
        contractBalance:'合约余额',
        safetyAssessment:'安全评估',

        projectChose:'共找到多个目标，请选择其中一个',
        projectName:'所属项目: ',

        marketPerformance:{
            headerTitle:'市场表现',
            tradeVolume:'总交易量:',
            userVolume:'总用户数:',
            contractVolume:'总合约数:',
            tradeNum:'交易量',
            newUserNum:'新增用户',
            time:'日期',
            userNum:'用户数'
        },
        tradeStb:{
            all:'全部'
        },
        safetyOpinion: {
            textOriginal:'查看原文',
        },
    },
    blotua:{
        projectName:'区块链态势感知平台',
        enter:'进入系统',
        jrjyl:'今日交易量',
        xmph:'项目排行',
        jyfx:'交易风险',
        fxyq:'风险舆情',
        jyfxqs:'风险交易趋势',
        jyfxNum:'风险交易数',
        noData:'no data or the data is 0',
        time:'时间',
        rank:'排行',
        xmgm:'项目规模',

    }
}