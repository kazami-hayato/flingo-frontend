import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
    roles: ['admin','sub_school']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/dashboard'),
        name: 'Dashboard',
        meta: {title: '后台概览', icon: 'z_home', affix: true}
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: {title: 'Profile', icon: 'z_account', noCache: true}
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/school',
    component: Layout,
    redirect: '/school/config',
    alwaysShow: true, // will always show the root menu
    name: 'School',
    meta: {
      title: '学校配置',
      icon: 'z_school',
      roles: ['main_school', 'sub_school'] // you can set roles in root nav
    },
    children: [
      {
        path: 'config',
        component: () => import('@/views/school/config'),
        name: 'config',
        meta: {
          title: '学校信息设置',
          roles: ['main_school', 'sub_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/school/notice'),
        name: 'Notice',
        meta: {
          title: '推送信息管理',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      },
    ]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/student/all',
    alwaysShow: true, // will always show the root menu
    name: 'Student',
    meta: {
      title: '学员管理',
      icon: 'people',
      roles: ['main_school', 'sub_school'] // you can set roles in root nav
    },
    children: [
      {
        path: 'all',
        component: () => import('@/views/student/all'),
        name: 'All',
        meta: {
          title: '所有学员',
          roles: ['main_school', 'sub_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'groups',
        component: () => import('@/views/student/group'),
        name: 'Group',
        meta: {
          title: '学员分组',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'study',
        component: () => import('@/views/student/study'),
        name: 'Study',
        meta: {
          title: '学习情况',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: ':exam_id(\\d+)',
        component: () => import('@/views/student/subscribe'),
        name: 'Subscribe',
        hidden: true,
        meta: {
          title: '开课详情',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'statistics/:exam_id(\\d+)',
        component: () => import('@/views/student/statistics'),
        name: 'statistics',
        hidden: true,
        meta: {
          title: '课程学习统计',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      },
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/info',
    alwaysShow: true, // will always show the root menu
    name: 'Course',
    meta: {
      title: '课程管理',
      icon: 'z_course',
      roles: ['main_school', 'sub_school'] // you can set roles in root nav
    },
    children: [
      {
        path: 'info',
        component: () => import('@/views/course/info'),
        name: 'Info',
        meta: {
          title: '课程信息',
          roles: ['main_school', 'sub_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'arrange',
        component: () => import('@/views/course/arrange'),
        name: 'Arrange',
        meta: {
          title: '课程安排',
          roles: ['main_school', 'sub_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'sale',
        component: () => import('@/views/course/sale'),
        name: 'Sale',
        meta: {
          title: '课程销量',
          // if do not set roles, means: this page does not require permission
          roles: ['main_school', 'sub_school'] // or you can only set roles in sub nav
        }
      }
      ,
    ]
  },
  {
    path: '/courseManage',
    component: Layout,
    redirect: '/courseManage/manage',
    alwaysShow: true, // will always show the root menu
    name: 'CourseManage',
    meta: {
      title: '课程中心',
      icon: 'z_book_center',
      roles: ['system'] // you can set roles in root nav
    },
    children: [
      {
        path: 'manage',
        component: () => import('@/views/courseManage/manage'),
        name: 'Manage',
        meta: {
          title: '课程信息',
          roles: ['system'] // or you can only set roles in sub nav
        }
      },
    ]
  },
  {
    path: '/exam',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/exam'),
      name: 'Exam',
      meta: {title: '题库管理', icon: 'z_exam', roles: ['system']}
    }]
  },
  {
    path: '/material',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/material'),
      name: 'Material',
      meta: {title: '教材管理', icon: 'z_handout', roles: ['system']}
    }]
  },
  {
    path: '/score',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/score'),
      name: 'Score',
      meta: {title: '成绩管理', icon: 'z_score', roles: ['system', 'main_school', 'sub_school']}
    }]
  },
  {
    path: '/ipconfig',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/ipconfig'),
      name: 'IpConfig',
      meta: {title: 'IP管理', icon: 'z_ip', roles: ['system', 'main_school', 'sub_school']}
    }]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/detail',
    alwaysShow: true, // will always show the root menu
    name: 'Setting',
    meta: {
      title: '设置',
      icon: 'z_settings',
      roles: ['system', 'main_school', 'sub_school']
    },
    children: [
      {
        path: 'detail',
        component: () => import('@/views/setting/detail'),
        name: 'Detail',
        meta: {
          title: '管理员管理',
          roles: ['system', 'main_school', 'sub_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'lookup',
        component: () => import('@/views/setting/lookup'),
        name: 'Lookup',
        meta: {
          title: '查看密码',
          roles: ['system', 'main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      }
      ,
    ]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
