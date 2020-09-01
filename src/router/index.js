import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

// import nestedRouter from './modules/nested'

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
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
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
        meta: {title: '后台概览', icon: 'z_dashboard', affix: true}
      }
    ]
  },

  {
    path: '/catch',
    component: Layout,
    // hidden:true,
    children: [
      {
        path: ':exam_id/:course_id',
        component: () => import('@/views/catch'),
        name: 'StudyCatch',
        hidden: true,
        meta: {title: '抓拍', noCache: true}
      }
    ]
  },
  {
    path: '/examination',
    component: Layout,
    // hidden:true,
    children: [
      {
        path: ':exam_id/:course_id/:exam_type',
        component: () => import('@/views/examination'),
        name: 'Examination',
        hidden: true,
        meta: {title: '考试详情', noCache: true}
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
        meta: {title: '个人信息', icon: 'z_account', noCache: true}
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  //学校
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
        component: () => import('@/views/admin/school/config'),
        name: 'config',
        meta: {
          title: '学校信息设置',
          roles: ['main_school', 'sub_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/admin/school/notice'),
        name: 'Notice',
        meta: {
          title: '推送信息管理',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'notice/:id',
        component: () => import('@/views/admin/school/edit'),
        name: 'edit',
        hidden: true,
        meta: {
          title: '编辑推送',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'notice/create',
        component: () => import('@/views/admin/school/create'),
        name: 'create',
        hidden: true,
        meta: {
          title: '新建通知',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  //学员
  {
    path: '/student',
    component: Layout,
    redirect: '/student/all',
    alwaysShow: true, // will always show the root menu
    name: 'Student',
    meta: {
      title: '学员管理',
      icon: 'z_student',
      roles: ['main_school', 'sub_school'] // you can set roles in root nav
    },
    children: [
      {
        path: 'all',
        component: () => import('@/views/admin/student/all'),
        name: 'All',
        meta: {
          title: '所有学员',
          roles: ['main_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'tag',
        component: () => import('@/views/admin/student/tag'),
        name: 'tag',
        meta: {
          title: '查看考期',
          roles: ['main_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'allSubStudents',
        component: () => import('@/views/subadmin/student/all'),
        name: 'All',
        meta: {
          title: '所有学员',
          roles: ['sub_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'tagSubStudents',
        component: () => import('@/views/subadmin/student/tag'),
        name: 'tag',
        meta: {
          title: '查看考期',
          roles: ['sub_school'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  //督学
  {
    path: '/admins/supervise',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/admin/supervise/index'),
      name: 'Supervise',
      meta: {title: '网校督学', icon: 'z_zoom', roles: ['main_school', 'sub_school']}
    }]
  },
  //学校课程管理
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
        path: 'MainCourseInfo',
        component: () => import('@/views/admin/course/info'),
        name: 'MainCourseInfo',
        meta: {
          title: '课程信息',
          roles: ['main_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'MainCourseChosen',
        component: () => import('@/views/admin/course/chosen'),
        name: 'MainCourseChosen',
        meta: {
          title: '上架课程管理',
          // if do not set roles, means: this page does not require permission
          roles: ['main_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'MainCourseSale',
        component: () => import('@/views/admin/course/sale'),
        name: 'MainCourseSale',
        meta: {
          title: '课程销量',
          // if do not set roles, means: this page does not require permission
          roles: ['main_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'SubCourseInfo',
        component: () => import('@/views/subadmin/course/SubCourseInfo'),
        name: 'SubCourseInfo',
        meta: {
          title: '课程信息',
          roles: ['sub_school'] // or you can only set roles in sub nav
        }
      },
      // {
      //   path: 'SubCourseChosen',
      //   component: () => import('@/views/subadmin/course/subChosen'),
      //   name: 'SubCourseChosen',
      //   meta: {
      //     title: '上架课程管理',
      //     // if do not set roles, means: this page does not require permission
      //     roles: ['sub_school'] // or you can only set roles in sub nav
      //   }
      // },
      {
        path: 'SubCourseSale',
        component: () => import('@/views/subadmin/course/subSale'),
        name: 'SubCourseSale',
        meta: {
          title: '课程销量',
          // if do not set roles, means: this page does not require permission
          roles: ['sub_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'courseCatalog/:course_id',
        component: () => import('@/views/common/courseCatalog'),
        hidden: true,
        name: 'CatalogDetail',
        meta: {
          title: '查看目录',
          roles: ['main_school', 'sub_school']
        }
      }
    ]
  },

  {
    path: '/ipconfig',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/admin/ipconfig'),
      name: 'IpConfig',
      meta: {title: 'IP管理', icon: 'z_ip', roles: ['main_school', 'sub_school']}
    }]
  },
  {
    path: '/settingCenter',
    component: Layout,
    redirect: '/settingCenter/detail',
    alwaysShow: true, // will always show the root menu
    name: 'Setting',
    meta: {
      title: '设置',
      icon: 'z_settings',
      roles: ['main_school', 'sub_school']
    },
    children: [
      {
        path: 'detail',
        component: () => import('@/views/admin/setting/adminManage'),
        name: 'Detail',
        meta: {
          title: '管理员管理',
          roles: ['main_school'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'lookup',
        component: () => import('@/views/admin/setting/lookup'),
        name: 'Lookup',
        meta: {
          title: '查看密码',
          roles: ['main_school', 'sub_school']
          // if do not set roles, means: this page does not require permission
        }
      }
      ,
    ]
  },


  //系统管理员

  {
    path: '/allSchool',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/system/allschool'),
        name: 'AllSchool',
        meta: {title: '学校管理', icon: 'z_school', roles: ['system']}
      }
    ]
  },
  {
    path: '/supervise',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/system/supervise/index'),
      name: 'Supervise',
      meta: {title: '系统督学', icon: 'z_zoom', roles: ['system']}
    }]
  },
  {
    path: '/courseCenter',
    component: Layout,
    redirect: '/courseCenter/manage',
    alwaysShow: true, // will always show the root menu
    name: 'CourseCenter',
    meta: {
      title: '课程中心',
      icon: 'z_book_center',
      roles: ['system'] // you can set roles in root nav
    },
    children: [
      {
        path: 'manage',
        component: () => import('@/views/system/courseCenter/manage'),
        name: 'Manage',
        meta: {
          title: '课程仓库',
          roles: ['system'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'sales',
        component: () => import('@/views/system/courseCenter/salesManage'),
        name: 'SalesManage',
        meta: {
          title: '销量',
          roles: ['system'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'courseCatalog/:course_id',
        component: () => import('@/views/system/courseCenter/courseCatalog'),
        hidden: true,
        name: 'SetCatalog',
        meta: {
          title: '设置目录',
          roles: ['system']
        }
      }
    ]
  },

  {
    path: '/examCenter',
    component: Layout,
    redirect: '/examCenter/testRepo',
    alwaysShow: true, // will always show the root menu
    name: 'ExamCenter',
    meta: {
      title: '试卷中心',
      icon: 'z_test',
      roles: ['system'] // you can set roles in root nav
    },
    children: [
      {
        path: 'examRepo',
        component: () => import('@/views/system/examCenter/examRepo'),
        name: 'ExamRepo',
        meta: {
          title: '试卷库',
          roles: ['system'] // or you can only set roles in sub nav
        }
      }, {
        path: 'examRepo/:examination_id',
        component: () => import('@/views/system/examCenter/examInfo'),
        hidden: true,
        name: 'ExamInfo',
        meta: {
          title: '考卷详细',
          roles: ['system']
        }
      }
    ]
  },
  {
    path: '/tagCenter',
    component: Layout,
    redirect: '/tagCenter/tag_manage',
    alwaysShow: true, // will always show the root menu
    name: 'tagCenter',
    meta: {
      title: '考期中心',
      icon: 'z_tag',
      roles: ['system'] // you can set roles in root nav
    },
    children: [
      {
        path: 'tags',
        component: () => import('@/views/system/tagCenter/allTags'),
        name: 'Tags',
        meta: {
          title: '考期管理',
          roles: ['system']
        }
      },
      {
        path: 'tag_info',
        component: () => import('@/views/system/tagCenter/tagInfo'),
        name: 'TagInfo',
        meta: {
          title: '当前学员',
          roles: ['system'] // or you can only set roles in sub nav
        }
      },
    ]
  },
  {
    path: '/settingCenter',
    component: Layout,
    redirect: '/settingCenter/detail',
    alwaysShow: true, // will always show the root menu
    name: 'SettingCenter',
    meta: {
      title: '设置中心',
      icon: 'z_settings',
      roles: ['system']
    },
    children: [
      {
        path: 'detailCenter',
        component: () => import('@/views/system/settingCenter/adminManage'),
        name: 'AdminManage',
        meta: {
          title: '管理员管理',
          roles: ['system'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'lookup',
        component: () => import('@/views/system/settingCenter/lookup'),
        name: 'Lookup',
        meta: {
          title: '查看密码',
          roles: ['system']
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
