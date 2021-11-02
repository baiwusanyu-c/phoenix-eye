/*
* @tsgz-nav-menu.vue
* @deprecated 虚拟货币系统 - 左侧菜单导航
* @author czh
* @update (czh 2021/8/2)
*/
<template>
  <div class="tsgz-nav-menu" id="xnhb_nav_menu">
    <!--    展开时logo    -->
    <div>
      <div class="expend-logo"></div>
    </div>
    <!--    展开时項目名稱    -->
    <span class="tsgz-name" >成都链安态势感知管理平台</span>
    <!--    展开时菜单    -->
    <div class="tsgz-nav-menu-container" >
      <el-menu
          unique-opened
          ref="menuPart1"
          :default-active="active"
          class="el-menu-vertical-demo menu-part1">
        <div v-for="(value,key) in headerConfig" :key="key">
          <el-menu-item :index="value.index" v-if='value.show && value.children.length === 0'
                        :disabled="value.isDisabled"
                        @click="routerPush(value,value.isPush)">
            <svg-icon disabled-tool-tip :iconClass="value.icon" class-name="nav-menu-icon"></svg-icon>
            <span style="margin-left: 10px">{{ value.name }}</span>
          </el-menu-item>
          <el-submenu v-if='value.show && value.children.length > 0' :index="value.index"
                      :disabled="value.isDisabled">
            <template slot="title">
              <svg-icon disabled-tool-tip :iconClass="value.icon" class-name="nav-menu-icon"></svg-icon>
              <span style="margin-left: 10px">{{ value.name }}</span>
            </template>
            <div v-for="item in value.children" :key="item.key">
              <el-menu-item :index="item.index" @click.self="routerPush(item,value.isPush)">
                <span>{{ item.name }}</span>
              </el-menu-item>
            </div>
          </el-submenu>
        </div>
      </el-menu>
    </div>
    <!--退出弹窗-->
    <be-msg-dialog @confirm="confirm"
                   :isShow.sync="isLogout"
                   title="确认退出？">
    </be-msg-dialog>
  </div>

</template>

<script>
/**
 * 头部菜单导航
 */
// import {logout} from '@/api/login.js';
import config from '@/config/index'

