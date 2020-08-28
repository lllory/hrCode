<!-- <template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="$route.path"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu"
        v-if="!sidebarFold"
        router
      >
       
        <sub-menu
          v-for="menu in menuList"
          :index="'/'+menu.url.replace('/','-')"
          :keyCustom="'/'+menu.url.replace('/','-')"
          :key="'/'+menu.url.replace('/','-')"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes"
        ></sub-menu>
      </el-menu>
    </div>
  </aside>
</template> -->

<template>
    <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
      <div class="site-sidebar__inner">
        <el-menu :default-active="menuActiveName || 'home'" :collapse="sidebarFold" :collapseTransition="false"  
           class="site-sidebar__menu" :unique-opened='true' v-if="!sidebarFold">
        <!--   <sub-menu v-for="menu in menuList"  :key="menu.menuId" :menu="menu" :index='menuActiveName' :dynamicMenuRoutes="dynamicMenuRoutes"
        >
          </sub-menu> -->
            <sub-menu v-for="menu in urlArr"   :key="menu.menuId"  :index='menu.menuId'  :menu="menu"  :dynamicMenuRoutes="dynamicMenuRoutes"
        >
          </sub-menu>
        </el-menu>
      </div>
    </aside>
  </template>

<script>
import SubMenu from "./main-sidebar-sub-menu";
import { isURL } from "@/utils/validate";
export default {
  data() {
    return {
      dynamicMenuRoutes: [],
      secondNavList: [],
      urlArr:[
            {
              name:"工时管理",
              menuId:0,
              list:[
              {
                url:"/time-distribution",
                name:'项目工时分配表',
                menuId:193
              },
              {
                url:"/time-paymentDetauls",
                name:'缴费明细',
                menuId:194
              },
              {
                url:"/time-insuranceData",
                name:'保险数据',
                menuId:195
              },
              {
                url:"/time-fiveriskDistribution",
                name:'五险一金工时分配表',
                menuId:196
              },
              {
                url:"/time-workerInsurance",
                name:'职工保险',
                menuId:197
              },
              {
                url:"/time-monthReport",
                name:'五险一金月报表',
                menuId:198
              },
              {
                url:"/time-wages",
                name:'员工信息',
                menuId:199
              },
               {
                name:'五险一金缴费比例',
                url:"/time-fivePayment",
                menuId:200
              },
              {
                name:'数据汇总',
                url:"/time-dataTotal",
                menuId:201
              }
              ]
          },{
              name:"考勤管理",
               menuId:1,
               list:[
                {
                  name:'考勤管理',
                  url:'/work-attendance',
                  menuId:202
                  },
                  {
                  name:'部门管理',
                  url:'/department-manage',
                  menuId:203
                  }
               ]
          },
          {
              name:"打卡记录",
              url:"/attendance-record",
               menuId:204
          },
         
      ]
    };
  },
  components: {
    SubMenu
  },
  computed: {
    sidebarLayoutSkin: {
      get() {
        return this.$store.state.common.sidebarLayoutSkin;
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
    menuList: {
      get() {
        let secondNav = this.$store.state.common.menuList;
        let data = [];
        this.secondNavList = secondNav;
        let tabIndex = sessionStorage.getItem("tabIndex") || 0;
        let menuData = this.$store.state.common.menuList[tabIndex].name;
        let clickName = this.$store.state.common.FirstNavTitle || menuData;
        secondNav.filter(item => {
          if (item.name === clickName) {
            data = item.list;
          }
        });
        let watchStorage = sessionStorage.getItem("watchStorage");
        if (watchStorage) {
          this.secondNavList.forEach((ele, index) => {
            if (ele.name === "统计报表") {
              data = ele.list;
            }
          });
        }
        return data;
      },
      set(val) {
        this.$store.commit("common/updateMenuList", val);
      }
    },
    menuActiveName: {
      get() {
        return this.$store.state.common.menuActiveName;
      },
      set(val) {
        this.$store.commit("common/updateMenuActiveName", val);
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
    mainTabsActiveName: {
      get() {
        return this.$store.state.common.mainTabsActiveName;
      },
      set(val) {
        this.$store.commit("common/updateMainTabsActiveName", val);
      }
    }
  },
  watch: {
    $route: "routeHandle"
  },
  created() {
    this.menuList = JSON.parse(sessionStorage.getItem("menuList") || "[]");
    this.dynamicMenuRoutes = JSON.parse(
      sessionStorage.getItem("dynamicMenuRoutes") || "[]"
    );
    this.routeHandle(this.$route);
    if (
      this.$route.name === "index-index" ||
      this.$route.name === "demonstration-demonstration"
    ) {
      this.$store.commit("common/updateSidebarFold", false);
    }
    // window.addEventListener("setItem", () => {
    //   let watchStorage = sessionStorage.getItem("watchStorage");
    //   if (watchStorage) {
    //     this.routeHandle(this.$route);
    //   }
    // });
  },
  methods: {
    // 路由操作
    routeHandle(route) {
      if (route.meta.isTab) {
        // tab选中, 不存在先添加
        var tab = this.mainTabs.filter(item => item.name === route.name)[0];
        if (!tab) {
          if (route.meta.isDynamic) {
            route = this.dynamicMenuRoutes.filter(
              item => item.name === route.name
            )[0];
            if (!route) {
              return console.error("未能找到可用标签页!");
            }
          }
          tab = {
            menuId: route.meta.menuId || route.name,
            name: route.name,
            title: route.meta.title,
            type: isURL(route.meta.iframeUrl) ? "iframe" : "module",
            iframeUrl: route.meta.iframeUrl || ""
          };
          this.mainTabs = this.mainTabs.concat(tab);
        }
        this.menuActiveName = tab.menuId + "";
        // this.menuActiveName2 = tab.menuId + ''
        this.mainTabsActiveName = tab.name;
        sessionStorage.setItem("mainTabsActiveName", this.menuActiveName);
      }
    }
  }
};
</script>

<style>
/* .site-sidebar__menu .el-menu-item:nth-child(1){
  color: #1890ff !important;
  background: #e6f7ff;
} */
</style>
