import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: login, meta: { isPublic: true } },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '/',name:"About", component: About }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  
  base:'/',
  routes
})

//进行拦截
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    console.log('need login')
    return next('/login')
  }
  next()
})

export default router
