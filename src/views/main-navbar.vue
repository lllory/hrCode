<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" >
        <a class="site-navbar__brand-lg" href="javascript:;">中移集成考勤管理</a>
        <!-- <a class="site-navbar__brand-mini" href="javascript:;">系统</a> -->
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <!-- <el-menu class="site-navbar__menu" mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu> -->
      <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="transparent" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item @click="findFirstNav(item.name, index, true)" v-for="(item,index) in menuList" :key="item.name"
          :index="index + ''">{{item.name}}
          <span :href="getLocal" target="_blank" ref='target' class="target" v-if='item.name == "APM监控"'
            @click='linkApm'>APM监控</span>
        </el-menu-item>
      </el-menu> -->
      <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img src="~@/assets/img/avatar.svg" :alt="userName">
              {{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from "./main-navbar-update-password";
  // import {Base64} from '../../utils/utils'//账号密码解密
  import {
    clearLoginInfo
  } from "@/utils";
  export default {
    data() {
      return {
        updatePassowrdVisible: false,
        activeIndex: "0",
        firstNav: [],
        tabIndex: "",
        watchStorage: "",
        localHref: window.location.hostname
      };
    },
    components: {
      UpdatePassword
    },
    watch: {

    },
    computed: {
      getLocal() {
        if (window.location.hostname.split(".")[3] == '106') {
          return 'http://112.35.69.43:10080/monitoring-web/index.html#/login'
        } else if (window.location.hostname.split(".")[3] == '105') {
          return 'http://112.35.59.154:4080/monitoring-web/index.html#/login'
        } else {
          return 'http://112.35.69.43:10080/monitoring-web/index.html#/login'
        }
      },
      navbarLayoutType: {
        get() {
          return this.$store.state.common.navbarLayoutType;
        }
      },
      sidebarFold: {
        get() {
          return this.$store.state.common.sidebarFold;
        },
        set(val) {
          this.$store.commit("common/updateSidebarFold", val);
        }
      },
      mainTabs: {
        get() {
          return this.$store.state.common.mainTabs;
        },
        set(val) {
          this.$store.commit("common/updateMainTabs", val);
        }
      },
      userName: {
        get() {
          return this.$store.state.user.name;
        }
      },
      menuList: {
        get() {
          return this.$store.state.common.menuList;
        },
        set(val) {
          this.$store.commit("common/updateMenuList", val);
        }
      },
      getIndex: {
        get() {
          return sessionStorage.getItem("tabIndex") || "0";
        }
      }
    },
    methods: {
      linkApm() {
        // this.$jsonp(this.$http.adornUapmUrl('/system/loginAct!login'), {
        // //this.$jsonp(this.$http.adornApmUrl('/system/loginAct!login'), {
        //             callbackQuery: "callback",
        //             callbackName: "jsonpcallback",
        //             "icUser.loginName": this.$cookie.get('creator'),
        //             "icUser.pwd": this.$md5('Admin_20@18'),
        //           }).then(res => {
        //           })
        //           .catch(error => {
        //             console.log(error)
        //           })
        this.$http({
          url: this.$http.adornApmUrl("/sys/login"),
          method: "post",
          data: this.$http.adornData({
            'username': this.$cookie.get('creator'),
            'requestType': 'boce'
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.$cookie.set('qjtoken', data.token)
            this.$cookie.set('city', data.city)
            this.$cookie.set('county', data.county)
            this.$cookie.set('phone', data.phone)
            this.$cookie.set('province', data.province)
            this.$cookie.set('staffId', data.staffId)
            this.$cookie.set('staffName', data.staffName)


            setTimeout(function () {
              if (process.env.NODE_ENV == 'production' && window.location.hostname.split(".")[3] == '106') {
                let url =btoa(encodeURIComponent( `qttoken=${data.token}&&city=${data.city}&&county=${data.county}&&province=${data.province}&&staffId=${data.staffId}&&staffName=${data.staffName}&&phone=${data.phone}`))
                window.open('https://112.35.115.106:1441/monitoring-web/#/home?'+url,'_blank')

                // window.open('https://112.35.115.106:1441/monitoring-web/#/home', '_blank')
              } else if (window.location.hostname == 'localhost') {
                // window.open('http://127.0.0.1:8003/#/home', '_blank')
                let url =btoa(encodeURIComponent( `qttoken=${data.token}&&city=${data.city}&&county=${data.county}&&province=${data.province}&&staffId=${data.staffId}&&staffName=${data.staffName}&&phone=${data.phone}`))
                window.open(`http://127.0.0.1:8003/#/home?`+url, '_blank')
              } else {
                // window.open('https://112.35.115.106:1441/monitoring-web/#/home', '_blank')
                let url =btoa(encodeURIComponent( `qttoken=${data.token}&&city=${data.city}&&county=${data.county}&&province=${data.province}&&staffId=${data.staffId}&&staffName=${data.staffName}&&phone=${data.phone}`))
                window.open('https://112.35.115.106:1441/monitoring-web/#/home?'+url,'_blank')
              }
            }, 100)

          }
        });

        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', this.$http.adornApmUrl("/sys/login"));
        // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        // xhr.withCredentials = true;
        // let obj = {
        //   username: this.$cookie.get("creator"),
        //   requestType: "boce"
        // }
        // xhr.send(JSON.stringify(obj));
        // xhr.onreadystatechange = function () {
        //   if (xhr.readyState == 4 && xhr.status == 200) {
        //     if (JSON.parse(xhr.responseText) && JSON.parse(xhr.responseText).code === 0) {
        //       if (process.env.NODE_ENV == 'production' && window.location.hostname.split(".")[3] == '106') {
        //         window.open('https://112.35.115.106:1441/monitoring-web/#/home?objData=' + JSON.stringify(JSON.parse(
        //           xhr.responseText)), '_blank')
        //       } else {
        //         window.open('http://127.0.0.1:8001/#/home?objData=' + JSON.stringify(JSON.parse(xhr.responseText)),
        //           '_blank')
        //       }
        //     }
        //   }
        // }

      },
      // 修改密码
      updatePasswordHandle() {
        this.updatePassowrdVisible = true;
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init();
        });
      },
      // 退出
      logoutHandle() {
        this.$confirm(`确定进行[退出]操作?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            type: "warning"
          })
          .then(() => {
            this.$http({
              url: this.$http.adornUrl("/sys/logout"),
              method: "post",
              data: this.$http.adornData()
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                clearLoginInfo();
                this.$router.push({
                  name: "login"
                });
              }
            });
          })
          .catch(() => {});
      },
      findFirstNav(item, index, isTrue) {
        // console.log(window.location.hostname)
        // sessionStorage.removeItem("watchStorage");
        if (isTrue) {
          if (
            this.$store.state.common.menuList[index].list &&
            this.$store.state.common.menuList[index].list.length !== 0
          ) {
            let route = this.$store.state.common.menuList[index].list[0].url;
            let routeUrl = route.replace("/", "-");
            this.$router.push({
              path: routeUrl
            });
          } else {
            this.$router.push({
              path: "/"
            });
          }
        }
        this.tabIndex = index;
        this.activeIndex = "" + index;
        sessionStorage.setItem("tabIndex", this.tabIndex);
        sessionStorage.setItem("tabIndexName", item);
        this.$store.commit("common/updateTabIndex", this.tabIndex);
        // console.log(this.tabIndex,this.getIndex,'hhhhhhhhh')
        this.$store.commit("common/findFirstNavTitle", item);
        this.sidebarFold = false;
        // if (item === '首页' || item === '数据展示') {
        //   this.sidebarFold = true;
        // } else {
        //   this.sidebarFold = false;
        // }
      },
      handleSelect(key, keyPath) {}
    },
    mounted() {
      let tabIndex = sessionStorage.getItem("tabIndex") || 0;
      this.findFirstNav(sessionStorage.getItem("tabIndexName") || sessionStorage.getItem('menuNmae') || '首页', tabIndex,
        false);
    },
    created() {
      window.addEventListener("setItem", () => {
        let watchStorage = sessionStorage.getItem("watchStorage");
        if (watchStorage) {
          this.$store.state.common.menuList.forEach((ele, index) => {
            if (ele.name === "统计报表") {
              this.findFirstNav("统计报表", index, true);
              sessionStorage.removeItem("watchStorage");
              // this.sidebarFold = false;
              // this.activeIndex = '' + index;
              // sessionStorage.setItem("tabIndex", index);
              // console.log(this.activeIndex, 'this.activeIndex...')
            }
          });
        }
      });
    }
  };
</script>

<style scoped>
  .el-menu-demo {
    float: left;
  }

  .el-menu--horizontal>.el-menu-item,
  .site-navbar,
  .el-menu--horizontal {
    height: 50px;
    line-height: 50px;
    border: 0 !important;
  }

  .el-menu-item:hover,
  .el-menu-demo .is-active {
    color: #ffffff !important;
    background: #2384ea !important;
    border: 0 !important;
  }

  /* .el-menu--horizontal .el-menu-item:not(.is-isabled):hover {
    background-color: #2384ea !important;
  } */
  svg:not(:root) {
    color: #ffffff;
  }

  .site-navbar__menu .el-menu-item:not(.is-disabled):focus {
    background-color: #0090fc !important;
  }

  .target {
    position: absolute;
    left: 20px;
    text-decoration: none;
    z-index: 999;
    color: rgba;
    color: rgba(12, 12, 12, 0);
  }
</style>