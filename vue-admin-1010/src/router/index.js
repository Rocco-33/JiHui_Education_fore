import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: 'Teacher',
    meta: { title: '讲师管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '讲师列表', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Save',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '添加讲师', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '编辑讲师', noCache: true },
        hidden: true // 导航区隐藏该路由
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: 'Subject',
    meta: { title: '课程分类管理', icon: 'nested' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '课程分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Save',
        component: () => import('@/views/edu/subject/save'),
        meta: { title: '添加课程分类', icon: 'tree' }
      },
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Course',
    meta: { title: '课程管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/edu/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '添加课程', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: 'Banner',
    meta: { title: '轮播图管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/cms/banner/list'),
        meta: { title: '轮播图列表', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Save',
        component: () => import('@/views/cms/banner/save'),
        meta: { title: '添加轮播图', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'Edit',
        component: () => import('@/views/cms/banner/save'),
        meta: { title: '编辑轮播图', noCache: true },
        hidden: true // 导航区隐藏该路由
      }
    ]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/create',
    name: 'Statistics',
    meta: { title: '统计数据管理', icon: 'example' },
    children: [
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/statistics/create'),
        meta: { title: '数据生成', icon: 'table' }
      },
      {
        path: 'show',
        name: 'Show',
        component: () => import('@/views/statistics/show'),
        meta: { title: '数据图表', icon: 'tree' }
      },
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
