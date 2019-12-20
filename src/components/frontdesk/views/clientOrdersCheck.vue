<template>
<div>
    <loading :active.sync="loadStatus.pageLoading"></loading>
    <div class="container mt-5">
        <h2 class="text-center text-secondary mb-2">血拚結帳</h2>
        <div class="form-row">
            <div class="col">
                <div  role="alert" :class="['alert alert-secondary rounded-pill text-center',{'alert-success': orderStatus === 'step1' }]">
                    1.輸入訂單資料
                </div>
            </div>
            <div class="col">
                <div role="alert" :class="['alert alert-secondary rounded-pill text-center',{'alert-success': orderStatus === 'step2' }]">
                    2.金流付款
                </div>
            </div>
            <div class="col">
                <div role="alert" :class="['alert alert-secondary rounded-pill text-center',{'alert-success': orderStatus === 'step3' }]">
                    3.完成
                </div>
            </div>
        </div>
    </div>

    <div class="container mb-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="accordion mb-4" id="accordionExample" v-if="orderStatus === 'step1'">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                        <!-- <h2 class="mb-0 "> -->
                            <button class="btn btn-link d-flex" style="position:relative; text-decoration: none;" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                顯示購物車細節                    
                            </button>
                        <!-- </h2> -->
                        </div>
                    
                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="text-center" scope="col">商品名稱</th>
                                        <th class="text-center" scope="col" width="120">圖片</th>
                                        <th class="text-center" scope="col" width="120">數量</th>
                                        <th class="text-center" scope="col" width="120">小計</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="align-items-center" v-for="item in carts" :key="item.id">
                                        <td class="align-middle text-center">{{item.product.title}}</td>
                                        <td class="align-middle">
                                            <img class="img-fluid" :src="item.product.imageUrl" alt="" width="90" height="60">
                                            </td>
                                        <td class="align-middle">{{item.qty}}{{item.product.unit}}</td>
                                        <td class="align-middle text-right">{{item.final_total | currency}}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td class="text-right" colspan="3">運費</td>
                                        <td class="text-right">$60</td>
                                    </tr>
                                    <tr>
                                        <td class="text-right" colspan="3">合計</td>
                                        <td class="text-right">{{cartsTotal.final_total | currency}}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div> 
                
                <form  @submit.prevent="createOrder" v-if="orderStatus === 'step1'">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <div class="form-group">
                                <label for="username">收件人姓名</label>
                                <input type="text"  name="name" id="username"
                                    placeholder="輸入姓名" 
                                    v-validate="'required'"
                                    v-model="form.user.name"
                                    :class="['form-control',{'is-invalid': errors.has('name')}]">
                                <span class="text-danger" v-if="errors.has('name')">
                                    姓名必須輸入
                                </span>
                            </div>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="useremail">Email</label>
                            <input type="email"  name="email" id="useremail"
                                v-validate="'required|email'"
                                v-model="form.user.email"
                                placeholder="請輸入 Email" 
                                :class="['form-control',{'is-invalid': errors.has('email')}]">
                            <span class="text-danger" v-if="errors.has('email')">
                                {{errors.first('email')}}
                            </span>
                        </div>
                    </div>
                
                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" name="tel" id="usertel"  
                        placeholder="請輸入電話"
                        v-validate="'required'"
                        v-model="form.user.tel"
                        :class="['form-control',{'is-invalid': errors.has('tel')}]">
                        <span class="text-danger" v-if="errors.has('tel')">
                            電話必須輸入
                        </span>
                    </div>
                
                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="text" name="address" id="useraddress" 
                            placeholder="請輸入地址"
                            v-validate="'required'"
                            v-model="form.user.address"
                            :class="['form-control',{'is-invalid': errors.has('address')}]">
                        <span class="text-danger" v-if="errors.has('address')">
                            地址欄位不得留空
                        </span>
                    </div>
                
                    <div class="form-group">
                        <label for="comment">留言</label>
                        <textarea name="" id="comment" class="form-control" cols="30" rows="10" ></textarea>
                    </div>
                    <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                    </div>
                </form>


                
                <div class="my-5 row justify-content-center" v-if="orderStatus === 'step2' || orderStatus === 'step3'">
                    <form class="col-md-8">
                        <table class="table">
                        <thead>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.products" :key="item.id">
                            <td class="align-middle">{{ item.product.title }}</td>
                            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                            <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            <td colspan="2" class="text-right">總計</td>
                            <td class="text-right">{{ order.total | currency }}</td>
                            </tr>
                        </tfoot>
                        </table>

                        <table class="table">
                        <tbody>
                            <tr>
                                <th width="100">Email</th>
                                <td>{{ user.email }}</td>
                            </tr>
                            <tr>
                                <th>姓名</th>
                                <td>{{ user.name }}</td>
                            </tr>
                            <tr>
                                <th>收件人電話</th>
                                <td>{{ user.tel }}</td>
                            </tr>
                            <tr>
                                <th>收件人地址</th>
                                <td>{{ user.address }}</td>
                            </tr>
                            <tr>
                                <th>付款狀態</th>
                            <td>
                                <span v-if="!order.is_paid">尚未付款</span>
                                <span v-else class="text-success">付款完成</span>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <div class="text-right" v-if="order.is_paid === false">
                            <button class="btn btn-danger" @click.prevent="payOrder">確認付款去</button>
                        </div>
                    </form>
                </div>

                
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            carts: [
                {
                    product: {},
                },
            ],
            cartsTotal: {},
            form: {
                user:{},
            },
            orderStatus: 'step1',
            orderId: '',
            order: {},
            user:{},
            loadStatus:{
                pageLoading: false,
            },
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
                    vm.loadStatus.pageLoading = false;
                }else{
                    vm.loadStatus.pageLoading = false;
                }
            });     
        },
        getOrder(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/order/${vm.orderId}`;
            this.$http.get(api).then((response) => {
                vm.order = response.data.order;
                vm.user =  response.data.order.user;
            })
        },
        createOrder(){
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/order`;
            const vm = this;
            vm.loadStatus.pageLoading = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.$http.post(api, {data: vm.form}).then((response) => {
                        if(response.data.success){
                            vm.orderId = response.data.orderId;
                            vm.$bus.$emit('getCartsEvent');
                            vm.orderStatus = 'step2';
                            vm.loadStatus.pageLoading = false;
                        }
                    })
                }else{
                    vm.loadStatus.pageLoading = false;
                }
            });
        },
        payOrder(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            vm.loadStatus.pageLoading = true;
            this.$http.post(api).then((response) => {
                vm.getOrder();
                vm.orderStatus = 'step3';
                vm.loadStatus.pageLoading = false;
            })
        },
    },
    mounted(){
        this.getCarts();
    },

    watch:{
        orderId(){
            this.getOrder();
        }
    }
}
</script>