export default {
  name: "XnhbNavMenu",
  data() {
    return {
      // 头部菜单配置
      headerConfig: {},
      //是否登出
      isLogout: false,
      // 项目后台配置
      config: config,
      // window 窗口实例
      window: window,
      // 当前激活菜单索引
      active:'0',
      isCollapse: false,
      foldKey: '',
    }
  },
  props: {
    /**
     * 列表状态，能够起到某些路由控制
     * @values ANALYSING ARCHIVED
     */
    listStatus: {
      type: String,
      default: 'ANALYSING'
    },
  },
  computed: {
    // 菜单样式 active 方法
    activeStyle() {
      return function (path, val) {
        if (path && this.$route.path.indexOf(path) > -1) {
          return 'active'
        }
        if (!val.isPush) {
          return 'disabled'
        }
        //针对有子菜单的做处理
        if (!path) {
          try {
            val.children.forEach(res => {
              if (this.$route.path.indexOf(res.path) > -1) {
                throw new Error('')
              }
            })
          } catch (e) {
            return 'active'
          }
        }
        return ''
      }
    },
    // 子菜单样式 on 方法
    onDropdownStyle() {
      return function (path) {
        if (path && this.$route.path.indexOf(path) > -1) {
          return 'el-dropdown-menu__item_on'
        }
        return ''
      }
    },
    onMenuFoldActive() {
      return function (key) {
        if (this.foldKey === key) {
          return 'menu-fold-item-active'
        }
        return ''
      }
    },
    menuDisableConfig() {
      return this.$store.state.menuDisable
    }
  },
  watch: {
    '$route.path':{
      deep: true,
      immediate: true,
      handler(nVal) {
        if (nVal) {
          this.$nextTick(()=>{
            this.setActiveNav()
          })
        }
      }
    },
    // 菜单禁用设置
    menuDisableConfig(nVal) {
      Object.keys(nVal).forEach(key => {
        if (this.headerConfig[key]) {
          this.headerConfig[key].isDisabled = nVal[key]
        }
      })
    },
    listStatus() {
      this.setHeaderConfig();
    }
  },
  mounted() {
    this.setHeaderConfig();
  },
  methods: {
    /**
     * 退出接口调用方法
     */
    confirm() {
      this.$router.push({path: "/login"}).catch(err => {
        console.error(err)
      });
      this.removeCookie('userInfo');
      this.removeCookie('token');
      window.sessionStorage.clear();
      window.localStorage.clear();
      this.$root.userInfo = {};
      this.$root.token = '';
      this.isLogout = false;

      /* logout().then(() => {
           this.$router.push({path: "/login"}).catch(err => {
               console.error(err)
           });
           this.removeCookie('userInfo');
           this.removeCookie('token');
           window.sessionStorage.clear();
           window.localStorage.clear();
           this.$root.userInfo = {};
           this.$root.token = '';
           this.isLogout = false;
       }).catch(error => {
           console.error(error)
           this.isConfirm = false;
       });*/
    },
    /**
     * 配置头部菜单方法
     * 这里根据权限、禁用等进行设置
     */
    setHeaderConfig() {
      this.initHeaderConfig()
      Object.keys(this.$store.state.menuDisable).forEach(key => {
        if (this.headerConfig[key]) {
          this.headerConfig[key].isDisabled = this.$store.state.menuDisable[key]
        }
      })
      Object.keys(this.headerConfig).forEach(val => {
        this.headerConfig[val].show = true
      })
      this.setActiveNav()
    },
    /**
     * 初始化菜单配置
     */
    initHeaderConfig() {
      this.headerConfig = {
        'FRAUD_BS': {
          icon: '-renwu',
          index: '0',
          name: this.$t('lang.navTextConfig.navName0'),
          show: false,
          path: '/blockchainSituation',
          isPush: true,
          children: [],
          isDisabled: false,
        },
        'FRAUD_PR': {
          icon: '-liulanqi',
          name: this.$t('lang.navTextConfig.navName1'),
          show: false,
          path: '/projectRanking',
          index: '1',
          isPush: true,
          children: [],
          isDisabled: false,

        },
        'FRAUD_WAR': {
          icon: '-tiaochaquzheng',
          index: '2',
          name: this.$t('lang.navTextConfig.navName2'),
          show: false,
          path: '/riskWarning',
          isPush: true,
          children: [],
          isDisabled: false,
        },
        'FRAUD_PM': {
          icon: '-jiaoyifenxi',
          index: '3',
          name: this.$t('lang.navTextConfig.navName3'),
          show: false,
          path: '/projectManagement',
          isPush: true,
          children: [],
          isDisabled: false,
        },
        'FRAUD_SC': {
          icon: '-xitongpeizhi',
          name:  this.$t('lang.navTextConfig.navName4'),
          show: false,
          index: '4',
          path: '/systemConfig',
          isPush: true,
          children: [],
          isDisabled: false,
        },
      }
    },
    /**
     * 路由跳转方法
     * @param {Object} router
     * @param {Boolean} isPush
     */
    routerPush(router, isPush) {
      if(router.path === '/logout'){
        this.loginOut()
        return;
      }
      if (!isPush || !router.path) {
        return
      }
      this.$router.push({path: router.path})
    },
    /**
     * 登出方法
     * @param {String} command - 登出指令类型
     */
    loginOut(command = 'logout') {
      // 退出登录
      if (command === 'logout') {
        this.isLogout = true;
      }
    },

    /**
     * 设置激活菜单
     * 某些场景下，需要根据当前路由高亮显示激活的菜单
     * 这里就是根据路由进行了匹配进行激活高亮
     */
    setActiveNav(){
      const _this = this
      const menuList = document.getElementsByClassName('el-menu-item')
      //menuList[2].focus()
      this.$nextTick(()=>{
        try {
          Object.keys(this.headerConfig).forEach(val => {

            if(_this.$route.path.indexOf(_this.headerConfig[val].path) > -1){
              _this.active = _this.headerConfig[val].index
              throw new Error('')
            }
            if(!_this.headerConfig[val].path){
              _this.headerConfig[val].children.forEach(res=>{
                if(_this.$route.path.indexOf(res.path) > -1){
                  _this.active = res.index
                  throw new Error('')
                }
              })
            }
          })
        }
        catch(e){
          // 激活元素设置聚焦 规避bug 3825
          this.$nextTick(()=>{
            for(let i = 0;i < menuList.length;i ++ ){
              if(menuList[i].className.indexOf('is-active') > -1){
                menuList[i].focus()
              }
            }
          })
          return
        }
      })
    },
  },
}
</script>

