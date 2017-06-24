import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Home from '@/components/Home'
import Login from '@/components/Login'
import OutMain from '@/components/OutMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        }
      ]
    },
     {
          path: '/login',
          name: 'Login',
          component: Login
        },
     {
          path: '/outMain',
          name: 'OutMain',
          component: OutMain
        }
  ]
})
