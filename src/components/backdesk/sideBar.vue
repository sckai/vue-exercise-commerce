<template>
  <nav class="col-2 col-md-2 bg-light sidebar">
    <div class="sidebar-sticky">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>管理員</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item" @click="orderlistActive('products')">
          <router-link class="nav-link" 
          :class="{active: sidelistActive === 'products'}" 
          to="/dashboard/products">
          <font-awesome-icon :icon="['fa', 'store']"/>
          產品列表</router-link>
        </li>
        <li class="nav-item " @click="orderlistActive('orders')">
          <router-link class="nav-link" 
          :class="{active: sidelistActive === 'orders'}" 
          to="/dashboard/orders">
          <font-awesome-icon :icon="['fa', 'copy']"/>
          &nbsp;訂單列表</router-link>
        </li>
        <li class="nav-item" @click="orderlistActive('coupon')">
          <router-link class="nav-link" 
          :class="{active: sidelistActive === 'coupon'}" 
          to="/dashboard/coupon">
          <font-awesome-icon :icon="['fa', 'ticket-alt']"/>
          優惠卷</router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>訂單模擬功能</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
        
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item" @click="orderlistActive('simulationorder')">

          <router-link class="nav-link" to="/dashboard/simulationorder"
          :class="{active: sidelistActive === 'simulationorder'}" >
          <font-awesome-icon :icon="['fa', 'shopping-cart']"/>
          模擬訂單</router-link>
        </li>
      </ul>
    </div>
  </nav>
 
</template>

<script>
export default {
  data(){
    return{
      sidelistActive: '',
    }
  },
  methods:{
    orderlistActive(list){
      const vm = this;
      vm.sidelistActive = list;
    }
  },
  created(){
    const vm = this;
    vm.sidelistActive = this.$route.name;
  }
}
</script>

