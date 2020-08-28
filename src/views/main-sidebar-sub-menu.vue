<!-- <template id="menuZero">
  <div>
    <p v-for='(item,index) in urlArr' class="title_class" @click='addurl(index)' >
      <router-link :to='item.url' class="left_title" :style="{'color':tabIndex == index ? '#35a6fd !important':''}">{{item.title}}</router-link>
    </p>
  </div>
</template> -->
<template id="menuZero">
  <!-- <el-submenu
    v-if="menu.list && menu.list.length >= 1"
    :index="menu.menuId + ''"
    :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'"
  >
    <template slot="title">
      <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg>
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="item in menu.list"
      :key="item.menuId"
      :menu="item"
      :dynamicMenuRoutes="dynamicMenuRoutes"
    ></sub-menu>
  </el-submenu> -->
  <el-submenu  class="treeList_class"
    v-if="menu.list && menu.list.length >= 1"
    :index="menu.menuId + ''"
    :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'"
  >
    <template slot="title">
      <!-- <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg> -->
      <span>{{ menu.name }}</span>
    </template>
    <sub-menu
      v-for="(item,index) in menu.list"
      :key="item.menuId"
      :menu="item"
      :dynamicMenuRoutes="dynamicMenuRoutes"
      @click="setBackgrount(index)"
      :style="{background : index == tabIndex ? '#e6f7ff !important' : ''}"
    ></sub-menu>
  </el-submenu>


  <el-menu-item v-else    @click="gotoRouteHandle(menu)" :index="''+ menu.menuId">
    <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg>
    <span>{{ menu.name }}  </span>
  </el-menu-item>
</template>
<script>
import SubMenu from "./main-sidebar-sub-menu";
export default {
  name: "sub-menu",
  props: {
    menu: {
      type: Object,
      required: true
    },
    dynamicMenuRoutes: {
      type: Array,
      required: true
    },
    // keyCustom: {
    //   type: String,
    //   required: true
    // }
  },
  data(){
    return {
      tabIndex:-1,
      // urlArr:[
      //       {
      //         title:"工时管理",
      //         url:"/time-attendance"
      //     },{
      //         title:"考勤管理",
      //         url:"/work-attendance"
      //     },
      // ]
    }
  },
  components: {
    SubMenu
  },
  computed: {
    sidebarLayoutSkin: {
      get() {
        return this.$store.state.common.sidebarLayoutSkin;
      }
    }
  },
  methods: {
    setBackgrount(index){
      this.tabIndex = index
    },
    addurl(index){
      this.tabIndex = index
    },
    // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
    gotoRouteHandle(menu) {
      // var route = this.dynamicMenuRoutes.filter(
      //   item => item.meta.menuId === menu.menuId
      // );
    
        this.$router.push({ name: menu.url.substring(1) });
      
    }
  },
  mounted() {
  }
};
</script>

<style>
aside .el-menu-item {
  padding: 0 !important;
}
#menuZero .title_class {
  line-height: 40px;
}

 .left_title{
  text-decoration: none !important;
  line-height: 30px !important;
  font-size: 14px !important;
  color: #3F3F3F !important;
}
</style>

