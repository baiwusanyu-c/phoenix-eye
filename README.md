<p align="center">
  <img width="144px" src="https://lianantech.com/commonImg/mail/hermit-logo.png" />
</p>

#eagle-eye-front 态势感知 ##主要技術依賴  
**Vue3.2 + Vue-router4 + Vite2.x + typeScript4.5**

| 名称         | 版本           | 説明                                                                               |
| ------------ | -------------- | ---------------------------------------------------------------------------------- |
| Vue          | ^3.2.3         | 前端開發框架                                                                       |
| axios        | ^0.24.0        | Ajax 封裝庫                                                                        |
| vite         | ^2.2.3         | 工程化開發打包框架                                                                 |
| vue-router   | 4              | vue3.x 路由 注意，vue-router4.x 路由配置 name 不可以重复，否则会导致打包后路由混乱 |
| vue-i18n     | ^9.2.0-beta.23 | vue3.x 國際化插件                                                                  |
| @vueuse/core | ^7.3.0         | vue3.x 的 composition Api 方法庫                                                   |
| animate.css  | ^4.1.1         | 動畫庫                                                                             |
| windi.css    | ^3.4.3         | css 原子化樣式庫                                                                   |
| element-plus | ^2.22.0        | UI 組件庫                                                                          |
| be-ui        | -              | 内部 UI 組件庫                                                                     |

##package 指令

`"serve:dev": "vite --host --mode development",`  
**以開發環境後臺運行項目**

`"serve:stage": "vite --host --mode staging",`  
**以測試環境後臺運行項目**

`"serve:pretest": "vite --host --mode pretest",`  
**以預發佈環境後臺運行項目**

`"serve:prod": "vite --host --mode production",`  
**以正式發佈環境後臺運行項目**

`"build:dev": "vite build --mode development",`  
**以開發環境後臺打包項目**

`"build:stage": "vite build --mode staging",`  
**以測試環境後臺打包項目**

`"build:prod": "vite build --mode production",`  
**以預發佈環境後臺打包項目**

`"build:pretest": "vite build --mode pretest",`  
**以正式發佈環境後臺打包項目**

`"lint:style": "stylelint src/**/*.{html,vue,css}",`  
**styleLint 校驗**

`"lint:style-fix": "stylelint --fix src/**/*.{html,vue,css}"`  
**styleLint 樣式代碼修復**

`"lint:ts": "eslint ./src --ext .vue,.js,.ts,.jsx,.tsx",`
**esLint 代碼校验**

`"lint:ts-fix": "eslint --fix ./src --ext .vue,.js,.ts,.jsx,.tsx",`
**esLint 代碼校验修復**

`"prettier:fix": "prettier --write ."`,
**prettier 格式修復**

`"prepare": "husky install",`
**husky 初始化**

`"commit": "eslint --fix ./src --ext .vue,.js,.ts,.jsx,.tsx && prettier --write .&& stylelint --fix src/**/*.{html,vue,css}"`
**基于 husky 和 commitlint/cli 的 git commit 钩子指令，提交时会调用该指令进行**

`"preview": "vite preview --port 8080 --host"`
**打包预览，当年你打包后使用该指令 vite 会自动开启一个容器来运行 dist 打包结果**

## 目錄結構

- node_modules 項目依賴
- public 公共文件
- src
  api Api 封裝

  assets 存放静态文件

  components 存放公用组件

  config 环境配置枚舉，包含後臺幾口，第三方鏈接

  router 路由

  utils 配置与公共方法

  views 页面

  App.vue 入口 vue 文件

  main.ts 入口 ts

- .gitignore 指定文件无需提交到 git 上

- package.json 项目描述及依赖

- package-lock.json 版本管理使用的文件

- vite.config.ts vite 配置文件

### 配置 hasky 与 commitlint

- npm install -save-dev @commitlint/cli @commitlint/config-conventional
- 新建文件 commitlint.config.js，内容：module.exports = {extends: ['@commitlint/config-conventional']}
- npm install husky --save-dev
- npm set-script prepare "husky install"
- npm run prepare
- npx husky add .husky/pre-commit "npm run commit"
- git add .husky/pre-commit
- npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
- 在 package.json 的 script 里面配置"commit": "这里面添加 eslint、单测、stylelint 等"
- 提交时执行命令例如 git commit -am "feat: 项目添加 commitlint 本地校验配置" 或 git commit -m "feat: 项目添加 commitlint 本地校验配置"

### 火狐浏览器兼容汇总

- 登录页需要兼容 √
- 产品页与 about us 过长 （偶现）

### Safari 浏览器兼容汇总

- 登录页需要兼容 √
- contact us 组件 1080p （下显示正常）√
- home-swiper 1080p （下显示正常）√
- product 模块 头部 1080p （下显示正常）√
- about us 的三栏 1080p （下显示正常）√
