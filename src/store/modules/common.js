import {update} from '../../mock/modules/sys-config'
export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: false,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: '',
    FirstNavTitle: '',
    tabIndex: '',
    menuActivePath: '',
    seriesLineData: [], // 数据展示中点击过程展示的数据
    seriesLineIndex: 0,
    seriesBarData: [],
    seriesData: {},
    singleStatus: false
  },
  mutations: {
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height
    },
    updateNavbarLayoutType (state, type) {
      state.navbarLayoutType = type
    },
    updateSidebarLayoutSkin (state, skin) {
      state.sidebarLayoutSkin = skin
    },
    updateSidebarFold (state, fold) {
      state.sidebarFold = fold
    },
    updateMenuList (state, list) {
      state.menuList = list
    },
    updateMenuActiveName(state, name) {
      state.menuActiveName = name
    },
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    },
    findFirstNavTitle (state, name) {
      state.FirstNavTitle = name
    },
    updateTabIndex(state, name) {
      state.tabIndex = name
    },
    updateseriesLineData(state, name) {
      state.seriesLineData = name
    },
    updateSeriesLineIndex(state, name) {
      state.seriesLineIndex = name
    },
    updateSeriesBarData(state, name) {
      state.seriesBarData = name
    },
    updateSeriesData(state, name) {
      state.seriesData = name
    },
    updateSingleStatus(state, name) {
      state.singleStatus = name
    }
  }
}
