import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import {
  login
} from '@/api/user'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [{
      path: 'basic-info',
      name: 'BasicInfo',
      component: () => import('@/views/basic-info/index'),
      meta: {
        title: '基本信息配置',
        icon: 'dashboard',
        requireLogin: true
      }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/index',
    name: 'Example',
    meta: {
      title: '大屏数据配置',
      icon: 'el-icon-s-help',
      requireLogin: true
    },
    children: [{
        path: 'index',
        name: 'IndexConfig',
        component: () => import('@/views/index-config/index'),
        meta: {
          title: '首页配置',
          icon: 'table',
          requireLogin: true
        }
      },
      {
        path: 'ps-overview',
        name: 'PsOverview',
        component: () => import('@/views/ps-overview/index'),
        meta: {
          title: '产销总览配置',
          icon: 'nested',
          requireLogin: true
        }
      },
      {
        path: 'pl-messages',
        name: 'Table',
        component: () => import('@/views/pl-message/index'),
        meta: {
          title: '产线动态配置',
          icon: 'form',
          requireLogin: true
        }
      },
      {
        path: 'device-monitoring',
        name: 'Tree',
        component: () => import('@/views/device-monitoring/index'),
        meta: {
          title: '设备监控配置',
          icon: 'tree',
          requireLogin: true
        }
      },
      // {
      //   path: 'sql-config',
      //   name: 'SQLConfig',
      //   component: () => import('@/views/sql-config/index'),
      //   meta: {
      //     title: 'SQL配置',
      //     icon: 'el-icon-edit',
      //     requireLogin: true
      //   }
      // }
    ]
  },

  {
    path: '/personal',
    component: Layout,
    children: [{
      path: 'index',
      name: 'User',
      component: () => import('@/views/user/index'),
      meta: {
        title: '个人中心',
        icon: 'el-icon-user',
        requireLogin: true
      }
    }]
  },


  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  let loginInfo = sessionStorage.getItem("loginInfo")
  
  
  if (to.matched.some(info => info.meta.requireLogin)) {
    if (!loginInfo || loginInfo == "" || loginInfo == null) {
      next("/login")
    } else {
      next()
    }
  } else {
    next()
  }


})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
