import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import dashboard from '@/components/backdesk/dashboard'
import login from '@/components/backdesk/login'
import products from '@/components/backdesk/views/products'
import orders from '@/components/backdesk/views/orders'
import coupon from '@/components/backdesk/views/coupon'
import simulationorder from '@/components/backdesk/views/simulationorder'
import customerCheckout from '@/components/backdesk/views/customerCheckout'

import fronend from '@/components/frontdesk/fronend'
import home from '@/components/frontdesk/views/home'
import productsList from '@/components/frontdesk/views/productsList'
import cartsList from '@/components/frontdesk/views/cartsList'
import clientOrdersCheck from '@/components/frontdesk/views/clientOrdersCheck'

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
