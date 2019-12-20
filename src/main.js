// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// import '@fortawesome/fontawesome-free/css/all.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faShoppingCart, faPlaneDeparture, faPlane, faSpinner, faTrashAlt, faSignOutAlt, faStore, faCopy, faTicketAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css'
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import 'animate.css';


import App from './App'
import router from './router'
import  './bus'
import currency from './router/filter/currency';


Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW',zhTWValidate);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.component('Loading', Loading);   //全域載入此套件
Vue.filter('currency', currency);

axios.defaults.withCredentials = true; //加入這段後端傳來的session自動會存在web cookies裡

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//驗證方法(在index.js設定那邊設定)meta:{ requiresAuth: true}開啟驗證
router.beforeEach((to, from, next) => {
  // console.log('to',  to, 'from' , from , 'next', next);
  if(to.meta.requiresAuth){
    // console.log('這裡需要驗證');
    // const vm = this;
      const api = `${process.env.API_PATH}/api/user/check`;
      axios.post(api).then((response) => {
        if(response.data.success){
          next();
          //vm.$router.push('/');   //use router change page
        }else{
          next({
            path: '/login',
          })
        }
    });
  }else{
    next();
  }
  
})
