import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import dashboard from '@/components/backend/dashboard'
import login from '@/components/backend/login'
import products from '@/components/backend/views/products'
import orders from '@/components/backend/views/orders'
import coupon from '@/components/backend/views/coupon'
import simulationorder from '@/components/backend/views/simulationorder'
import customerCheckout from '@/components/backend/views/customerCheckout'

import fronend from '@/components/fronend/fronend'
import home from '@/components/fronend/views/home'
import productsList from '@/components/fronend/views/productsList'
import cartsList from '@/components/fronend/views/cartsList'
import clientOrdersCheck from '@/components/fronend/views/clientOrdersCheck'

Vue.use(Router)

export default new Router({
  routes: [
    {                       
      path: '*',         //其他路徑都導回login
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta:{ requiresAuth: true},
      children: [
        {
          path: 'products',
          name: 'products',
          component: products,
          meta:{ requiresAuth: true},
        },
        {
          path: 'orders',
          name: 'orders',
          component: orders,
          meta:{ requiresAuth: true},
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon,
          meta:{ requiresAuth: true}, 
        },
        { 
          path: 'simulationorder',
          name: 'simulationorder',
          component: simulationorder,
          meta:{ requiresAuth: true}, 
        },
        { 
          path: 'customer_checkout/:orderId',
          name: 'customerCheckout',
          component: customerCheckout,
          meta:{ requiresAuth: true}, 
        },
      ]
    },


    // 前台
    {                       
      path: '/',         
      redirect: '/home',
    },
    {
      path: '/',
      name: 'fronend',
      component: fronend,
      children: [
        { 
          path: 'home',
          name: 'home',
          component: home,
        },
        { 
          path: 'products_list',
          name: 'productsList',
          component: productsList,
        },
        { 
          path: 'carts_list',
          name: 'cartsList',
          component: cartsList,
        },
        { 
          path: 'client_orders_check',
          name: 'clientOrdersCheck',
          component: clientOrdersCheck,
        },
      ],
    }
  ]
})
