<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="mr-auto ml-3">
                <font-awesome-icon class="mr-2" :icon="['fa', 'plane-departure']" style="color:#ffc107" />
                <router-link class="text-white" to="/home" style="text-decoration: none;">漫步旅遊</router-link>
            </div>
            <button class="navbar-toggler custom-toggler"  type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon "></span>
            </button>

            <div class="collapse navbar-collapse mr-2" id="navbarSupportedContent">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item active">
                        <router-link to="/home" class="nav-link text-white" href="#">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/products_list" class="nav-link text-white" href="#">商品列表</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/carts_list" class="nav-link text-white" href="#">購物清單</router-link>
                    </li>
                </ul>


                <div class="mr-3">
                    <div class="dropdown">
                        <button class="btn btn-sm btn-cart border-0" data-toggle="dropdown" data-flip="false"
                        @click="getCarts" @getCartsEvent="getCarts">
                            <font-awesome-icon class="text-white" :icon="['fa', 'shopping-cart']" size="2x"/>
                            <span class="badge badge-danger rounded-circle" >{{cartsNum}}</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right" style="min-width:300px;">
                            <div class="px-4 py-3">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th colspan="4"><h6>選擇商品</h6></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in Carts" :key="item.id">
                                            <td>{{item.product.title}}</td>
                                            <td>{{item.qty}}件</td>
                                            <td>${{item.total}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <router-link to="/carts_list">
                                    <button type="button" class="btn btn-primary btn-block">前往結帳</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    data(){
        return{
            Carts: [
                {
                    product: {},
                },
            ],
            tempCart:{
                product: {},
            },
            cartsNum: '0',
            
        }
    },
    methods:{
        getCarts(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/cart`;
            this.$http.get(api).then((response) => {
                if(response.data.success){
                    vm.Carts = response.data.data.carts;
                    vm.cartsNum = vm.Carts.length;
                }else{
                    console.log('錯誤提示');
                }
            });     
        },
    },
    mounted() {
        const vm = this;
        this.getCarts();
        vm.$bus.$on('getCartsEvent', target => {
            vm.getCarts();
        });
    },
}
</script>

<style scoped>
/* nav toggle style */
.title{
    text-decoration: none;
}

.custom-toggler .navbar-toggler:hover{
    border-color: rgb(255, 255, 255) !important;
}

.custom-toggler:hover{
    background-color: rgba(167, 156, 136, 0.1);
}

.custom-toggler:focus {
    outline: none !important;
}


.btn-cart{
    background-color: transparent;
    position: relative;
}

.btn-cart .badge{
    position: absolute;
    top: 0px;
    right: 0px;
}

.navbar-nav .nav-item a:hover{
    color: rgb(217, 221, 223) !important;
}

.fa-shopping-cart:hover {
    color: rgb(217, 221, 223) !important;
}
</style>