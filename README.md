### 目录结构
* node_modules  文件夹  项目依赖(对webpack进行了封装)
* public 文件夹

    1.favicon.ico  是 网站图标
    
    2.index.html  页面入口文件
* src 文件夹
    api  qpi请求配置
    
    assets  存放静态文件
    
    components 存放公用组件
    
    config  环境配置文件
    
    icons  图标库
    
    router  路由
    
    store  vuex
    
    utils  配置与公共方法
    
    views  页面
    
    App.vue 入口vue文件

    main.js  入口js

* .gitignore 指定文件无需提交到git上

*  balel.config.js 使用一些预设

* package.json 项目描述及依赖

* package-lock.json 版本管理使用的文件

* vue.config.js vue配置文件
* 

##初始化 

###npm install

##开发环境运行 

###npm run dev

##单元测试环境运行 

###npm run test

##开发环境打包

###npm run build:dev

##测试环境打包

###npm run build:stage

##预发布环境打包

###npm run build:pretest

###生产环境打包

###npm run build:prod

##生产环境 styleguide 文档

###npm run styleguide

##生产环境 styleguide 文档打包

###npm run styleguide:build



接口对接
交易编写
交互细节