<template>
    <div>
        <loading :active.sync="loadStatus.pageLoading"></loading>
        <div class="row mt-4">
            <div class="col-md-4 mb-4 list-group-item-action" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm h-100 list-group-item-action">
                    <div style="height: 150px; background-size: cover; background-position: center; "
                    :style="['',{backgroundImage: `url(${item.imageUrl})`}]">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{item.title}}</a>
                        </h5>
                        <p class="card-text">{{item.content}}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5">2,800 元</div> -->
                            <del class="h6">原價 {{item.origin_price | currency }} 元</del>
                            <div class="h5">現在只要 <span class="text-danger">{{item.price | currency }}</span> 元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button type="button" class="btn btn-outline-secondary btn-sm"
                        @click="getProduct(item.id)">
                            <font-awesome-icon v-if="ststus.more === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                            查看更多
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addcart(item.id)">
                            <font-awesome-icon v-if="ststus.addCart === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- page -->
        <pagination :pagination="pagination" @getPages="getProducts"></pagination>

        <hr>

        <div class="row justify-content-center">
            <div class="col-6">
                <table class="table mt-5">
                    <thead>
                        <tr>
                            <th class="text-center">刪除</th>
                            <th class="text-center">品名</th>
                            <th class="text-center">數量</th>
                            <th class="text-center">單價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in carts" :key="item.id">
                            <td class="text-center" @click.prevent="deleteModal(item)">
                                <a href="#"><font-awesome-icon class="text-danger" :icon="['fa', 'trash-alt']"/></a>
                            </td>
                            <td class="text-center">
                                {{item.product.title}}
                                <div class="text-success" v-if="item.coupon">
                                    已套用優惠卷
                                </div>
                            </td>
                            <td class="text-center">{{item.qty}}</td>
                            <td class="text-right">{{ Math.floor(item.final_total) | currency }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right">總計</td>
                            <td class="text-right">{{ cartsTotal.total | currency }}</td>
                        </tr>
                        <tr v-if="cartsTotal.total !== cartsTotal.final_total">
                            <td colspan="3" class="text-right text-success">折扣價</td>
                            <td class="text-right text-success">{{ cartsTotal.final_total | currency }}</td>
                        </tr>
                    </tfoot>
                </table>

                <div class="input-group mb-3 input-group-sm">
                    <input type="text" class="form-control" placeholder="請輸入優惠" v-model="counop_code">
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="button" @click="addCounopCode">
                            套用優惠碼
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-5 row justify-content-center">
            <form class="col-md-6" @submit.prevent="createOrder">
                <div class="form-group">
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
        </div>

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="productModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="productModal">
                        <span>{{product.title}}</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img class="img-fluid" :src="product.imageUrl">
                        <blockquote class="blockquote mt-3">
                            <p class="mb-0">{{product.content}}</p>
                            <footer class="blockquote-footer text-right">{{product.description}}</footer>
                        </blockquote>
                        <div class="flex justify-content-between align-items-beseline">
                            <div class="h5" v-if="!product.price">{{product.origin_price | currency }} 元</div>
                            <del class="h6" v-if="product.price">  原價 {{product.origin_price | currency }} 元  </del>
                            <div class="h5" v-if="product.price">現在只要 {{product.price | currency }}  元</div>
                        </div>
                        <select name="" class="form-control mt-3" v-model="product.number" @change="changeevent">
                            <option :selected="true" disabled value=''>請選擇</option>
                            <option :value="num" v-for="num in 10" :key="num">選購{{num}}{{product.unit}}</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{subTotal | currency }}</strong>
                        </div>
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="addcart(product.id, product.number)">加入購物車</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- deleteModal -->
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="delProductModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="delProductModal">
                    <span>刪除購物車商品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除購物車 <strong class="text-danger">{{tempCart.product.title}}</strong> 商品
                    <strong class="text-danger">{{tempCart.qty}}{{tempCart.product.unit}}</strong>(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger"
                    @click="deleteCart(tempCart.id)"
                    >確認刪除</button>
                </div>
                </div>
            </div>
        </div>      

    </div>
</template>

<script>
import $ from 'jquery';
import pagination from "@/components/Pagination";




export default {
    components:{
        pagination,
    },
    data() {
        return {
            products: [],
            product: {},
            subTotal: '',
            ststus:{
                more: '',
                addCart: '',
            },
            carts:[],
            tempCart:{
                product: {},
            },
            cartsTotal: '',
            counop_code: '',
            form: {
                user:{},
            },
            pagination:{},
            loadStatus:{
                pageLoading: false,
                // uploadLoading: false,
            },
            
            
        }
    },
    created() {
        this.getProducts();
        this.getcart();
    },
    methods: {
        getProducts(page = 1){
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/products?page=${page}`;
            const vm = this;
            vm.loadStatus.pageLoading = true;
            this.$http.get(api).then((response) => {
                vm.products = response.data.products;
                vm.pagination = response.data.pagination;
                vm.loadStatus.pageLoading = false;
            })
        },
        getProduct(id){
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/product/${id}`;
            const vm = this;
            // vm.ststus.loandItem = id;
             vm.ststus.more = id;
            this.$http.get(api).then((response) => {
                $('#productModal').modal('show');
                vm.product = response.data.product;
                //購物數量預設給1 ,並把單一個價格放入subTotal
                vm.product.number = Number(1);
                vm.subTotal = vm.product.price;
                vm.ststus.more = '';
            })
            console.log('number',typeof(vm.product.number), 'price',typeof(vm.product.price),'num',typeof(vm.product.num),);
        },
        addcart(id, qty = 1){
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            let cart = {
                product_id: id,
                qty: qty,
            };
            vm.ststus.addCart = id;
            this.$http.post(api, {data: cart}).then((response) => {
                if(response.data.success){
                    vm.ststus.loandItem = '';
                    vm.getcart();
                    $('#productModal').modal('hide');
                    vm.ststus.addCart = '';
                    this.$bus.$emit('messsage:push', response.data.message , 'success'); 
                }else{
                    this.$bus.$emit('messsage:push', response.data.message , 'danger'); 
                }
            })
        },
        getcart(){
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            this.$http.get(api).then((response) => {
                vm.cartsTotal = response.data.data;
                vm.carts = response.data.data.carts;
            })
        },
        deleteModal(item){
            const vm = this;
            vm.tempCart = item;
            $('#delProductModal').modal('show');
            
        },
        deleteCart(id){
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            this.$http.delete(api).then((response) => {
                if(response.data.success){
                    vm.getcart();
                    $('#delProductModal').modal('hide');
                    this.$bus.$emit('messsage:push', response.data.message , 'success'); 
                }else{
                    this.$bus.$emit('messsage:push', response.data.message , 'danger'); 
                }

            })
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
                            vm.getcart();
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

            // const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/coupon`;

            // this.$http.post(api, {data: vm.counop_code}).then((response) => {
            //     if(response.data.success){
            //         console.log(response.data);
            //         this.$bus.$emit('messsage:push', response.data.message , 'success'); 
            //         vm.getcart();
            //     }else{
            //         this.$bus.$emit('messsage:push', response.data.message , 'danger'); 
            //     }
            // })
        },
        createOrder(){
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/order`;
            const vm = this;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.$http.post(api, {data: vm.form}).then((response) => {
                        if(response.data.success){
                            vm.$router.push(`/dashboard/customer_checkout/${response.data.orderId}`);
                        }
                        vm.getcart();
                    })
                }else{
                    console.log('表單不完整');
                }
            });
        },
        changeevent(){
            const vm = this;
            vm.subTotal = Number(vm.product.number) * Number(vm.product.price);
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
        this.getCoupon();
    },
}
</script>