<style lang="scss">
.no-active {
  .el-menu-item.is-active{
    background-color:transparent !important;
    color: $textColor8 !important;
  }
  .el-menu-item.is-active:hover{
    background-color: $mainColor3 !important;
  }
}
.el-dropdown-menu__item_on {
  background-color: $mainColor10;
  color: $mainColor3;
}

.tsgz-nav-menu-container,
.tsgz-nav-menu-p2 {
  text-align: left;
  .nav-menu-icon{
    fill: $textColor8 !important;
  }

}

.tsgz-nav-menu-container {
  height: 76%;
  overflow-y: auto;
  overflow-x: hidden;
}
.tsgz-nav-menu-container-free {
  height: calc(68% - 16px);
}
.tsgz-nav-menu {

  height: 100%;
  background:  #0A5292 linear-gradient(180deg, #002E57 0%, #0A5292 100%);
  box-shadow: 2px 0 6px 0 rgba(0, 21, 41, 0.12);
  box-sizing: border-box;
  background-image: url("../../assets/image/pc/menu-textrue.png");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;
  .expend-logo{
    color: white !important;
    width: 168px !important;
    height: 94px !important;
    vertical-align: middle !important;
    margin:32px 20px 0 20px !important;
    font-size: 20px !important;
    background-image: url("../../assets/image/pc/logo-white.png");
    background-repeat: repeat;
    background-position-x: -38%;
    -webkit-clip-path:polygon(22% 0, 84% 0, 62% 100%, 29% 100%);
    clip-path: polygon(22% 0, 84% 0, 62% 100%, 29% 100%)
  }
  .logo-fold {
    color: white;
    width: 44px;
    height: 44px;
    vertical-align: middle;
    margin: 12px 6px;
    font-size: 35px;
  }

  .nav-menu-icon-fold {
    width: 32px;
    vertical-align: middle;
    margin: 0 auto;
    font-size: 30px;
    height: 60px;
    line-height: 50px;
    cursor: pointer;

    .svg-icon {
      width: .9em;
      height: .9em;
    }
  }

  .menu-disable {
    cursor: not-allowed;
  }

  .nav-menu-icon-fold-150 {
    width: 100%;
    vertical-align: middle;
    font-size: 30px;
    display: flex;
    margin: 0 auto;
    height: 60px;
    line-height: 50px;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    .svg-icon {
      width: .9em;
      height: .9em;
    }
  }

  .nav-menu-icon-last {
    margin-bottom: 0;
    margin-top: 0;
    height: 60px;
    line-height: 50px;
  }

  .nav-menu-icon {
    /*margin-right: 10px;*/
    fill: $textColor8 !important;
  }

  .tsgz-name {
    margin-top: 12px;
    margin-bottom: 25px;
    font-size: 14px;
    /* text-align: center; */
    height: 24px;
    display: inline-block;
    font-family: "PingFang Medium", sans-serif;
    color: $textColor6;
  }

  .el-menu {
    height: 70%;
    width: 100% !important;
    background-color: transparent;
    border-right: 0;

    .el-menu-item, .el-submenu__title {
      color: $textColor8;
      height: 40px;
      line-height: 40px;
      list-style: none;
      position: relative;
      white-space: nowrap;
      margin-bottom: 10px;
    }

    .el-submenu__title:hover,
    .el-menu-item:hover {
      background-color: $mainColor3;
    }

  }

  .menu-part1 {
    .el-menu-item.is-active,
    .el-menu-item:focus {
      background-color: $mainColor3;
      color: #ffffff;
      .nav-menu-icon{
        fill: #ffffff !important;
      }
    }
  }

  .menu-part2 {
    .el-menu-item.is-active {
      background-color: transparent;
      color: $textColor8;
    }
  }

  .tsgz-nav-menu-textrue {
    width: 100%;
    margin-top: 10px;
  }

  .tsgz-nav-menu-p2 {
    width: 208px;

  }

  .menu-container-fold {
    width: 60px;
    height: 84%;

    .menu-fold-item-active {
      background-color: $mainColor3;
    }
  }

  .menu-container-fold2 {
    width: 60px;
  }

  .menu-fold-item {
    &:hover {
      background-color: $mainColor3;
    }
  }
}
</style>

