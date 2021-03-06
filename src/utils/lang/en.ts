/*
 * @en.ts.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/15)
 */
export default {
  searchT: 'Search',
  reTry: 'RETRY',
  emptyData: 'No data available',
  noRisk: 'No risk transactions detected',
  success: 'Success',
  maxUpload: 'Maximum file upload limit is 100MB',
  failed: 'Failed',
  add: 'Add',
  edit: 'Edit',
  delete: 'Delete',
  search: 'Query',
  operation: 'Operation',
  pleaseInput: 'Please input ',
  formatError: 'Format error',
  upload: 'Upload',
  searchBtn: 'Search',
  loss: 'loss',
  profit: 'profit',
  signUp: 'Sign Up',
  contact: 'Contact',
  request: {
    title: 'Request a Quote',
  },
  feedback: {
    title: 'Feedback',
    formTitle: 'Title',
    formContent: 'Content',
    formContractP:
      'If you have any questions about the information we present, or find any errors, please contact us and we will correct them in time.',
  },

  requestAudit: {
    tipProject: 'Please select Project',
    tipEmail: 'Please enter the email address',
    tipErrEmail: 'Invalid email address',
    tipVerCode: 'Please enter the verification code',
    project1: 'Smart contract audit',
    project2: 'Blockchain platform audit',
    project3: 'VaaS',
    project4: 'EagleEye',
    project5: 'Trace',
    title: 'Reqeust a Quote',
    projectName: 'PROJECT NAME',
    yourName: 'YOUR NAME',
    email: 'YOUR EMAIL ADDRESS',
    message: 'MESSAGE',
    verify: 'VERIFICATION CODE',
  },
  header: {
    logout: 'Logout',
  },

  loginConfig: {
    titleLogin: 'Login',
    titleRegister: 'Registration',
    confirmLogout: 'Confirm logout ?',
    register: 'Register',
    rember: 'Forgot password',
    forget: 'Forgot password ?',
    login: 'Login',
    loginNameP: 'Please enter your email address',
    loginNameP3: 'Please enter your username or email',
    loginPwdP: 'Please enter your password',
    loginVerCodeP: 'Please enter the verification code',
    loginVerCodeP2: 'verification code',
    loginPwdValid: 'Please enter login password',
    phoneNumErr: '6-12 letters + numbers combination, support special characters',
    email: 'Please enter your email address',
    getVerCodeValid: 'Get verification code',
    emailErr: 'Email address error',
    newPassword: 'Please enter a new password',
    confirmPassword: 'Confirm new password',
    confirmReset: 'Confirm the reset',
    passwordAgreement: 'The two passwords entered are inconsistent',
    resetPasswordSuccess: 'Reset password successfully',
    registerSuccess: 'Register successfully',
    send: 'send',
  },
  subNav: {
    navName2: 'Risk Transactions',
    navName3: 'Project Management',
    navName5: 'Project Explorer',
    navName6: 'News',
    navName7: 'Address Monitor',
    navName8: 'Trx Retry',
    navName9: 'Operational Statistics',
    navName10: 'Malicious Website',
    navName11: 'Security Incident',
  },

  systemConfig: {
    delete: 'Whether to delete ',
  },
  riskConfig: {
    searchP: 'Trx Hash / Address',

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
      txHash: 'Transaction Hash',
      level: 'Alert Level',
      warningType: 'Type',
      txTime: 'Date',
      from: 'From',
      to: 'To',
    },
    profitTableHeader: {
      addr: 'Address',
      tokenName: 'Coin & Token',
      tokenNum: 'Value',
    },
    description: 'Description',
    profit: 'Address Income',
    transactions: 'Transaction Details',
    PrivilegedOperation: 'PrivilegedOperation',
    slump: 'Slump',
    presentPrice: 'Present Price',
  },

  projectExplorer: {
    base: {
      title: 'Security Monitor',
      title2: 'Web3',
      subTitle: 'Security Assessment, Risk Transactions Identification, and Security Sentiment',
      item1: 'Total Market Cap',
      item2: 'Project',
      item3: 'Chains',
    },
    alert: {
      title: 'Risk Alerts',
      title2: 'Hot Projects',
      plugin: 'Identification of Malicious Websites',
      install: 'Install the extension',
      quesTitle2: 'Not Audited by Beosin?',
      quesTitle3: 'Join the community to discuss.',
      quoteBtn: 'Request a Quote',
      more: 'Learn More',
    },
    exp: {
      addTitle: 'New Projects Added',
      title: 'Project Explorer',
      tableHeader: {
        project_name: 'Project',
        security_score: 'Score',
        tx_24: 'Tx/24h',
        market_cap: 'Market Cap',
        token_price: 'Token Price',
        create_time: 'Added on',
        platform: 'Chain',
      },
    },
    security: {
      title: 'Security News',
    },
    detail: {
      riskTrx: 'Risk Tx',
      audit: 'Audit',
      source: 'source',
      descr1: '??? Price UTC 00:00.',
      descr2:
        '??? Users is measured by the number of token addresses. It represents the number of address who hold this token.',
      descr3:
        '??? Activity is measured by the number of on-chain token transactions. It represents whether the project is active recently.',
      descr4:
        '??? The total circulation market value of a cryptocurrency. It is analogous to the free-float capitalization in the stock market.',
      descr5: '??? Market Cap = Current Price x Supply.',
      descr6: '??? Change is for the past 24 hours.',
      descr7: 'Proportion of excluded black hole addresses,contract address,exchange address',
      tokenPrice: 'Token Price',
      tokenPrice1: 'Token price for the past 30 days',
      user: 'Users (Total)',
      activity: 'Activity (24h)',
      MarketCap: 'Market Cap',
      MarketCapDiluted: 'Fully Diluted Market Cap',
      twitterAnalysis: 'Twitter Analysis',
      twitterAnalysis1: 'Following for the past 30 days',
      follow: 'Following',
      total: '(Total)',
      titleDecent: 'Decentralization',
      titleDecentSub: 'Whale holders and privileges.',
      titleMarket: 'Market Volatility',
      titleMarketSub: 'Price and transaction status.',
      titleRisk: 'Risk Transactions',
      titleRiskSub: 'On-chain performance and social performance.',
      titleInfo: 'Project News',
      titleSecurity: 'Securtity Event',
      titleRelated: 'Related Project',
      titleGovern: 'Transparency & Governance',
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
      riskChartTitle: 'Risk Type Distribution',
      scoreItem1: 'Audit',
      scoreItemDesc1: 'The project audit status and results.',
      scoreItem2: 'Decentralization',
      scoreItemDesc2: 'Token distribution and privileges.',
      scoreItem3: 'Market Volatility',
      scoreItemDesc3: 'Token price and transaction volatilities.',
      scoreItem4: 'Transaparency & Governance',
      scoreItemDesc4: 'Project information disclosure and manner of project governing.',
      scoreItem5: 'Risk Transactions',
      scoreItemDesc5: 'On-chain abnormal transactions.',
      scoreItemDisc: 'Security Score the past 30 days',
      scoreL: '30day Low',
      scoreH: '30day High',
      securityScore: 'Security Score',
      noAudit: 'Not have a audit report?',
      whaleTitle: 'Whale Holders',
      whaleTitle1: 'Token holders Distribution',
      whaleTitle2: 'TOP 10 Token Holders',
      whaleTitle3: 'Privileges',
      whaleTitle4: 'Liquidity Pairs Holders',
      whaleTab1: 'Token',
      whaleTab2: 'Liquidity',
      whalePie1: '0-10 Holders proportion',
      whalePie2: '11-50 Holders proportion',
      whalePie3: '51-100 Holders proportion',
      owner: 'Project Owner?',
      join: 'Join EagleEye.',
      enableEagleEye: 'Enable EagleEye Now',
      tableHeader1: {
        address: 'Address',
        proportion: 'Proportion',
        amount: 'Amount',
      },
      tableHeader2: {
        contract: 'Contract',
        function: 'Function',
        holdAddress: 'Hold address',
        txHash: 'Tx Hash',
        age: 'Age',
      },
      tableHeader3: {
        liquidityPair: 'Liquidity Pair',
      },
    },
  },
  createProject: {
    top: 'Sticky on top',
    createProjectTitle: 'Create',
    editProjectTitle: 'Edit Project',
    createProjectName: 'Project Name',
    createProjectNameInput: 'e.g. PancakeSwap',
    createProjectCancel: 'Cancel',
    createProjectConfirm: 'Confirm',
    notFound: 'Project not found',
    createOne: 'Create one',
    selectContractClass: 'Please select',
    verCeSemicolonReg: 'Input is illegal, do not start with semicolon',
    searchP: 'Project name / Contract ',
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
    boardExchange: 'On Board Of Exchange',
    testChain: 'On Test Chain',
    tableHeader: {
      projectName: 'Project Name',
      shortName: 'Short Name',
      contractNum: 'Contract',
      auditNum: 'Audit',
      createTime: 'Create Time',
      operation: 'Operation',
    },
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
    result: 'You have submitted???please check later on the Risk Tx page.',
  },
  riskPublicInfo: {
    searchP: 'Key Words',
  },
  addrMonitor: {
    create: 'Add the monitor',
    title: 'Address Monitor',
    login: 'Log in ',
    loginTo: 'to view your address monitor list.',
    tableHeader: {
      addr: 'Address',
      remark: 'Remark',
      createTime: 'Create Time',
      operate: 'Operate',
      result: 'Result',
    },
    form: {
      labelAddr: 'Address',
      labelRemark: 'Remark',
      filter: 'Amount >',
    },
  },
  operationalStatistics: {
    title: 'Visits',
    titleDesc: 'Count the IP addresses accessing the system',
    lineTitle: '30 day data statistics',
    searchP: 'Enter the Ip Address',
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
      attackType: 'Type',
      amount: 'Amount Of Loss',
      link: 'Link',
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
