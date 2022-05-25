/*
 * @en.ts.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/15)
 */
export default {
  searchT: 'SEARCH',
  reTry: 'RETRY',
  companyAddr: '联系地址：成都市武侯区世纪城南路599号天府软件园D7座504室',
  companyTel: '联系电话： 028-8326-2585',
  companyRecord: '蜀ICP备18013498号-1',
  companyName: '成都链安科技有限公司',
  copyright: 'Copyright',
  emptyData: 'No data available',
  noRisk: 'No risk transactions detected',
  scan: 'View',
  success: 'Success',
  maxUpload: 'Maximum file upload limit is 100MB',
  failed: 'Failed',
  create: 'Create',
  add: 'Add',
  edit: 'Edit',
  delete: 'Delete',
  search: 'Query',
  operation: 'Operation',
  pleaseInput: 'Please input ',
  pleaseSelect: 'Please select ',
  formatError: 'Format error',
  upload: 'Upload',
  confirm: 'Confirm',
  searchBtn: 'Search',
  sevenD: 'The above is the result of data analysis from the last seven days ',
  detail: 'View details',
  total: 'Total',
  piece: 'piece',
  loss: 'loss',
  profit: 'profit',
  signUp: 'Sign Up',
  contact: 'Contact',
  request: {
    title: 'Request Audit',
  },
  feedback: {
    title: 'Feedback',
    formTitle: 'Title',
    formContent: 'Content',
    formContractP:
      'If you have any questions about the information we present, or find any errors, please contact us and we will correct them in time.',
  },
  header: {
    me: 'Me',
    language: '语言',
    chinese: 'zh',
    english: 'en',
    logout: 'Logout',
  },
  warningType: {
    recall: 'Repeat call',
    currencyTrade: 'Currency exchange',
    flash: 'Flash loan',
    tradeLoop: 'Transaction loopback',
    ContractExecution: 'Contract execution',
  },
  loginConfig: {
    prodWelcome: 'Welcome to Beosin',
    prodName: 'Blockchain Situation Awareness Management Platform',
    titleLogin: 'Login',
    titleRegister: 'Registration',
    titleReset: 'Forgot password',
    titleDeadline: 'Expiration Alert',
    infoDeadLine:
      'Your account rights have expired, please renew it in time. During this period you can use the free version through the user login portal.',
    confirmLogout: 'Confirm logout ?',
    loginInfo: 'Login successfully!',
    register: 'Register',
    rember: 'Forgot password',
    forget: 'Forgot password ?',
    login: 'Login',
    loging: 'Logging in...',
    loginExpire: 'Login Expired!',
    loginNameP: 'Please enter your email address',
    loginNameP2: ' email',
    loginNameP3: 'Please enter your username or email',
    loginPwdP: 'Please enter your password',
    loginVerCodeP: 'Please enter the verification code',
    loginVerCodeP2: 'verification code',
    phoneLogin: 'Login via mobile phone',
    loginNameValid: 'Please enter user name',
    loginPwdValid: 'Please enter login password',
    loginVerCodeValid: 'Please enter the verification code',
    unameErr: 'User name format error',
    phoneNumErr: '6-12 letters + numbers combination, support special characters',
    tname: 'Please enter your real name',
    unitName: 'Please enter your company name',
    addr: 'Please enter the residential address',
    email: 'Please enter your email address',
    phone: 'Please enter your mobile number',
    goNameLogin: 'Already have an account, login now',
    getVerCodeValid: 'Get verification code',
    phoneErr: 'Phone number format error',
    tnameErr: 'English letters or letters+number combination, not more than 15 characters',
    emailErr: 'Email address error',
    newPassword: 'Please enter a new password',
    confirmPassword: 'Confirm new password',
    confirmReset: 'Confirm the reset',
    goLogin: 'Already have an account, Login now',
    passwordAgreement: 'The two passwords entered are inconsistent',
    resetPassword: 'Reset password',
    resetPasswordSuccess: 'Reset password successfully',
    registerSuccess: 'Register successfully',
    send: 'send',
  },
  navTextConfig: {
    navName0: 'On-chain situation',
    navName1: 'Project ranking',
    navName2: 'Risk trx',
    navName3: 'Project management',
    navName4: 'System configuration',
    navName6: 'Risk Public Information',
    navName7: 'Address Monitor',
    navName8: 'Trx Retry',
    navName9: 'Operational Statistics',
    navName10: 'Malicious Website',
  },
  subNav: {
    navName0: 'On-chain situation',
    navName1: 'Project ranking',
    navName1s1: 'Project ranking/contract status details',
    navName1s2: 'Project ranking/contract status details',
    navName2: 'Risk Trx',
    navName3: 'Project Management',
    navName4: 'System Configuration',
    navName5: 'Project Explorer',
    navName6: 'Risk Public Information',
    navName7: 'Address Monitor',
    navName8: 'Trx Retry',
    navName9: 'Operational Statistics',
    navName10: 'Malicious Website',
    navName11: 'Security Incident',
    navName4s1: 'Risk type configuration',
    navName4s2: 'Risk score configuration',
  },
  systemConfig: {
    addType: 'Add risk type',
    warningType: 'Risk type',
    features: 'Exceptional features',
    reassess: 'Reassess',
    delete: 'Whether to delete ',
    isConfirm: 'Whether to',
    reassessInfo: 'reassess all security items',
  },
  proManageConfig: {
    addPro: 'Click to create',
    proPublic: 'Public',
    proPrivate: 'Confidential',
    createTime: 'Create time',
  },
  riskConfig: {
    platform: 'Blockchain platform',
    searchP: 'Trx Hash / Address',
    platformP: 'Please select the blockchain platform',
    gainerExp: 'The address with the highest return on the trx',
    amountExp: 'Estimate the total proceeds of the address in this transaction',
    filter: {
      chain: 'Chain',
      type: 'Type',
      level: 'Alert Level',
      dangerHigh: 'High',
      dangerMiddle: 'Medium',
      dangerLow: 'Low',
    },
    tableHeader: {
      platform: 'Chain',
      txHash: 'Trx Hash',
      level: 'Alert Level',
      warningType: 'Type',
      gainer: 'Gainer',
      amount: 'Amount',
      txTime: 'Date',
      from: 'From',
      to: 'To',
    },
    profitTableHeader: {
      addr: 'Address',
      profitSum: 'Amount',
      tokenName: 'Coin & Token',
      tokenNum: 'Value',
      tokenVal: 'Income',
    },
    features: 'Type',
    values: 'Value',
    stateSuccess: 'Success',
    stateFailed: 'Failed',
    profit: 'Address Income',
    PrivilegedOperation: 'PrivilegedOperation',
    slump: 'Slump',
    presentPrice: 'Present Price',
  },
  projectExplorer: {
    searchP: 'ProjectName / Contract',
    example: 'e.g.',
    project: 'Project',
    contract: 'Contract',
    MultipleResults: 'Multiple results are matched. Select one of them',
    name: 'Project Name',
    base: {
      title: 'Security Checker on ',
      title2: 'Web3',
      subTitle: 'Project evaluation, contract check, risk warning',
      item1: 'Total Market Cap',
      item2: 'Project',
      item3: 'Chains',
    },
    alert: {
      title: 'Risk Alert',
      title2: 'Hot Projects',
      plugin: 'Website security Detection.',
      install: 'Install the extension',
      quesTitle: 'Have questions about the results?',
      quesTitle2: 'Join in channel to discuss.',
      more: 'Learn More',
    },
    exp: {
      addTitle: 'New Project Added',
      title: 'Project Explorer',
      tableHeader: {
        project_name: 'Projects',
        security_score: 'Security Score',
        tx_24: 'trx/24h',
        market_cap: 'Market Cap',
        token_price: 'Token Price',
        create_time: 'Added on',
        platform: 'Chain',
        audit_report_num: 'Beosin Audit',
      },
    },
    security: {
      title: 'Security News',
    },
    detail: {
      title: 'Project Details',
      top5Title1: 'Top 5 Token Holders',
      top5Title2: 'Top 5 Liquidity Pairs Holders',
      riskTrx: 'Risk Trx',
      audit: 'Audit',
      riskPublicOpinion: 'Risk Public Opinion',
      subscribe: 'Subscribe',
      source: 'source',
      contractStatistics: 'Contract Statistics',
      transactions: 'Transactions',
      transactionsTotal: 'Transactions(Total)',
      lastDate: 'Latest Trading Date',
      socialProfiles: 'Social Profiles',
      address: 'address',
      percentage: 'percentage',
      quantity: 'quantity',
      pair: 'pair',

      titleDecent: 'Decentralization',
      titleDecentSub: 'Whale holders and privileges.',
      titleMarket: 'Market Volatility',
      titleMarketSub: 'Price and transaction status.',
      titleRisk: 'Risk Transacions',
      titleRiskSub: 'On-chain performance and social performance.',
      titleInfo: 'Project information',
      titleSecurity: 'Securtity Event',
      titleGovern: 'Diaphaneity & Governance',
      securtityEventLabel1: 'Allect project:',
      securtityEventLabel2: 'Abstract:',
      securtityEventLabel3: 'Attect type:',
      securtityEventLabel4: 'Amount of loss:',
      governLabel1: 'Open source code',
      governLabel2: 'information disclosure',
      governLabel3: 'Document',
      governLabel4: 'Onboard of exchange',
      governLabel5: 'On-line test chain',
      governSubLabel1: 'github',
      governSubLabel2: 'official website',
      governSubLabel3: 'social media',
      governSubLabel4: 'address markup',
      governSubLabel5: 'white paper',
      view: 'view',
      unknows: 'unknown',
      marketTab1: 'Token Price',
      marketTab2: 'Transfer volume',
      marketTab3: 'Liquidity',
      marketTab4: 'Market Cap',
    },
  },
  createProject: {
    createProjectTitle: 'Create',
    editProjectTitle: 'Edit Project',
    createProjectName: 'Project Name',
    createProjectNameInput: 'e.g. PancakeSwap',
    createProjectCancel: 'Cancel',
    createProjectConfirm: 'Confirm',
    notFound: 'Project not found',
    createOne: 'Create one',
    selectContractClass: 'Please select',
    verInfo: 'Please fill in at least one valid contract address',
    verCE: 'Input is illegal, please input English letters, Chinese characters, number only',
    verCeSemicolonReg: 'Input is illegal, do not start with semicolon',
    verCeSemicolonTag: 'Input is illegal',
    searchP: 'Project name / Contract / Associated Account',

    contact: 'Contact',
    contactDesc:
      'Please leave your contact information, we will give you the latest status feedback.',
    messageBoard: 'Message Board',
    label1: 'Basic Information',
    createProjectKeyWords: 'Short Name',
    createProjectKeyWordsInput: 'Multiple Short Name separated by ";", e.g. PancakeSwap;CAKE',
    chain: 'Chain',
    tokenAddress: 'Token Address',
    contractSiteInput: 'e.g. xC1323fe4b68E9a4838168aea...',
    contractSite: 'Contract address',
    logo: 'Logo',
    selectFile: 'select file',
    label2: 'Social Information',
    label3: 'Operating Information',
    markup: 'Address Markup',
    whitePaper: 'White Paper',
    operation: 'Operation Manual',
    boardExchange: 'Ob Board Of Exchange',
    testChain: 'On Test Chain',

    label4: 'Audit',
    tableHeader: {
      projectName: 'Project Name',
      shortName: 'Short Name',
      contractNum: 'Contract',
      auditNum: 'Audit',
      publicOpinion: 'Public Opinion(24h)',
      createTime: 'Create Time',
      operation: 'Operation',
    },
  },

  addRiskWindow: {
    addRiskWindowTitle: 'Add risk type identification rules',
    addRiskWindowClassName: 'Type name',
    addRiskWindowNameInput: 'Enter a custom risk type name',
    abnormalSelect: 'Exception feature',
    abnormalSelectInput: 'Select all/Cancel',
    selectAll: 'Select all/Cancel',
  },
  systemConfigScore: {
    changeConfig: 'Modify',
    formatConfigData: 'Initialize parameters',
    changeConfigWarning: 'Reset all parameters of this page to the initial state?',
    configProject: 'Configuration project',
    weight: 'Weight',
    detailConfig: 'Detailed configuration',
    staticDetection: 'Static Detection',
    dangerHigh: 'High risk: ',
    dangerMiddle: 'Medium risk: ',
    dangerLow: 'Low risk: ',
    // Transaction security
    tradeSafetyClass: 'Transaction security',
    flash_load_tx: 'Flashloan transaction: ',
    large_fee: 'High gas fee: ',
    huge_transfer: 'LargeOutflow: ',
    repeat_call: 'Repeated submission: ',
    token_empty: 'empty token: ',
    privileged_operation: 'privileged operation: ',
    tradeStable: 'Transaction stability',
    tradeScore: 'Scoring factor: ',
    safetyPublicOptionClass: 'Threat intelligence',
    safetyPublicOption: 'Threat intelligence: ',
    safetyPublicOptionPiece: 'Article',
    tip: '如：波动幅度为80%，则-80。扣分=100-波动幅度*100*评分系数',
    timeRange: 'Time Range',
    timeTradeDate: 'Transaction data within days',
    inputEmpty: 'Input is empty',
    checkInput: 'Parameter input error, please check the input information',
  },
  projectRinking: {
    contract: 'Contract',
    proNum: 'No.',
    name: 'Project Name',
    contractNum: 'Number of contracts',
    score: 'Security score',
    txScale: 'Transaction scale',
    searchP: 'Enter project name or contract address',
    onlineTime: 'Launch time',
    createTime: 'Create time',
    contractSecurity: 'Contract security',
    feelingSecurity: 'Situational security',
    txSecurity: 'Transaction security',
    txStability: 'Transaction stability',
    staticDetection: 'Static detection',
    feeling: 'Social sentiment',
    highCall: 'High frequency call',
    outlineTitle: 'Project situation overview',
    outlineSDTxt: 'Total detected',
    outlineSDH: 'High-risk vulnerability',
    outlineSDM: 'Medium-risk vulnerability',
    outlineSDL: 'Low-risk vulnerability',
    outlineTS: 'Total discovered',
    outlineTSM: 'Risky transaction, may suffer',
    outlineTST: 'Transaction amount fluctuates in the range of',
    outlineFL: 'Risk situation',
    hCRanking: 'Ranking',
    hCAddr: 'Address',
    hCCallNum: 'Times of calls',
    allProJ: 'All projects',
    txSumNum: 'Total value of transactions',
    txSumTotal: 'Total number of transactions',
    callSumTotal: 'Total number of calls',
    userSumNum: 'Total number of users',
    contractSumNum: 'Total number of contracts',
    txFeatures: 'Transaction Features',
    contractOverview: 'Contract Overview',
    contractBalance: 'Contract Balance',
    safetyAssessment: 'Security Assessment',

    projectChose: 'Multiple targets were found. Please select one of them.',
    projectName: 'Affiliated Projects: ',

    marketPerformance: {
      headerTitle: 'Market performance',
      tradeVolume: 'Total transaction volume:',
      userVolume: 'Total number of users:',
      contractVolume: 'Total number of contracts:',
      tradeNum: 'Transaction volume',
      newUserNum: 'New users',
      time: 'Date',
      userNum: 'Number of users',
    },
    tradeStb: {
      all: 'All',
    },
    safetyOpinion: {
      textOriginal: 'View the original text',
    },
  },
  blotua: {
    projectName: 'Blockchain Situation Awareness Platform',
    enter: 'Enter the platform',
    jrjyl: "Today's transaction volume",
    xmph: 'Project ranking',
    jyfx: 'Transaction risks',
    fxyq: 'Threat intelligence',
    jyfxqs: 'Risk transaction trends',
    jyfxNum: 'Number of risk transactions',
    noData: 'No data or the data is 0',
    time: 'Time',
    rank: 'Ranking',
    xmgm: 'Project scale',
  },
  subscribe: {
    titleSuccess: 'Subscription Successful',
    success: 'We will send the latest risk trading and public opinion information to your email',
    titleFailed: 'Failing',
    failed: 'Failure due to unknown reasons, please contact our customer service.',
    titleUn: 'Unsubscribes',
    unSubscribes: 'Unsubscribe succeeded!',
  },
  trxRetry: {
    searchP: 'Trx Hash',
    result: 'You have submitted！please check later on the risk trx page.',
  },
  riskPublicInfo: {
    searchP: 'Key Words',
  },
  addrMonitor: {
    searchP: 'Address',
    create: 'Add the monitor',
    title: 'Address Monitor',
    tableHeader: {
      addr: 'Address',
      remark: 'Remark',
      createTime: 'Create Time',
      link: 'The Event Link',
      operate: 'Operate',
    },
    form: {
      labelAddr: 'Address',
      labelRemark: 'Remark',
      labelLink: 'The Event Link',
      linkDiscr: 'Add an associated security event link.',
    },
  },
  operationalStatistics: {
    title: 'Visits',
    titleDesc: 'Count the IP addresses accessing the system',
    lineTitle: '30 day data statistics',
    searchP: 'Enter the Ip Address',
    days: 'day',
    weeks: 'week',
    month: 'month',
    tableHeader: {
      IPAddress: 'IP Address',
      IPAttribution: 'IP Attribution',
      accessTime: 'Access Time',
      accessModule: 'Access Module',
    },
  },
  siteManage: {
    searchP: 'Enter the Url Address',
    tableHeader: {
      url: 'Url',
      tag: 'Tag',
      source: 'Source',
      createTime: 'Create Time',
      operation: 'Operation',
    },
    form: {
      title: 'Create Malicious Site',
      url: 'Url',
      tag: 'Tag',
      inputP: "Please use English ';' when entering multiple URL addresses division",
    },
  },
  securityIncident: {
    title: 'Security Incident',
    searchP: 'project / address /trx hash',
    tableHeader: {
      project: 'Project',
      attackType: 'Attack Type',
      amount: 'Amount Of Loss',
      link: 'Event Link',
      attackAddr: 'Attack Address',
      attackedAddr: 'Attacked Address',
      attackedTrx: 'Attack Trx',
      operation: 'Operation',
    },
    form: {
      project: 'Project',
      attack_type: 'Attack Type',
      loss_amount: 'Amount Of Loss',
      abstract_content: 'Abstract',
      event_link: 'Event Link',
      attack_address_arr: 'Attack Address',
      attacked_address_arr: 'Attacked Address',
      attack_trx_arr: 'Attack Trx',
      attack_time: 'Attack Time',
    },
  },
}