<!--1080p的105% - 125%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px)  {
  .tsgz-nav-menu {
    .expend-logo{
      width: 146px !important;
      margin:10px 10px 0 10px !important;

    }
    .tsgz-nav-menu-container {
      height: 73%;
    }

    .menu-container-fold {
      height: 78%;
    }

    .nav-menu-icon-fold {
      width: 24px;
      height: 45px;
      line-height: 38px;

      .svg-icon {
        width: 1.2em;
        height: 1.2em;
        font-size: 20px !important;
      }
    }
    .tsgz-nav-menu-p2{
      width: 178px;
    }
    .menu-container-fold2{
      width: 60px;
    }
    .nav-menu-icon-fold-150 {
      height: 45px;
      line-height: 38px;

      .svg-icon {
        width: 1.2em;
        height: 1.2em;
        font-size: 20px !important;
      }
    }
  }
}
</style>
<style lang="scss">
@media screen and (min-width: 1536px) and (max-height: 880px) and (max-width: 1830px)  {
  .tsgz-nav-menu .el-menu .el-menu-item{
    min-width: 160px;
  }
}
</style>
<!--1080p的130% - 140%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px)  {
  .tsgz-nav-menu {
    .expend-logo{
      width: 146px !important;
      margin:10px 10px 0 10px !important;

    }
    .tsgz-nav-menu-container {
      height: 72%;
    }

    .menu-container-fold {
      height: 78%;
    }

    .nav-menu-icon-fold {
      width: 24px;
      height: 45px;
      line-height: 38px;

      .svg-icon {
        width: 1.2em;
        height: 1.2em;
        font-size: 20px !important;
      }
    }
    .tsgz-nav-menu-p2{
      width: 178px;
    }
    .menu-container-fold2{
      width: 60px;
    }
    .nav-menu-icon-fold-150 {
      height: 45px;
      line-height: 38px;

      .svg-icon {
        width: 1.2em;
        height: 1.2em;
        font-size: 20px !important;
      }
    }
  }
}
</style>
<style lang="scss">
@media screen and (min-width: 1326px) and (max-height: 710px) and (max-width: 1478px)  {
  .tsgz-nav-menu .el-menu .el-menu-item, .tsgz-nav-menu .el-menu .el-submenu__title{
    height: 28px;
    line-height: 28px;
  }
  .tsgz-nav-menu .el-menu .el-menu-item{
    min-width: 160px;
  }

}
</style>
<!--1080p的145% - 150%放大-->
<style scoped lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px)  {
  .tsgz-nav-menu {
    .expend-logo{
      width: 146px !important;
      margin:10px 10px 0 10px !important;

    }
    .tsgz-nav-menu-container {
      height: 69%;
    }

    .menu-container-fold {
      height: 78%;
    }

    .nav-menu-icon-fold {
      width: 24px;
      height: 45px;
      line-height: 38px;

      .svg-icon {
        width: 1.2em;
        height: 1.2em;
        font-size: 20px !important;
      }
    }
    .tsgz-nav-menu-p2{
      width: 160px;
    }
    .menu-container-fold2{
      width: 60px;
    }
    .nav-menu-icon-fold-150 {
      height: 45px;
      line-height: 38px;

      .svg-icon {
        width: 1.2em;
        height: 1.2em;
        font-size: 20px !important;
      }
    }
  }

}
</style>
<style lang="scss">
@media screen and (min-width: 1280px) and (max-height: 638px) and (max-width: 1326px)  {
  .tsgz-nav-menu .el-menu .el-menu-item, .tsgz-nav-menu .el-menu .el-submenu__title{
    height: 28px;
    line-height: 28px;
  }
  .tsgz-nav-menu .el-menu .el-menu-item{
    min-width: 160px;
  }

}
</style>