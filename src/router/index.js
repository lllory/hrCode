/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  // redirect: { name: 'theme' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    // { path: '/time-attendance', component: _import('modules/attendance/time-attendance'), name: 'time-attendance', meta: { title: '工时管理' } },

    { path: '/time-distribution', component: _import('modules/WorkTime/time-distribution'), name: 'time-distribution', meta: { title: '项目工时分配表' } },
    { path: '/time-paymentDetauls', component: _import('modules/WorkTime/time-paymentDetauls'), name: 'time-paymentDetauls', meta: { title: '缴费明细表' } },
    { path: '/time-insuranceData', component: _import('modules/WorkTime/time-insuranceData'), name: 'time-insuranceData', meta: { title: '保险数据' } },
    { path: '/time-fiveriskDistribution', component: _import('modules/WorkTime/time-fiveriskDistribution'), name: 'time-fiveriskDistribution', meta: { title: '五险一金工时分配表' } },
    { path: '/time-workerInsurance', component: _import('modules/WorkTime/time-workerInsurance'), name: 'time-workerInsurance', meta: { title: '职工保险' } },
    { path: '/time-monthReport', component: _import('modules/WorkTime/time-monthReport'), name: 'time-monthReport', meta: { title: '五险一金月报表' } },
    { path: '/time-wages', component: _import('modules/WorkTime/time-wages'), name: 'time-wages', meta: { title: '员工信息' } },
    { path: '/time-fivePayment', component: _import('modules/WorkTime/time-fivePayment'), name: 'time-fivePayment', meta: { title: '数据汇总' } },
    { path: '/time-dataTotal', component: _import('modules/WorkTime/time-dataTotal'), name: 'time-dataTotal', meta: { title: '五险一金缴费比例' } },

    { path: '/work-attendance', component: _import('modules/attendance/work-attendance'), name: 'work-attendance', meta: { title: '考勤管理' } },
    { path: '/department-manage', component: _import('modules/attendance/department-manage'), name: 'department-manage', meta: { title: '部门管理' } },
    { path: '/attendance-record', component: _import('modules/PunchColock/attendance-record'), name: 'attendance-record', meta: { title: '打卡记录' } },

    { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } }
    // { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
    // { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } }
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    let creator = Vue.cookie.get('creator')
    if (!token || !/\S/.test(token) || !creator || !/\S/.test(creator)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})
router.beforeEach((to, from, next) => {
  // 监听是否刷新页面，清空任务列表数据
  sessionStorage.removeItem('taskBasic')
  sessionStorage.removeItem('taskExe')
  sessionStorage.removeItem('template')
  sessionStorage.removeItem('taskTerminal')
  sessionStorage.removeItem('name')
  sessionStorage.removeItem('indexBox')
  sessionStorage.removeItem("taskExeSave");
  sessionStorage.removeItem("checkList");
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    }).then(({ data }) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      // console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) { }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    // console.log('\n')
    // console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    // console.log(mainRoutes.children)
    // console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
