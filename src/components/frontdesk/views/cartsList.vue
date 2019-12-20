<template>
    <div>
        <loading :active.sync="loadStatus.pageLoading"></loading>
        <div class="container">
            <div class="row my-2 ">
                <div class="col-md-8" >
                    <div class="row justify-content-center">
                        <table class="table mt-5">
                            <thead>
                                <tr>
                                    <th width="120" class="text-center">刪除</th>
                                    <th width="120" class="text-center">圖片</th>
                                    <th class="text-center">品名</th>
                                    <th width="120" class="text-center">數量</th>
                                    <th width="120" class="text-center">單價</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in carts" :key="item.id">
                                    <td class="text-center" @click.prevent="deleteCart(item.id)">
                                        <!-- <a href="#"><i class="fas fa-trash-alt text-danger"></i></a> -->
                                        <a href="#"><font-awesome-icon class="text-danger" :icon="['fa', 'trash-alt']"/></a>
                                    </td>
                                    <td><img class="img-fluid" :src="item.product.imageUrl" alt=""></td>
                                    <td class="text-center">
                                        {{item.product.title}}
                                        <div class="text-success" v-if="item.coupon">
                                            已套用優惠卷
                                        </div>
                                    </td>
                                    <td class="text-center">{{item.qty}}</td>
                                    <td class="text-right">{{item.final_total | currency}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-md-4 my-5 d-flex justify-content-center">
                    <div class="card " style="width: 18rem;">
                        <div class="card-head bg-secondary">
                            <h5 class="card-title ml-4 mt-2 text-white">訂單摘要</h5>
                        </div>
                        <div class="card-body ">
                            <div class="d-flex justify-content-between align-items-baseline">
                                <div class="h5">商品總計</div>
                                <div class="h5" v-if="cartsTotal.final_total === cartsTotal.total"><span class="text-danger">{{cartsTotal.total | currency}}</span> 元</div>
                                <del class="h5" v-else><span class="text-danger">{{cartsTotal.total | currency}}</span> 元</del>
                            </div>
                            <div class="input-group mb-3 input-group-sm my-4">
                                <input type="text" class="form-control" placeholder="請輸入優惠"  v-model="counop_code">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-success" type="button" @click="addCounopCode">
                                        套用優惠碼
                                    </button>
                                </div>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <div class="h5" v-if="cartsTotal.final_total === cartsTotal.total">結帳總金額</div>
                                <div class="h5" v-else>折扣價金額</div>
                                <div class="h5"><span class="text-danger">{{cartsTotal.final_total | currency}}</span> 元</div>
                            </div>
                            <div class="text-right mt-2">
                                <button class="btn btn-danger" @click="toOrderPage">前往結帳</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import $ from 'jquery';
export default {
    data(){
        return{
            carts: [
                {
                    product: {},
                },
            ],
            cartsTotal: {},
            counop_code: '',
            loadStatus:{
                pageLoading: false,
            },
            coupons: [],
        }
    },
    methods:{
        getCarts(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/cart`;
            vm.loadStatus.pageLoading = true;
            this.$http.get(api).then((response) => {
                if(response.data.success){
                    vm.carts = response.data.data.carts;
                    vm.cartsTotal = response.data.data;
                }else{
                    console.log('錯誤提示');
                }
                vm.loadStatus.pageLoading = false;
            });     
        },
        addCounopCode(){
            const vm = this;
            vm.counop_code = vm.counop_code.split(" ").join("");;
            const finditem = vm.coupons.find(function(item){
                return vm.counop_code === item.coupon && item.is_enabled === 1;
            })
            let counop = {
                data:{
                    code: vm.counop_code,
                }
            }
            if(vm.carts.length !== 0){
                if(finditem !== undefined){
                    const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/coupon`;
                    this.$http.post(api, { data: counop }).then((response) => {
                        console.log(response.data);
                        if(response.data.success){
                            vm.getCarts();
                            this.$bus.$emit('messsage:push', `已套用優惠卷:${vm.counop_code}` , 'success');
                        }else{
                            this.$bus.$emit('messsage:push', response.data.message , 'danger');
                        }
                    })
                }else{
                    this.$bus.$emit('messsage:push', '優惠碼無效' , 'danger');   
                }
            }else{
                this.$bus.$emit('messsage:push', '購物車沒有商品' , 'danger');   
            }

            
        },
        deleteCart(id){
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            this.$http.delete(api).then((response) => {
                if(response.data.success){
                    vm.getCarts();
                    $('#deletProductModal').modal('hide');
                    vm.$bus.$emit('getCartsEvent');
                    this.$bus.$emit('messsage:push', response.data.message , 'success');
                } else{
                    this.$bus.$emit('messsage:push', response.data.message , 'danger');
                }
            })
        },
       toOrderPage(){  
           const vm = this;     
            if(vm.carts.length !== 0){
                this.$router.push(`/client_orders_check`);
            }else{
                this.$bus.$emit('messsage:push', '目前購物車沒有商品' , 'info');
            }
        },
        getCoupon(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/coupons`;
            this.$http.get(api).then((response) => {
                if(response.data.success){
                    vm.coupons = response.data.coupons;
                }
            });   
        },
    },
    mounted() {
        const vm = this;
        this.getCarts();
        this.getCoupon();
        vm.$bus.$on('getCartsEvent', target => {
            vm.getCarts();
        });
    },
}
</script>