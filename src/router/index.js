import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Article from '@/views/article/index.vue'
import Publish from '@/views/publish/index.vue'
import Image from '@/views/image/index.vue'
import Comment from '@/views/comment/index.vue'
import Settings from '@/views/settings/index.vue'
import Fans from '@/views/fans/index.vue'
import LayOut from '@/views/layout/index.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: LayOut,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fans
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫（拦截器）的作用就是控制页面的访问状态
// 功能：实现非登录页面都需要有登录认证，否则跳转到首页
// next:放行方法
router.beforeEach(function (to, from, next) {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path === '/login') {
    // 登录页面
    next()
  } else {
    // 非登录页面
    // console.log(user)
    if (user) {
      // 有登录认证
      next()
    } else {
      // 没有登录认证 跳转到登录页面
      next('/login')
    }
  }
  next()
})

export default router
