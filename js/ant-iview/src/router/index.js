import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Home from '@/components/Home'
import Login from '@/components/Login'
import OutMain from '@/components/OutMain'
import Register from '@/components/Register'
import FoodKind from '@/components/FoodKind'
import Food from '@/components/Food'
import Order from '@/components/Order'
import FoodAdd from '@/components/FoodAdd'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '',
      name: 'Main',
      component: Main,
      
       beforeEnter: (to, from, next) => {
        let flag= sessionStorage.getItem("login");
        if(!flag || flag!=1){
          next({ path: '/login' });
        }else{
          next();
        }
      },
      
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
         {
          path: '/foodKind',
          name: 'FoodKind',
          component: FoodKind
        },
         {
          path: '/food',
          name: 'Food',
          component: Food
        },
         {
          path: '/order',
          name: 'Order',
          component: Order
        }
      ]
    },
     {
          path: '/outMain',
          name: 'OutMain',
          component: OutMain,
          children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        }, {
          path: '/register',
          name: 'Register',
          component: Register
        }, {
          path: '/foodAdd',
          name: 'FoodAdd',
          component: FoodAdd
        }
      ]
        }
  ]
})
