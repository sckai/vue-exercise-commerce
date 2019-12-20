<template>
<div>
    <loading :active.sync="loadStatus.pageLoading"></loading>
    <div class="container">
        <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end bt-4" :style="{backgroundImage: 'url(' + jumbotronBg +')' }">
            <div class="container">
                <div class="bg-lighter p-4 text-xl">
                    <h2 class="display-4 font-weight-bold h1">愛，旅遊</h2>
                    <p class="lead">比起走了多少公里，一路上結交了多少朋友是衡量一趟旅行更好的方式.</p>  
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-2 ">
                    <div class="list-group sticky-top" id="myList" role="tablist">
                        <a class="list-group-item list-group-item-action active" data-toggle="list" href="#all" role="tab" 
                        @click="selectArea('all_i')">
                            <!-- <i class="all_i mr-2 fas fa-plane" v-if="Animate === 'all_i'"></i>全部 -->
                            <font-awesome-icon class="all_i mr-2" v-if="Animate === 'all_i'" :icon="['fa', 'plane']" style="color:#ffc107" />全部
                        </a>
                        <a class="list-group-item list-group-item-action" data-toggle="list" href="#Asia" role="tab"
                        @click="selectArea('asia_i')">
                            <!-- <i class="asia_i mr-2 fas fa-plane" v-if="Animate === 'asia_i'"></i>亞洲 -->
                            <font-awesome-icon class="asia_i mr-2" v-if="Animate === 'asia_i'" :icon="['fa', 'plane']" style="color:#ffc107" />亞洲
                        </a>
                        <a class="list-group-item list-group-item-action" data-toggle="list" href="#Europe" role="tab"
                        @click="selectArea('europe_i')">
                            <!-- <i class="europe_i mr-2 fas fa-plane" v-if="Animate === 'europe_i'"></i>歐洲 -->
                            <font-awesome-icon class="europe_i mr-2" v-if="Animate == 'europe_i'" :icon="['fa', 'plane']" style="color:#ffc107" />歐洲
                        </a>
                        <a class="list-group-item list-group-item-action" data-toggle="list" href="#Africa" role="tab"
                        @click="selectArea('africa_i')">
                            <!-- <i class="africa_i mr-2 fas fa-plane" v-if="Animate === 'africa_i'"></i>非洲 -->
                            <font-awesome-icon class="africa_i mr-2" v-if="Animate === 'africa_i'" :icon="['fa', 'plane']" style="color:#ffc107" />非洲
                        </a>
                    </div>
                </div>
                <div class="col-10">
                        <div class="tab-content">
                            <div class="tab-pane active" id="all" role="tabpanel">
                                <div class="row">
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
                                                    <div class="h6 ">現在只要 <span class="text-danger">{{item.price | currency }}</span> 元</div>
                                                </div>
                                            </div>
                                            <div class="card-footer d-flex">
                                                <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal(item)">
                                                    <!-- <i class="fas fa-spinner fa-spin" v-if="ststus.loandItem === item.id"></i> -->
                                                    <font-awesome-icon v-if="ststus.more === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                                                    查看更多
                                                </button>
                                                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addcart(item.id)">
                                                    <!-- <i class="fas fa-spinner fa-spin" v-if="ststus.loandItem === item.id"></i> -->
                                                    <font-awesome-icon v-if="ststus.addCart === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                                                    加到購物車
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="Asia" role="tabpanel">
                                <div class="row">
                                    <div class="col-md-4 mb-4 list-group-item-action" v-for="item in Asia" :key="item.id">
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
                                                    <div class="h6">現在只要 <span class="text-danger">{{item.price | currency }}</span> 元</div>
                                                </div>
                                            </div>
                                            <div class="card-footer d-flex">
                                                <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal(item)">
                                                    <!-- <i class="fas fa-spinner fa-spin" v-if="ststus.loandItem === item.id"></i> -->
                                                    <font-awesome-icon v-if="ststus.more === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                                                    查看更多
                                                </button>
                                                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addcart(item.id)">
                                                    <!-- <i class="fas fa-spinner fa-spin" v-if="ststus.loandItem === item.id"></i> -->
                                                    <font-awesome-icon v-if="ststus.addCart === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                                                    加到購物車
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="Europe" role="tabpanel">
                                <div class="row">
                                    <div class="col-md-4 mb-4 list-group-item-action" v-for="item in Europe" :key="item.id">
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
                                                    <div class="h6">現在只要 <span class="text-danger">{{item.price | currency }}</span> 元</div>
                                                </div>
                                            </div>
                                            <div class="card-footer d-flex">
                                                <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal(item)">
                                                    <!-- <i class="fas fa-spinner fa-spin" v-if="ststus.loandItem === item.id"></i> -->
                                                    <font-awesome-icon v-if="ststus.more === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                                                    查看更多
                                                </button>
                                                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addcart(item.id)">
                                                    <font-awesome-icon v-if="ststus.addCart === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                                                    <!-- <i class="fas fa-spinner fa-spin" v-if="ststus.loandItem === item.id"></i> -->
                                                    加到購物車
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane" id="Africa" role="tabpanel">
                                <div class="row">
                                    <div class="col-md-4 mb-4 list-group-item-action" v-for="item in Africa" :key="item.id">
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
                                                    <div class="h6">現在只要 <span class="text-danger">{{item.price | currency }}</span> 元</div>
                                                </div>
                                            </div>
                                            <div class="card-footer d-flex">
                                                <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal(item)">
                                                    <!-- <i class="fas fa-spinner fa-spin" v-if="ststus.loandItem === item.id"></i> -->
                                                    <font-awesome-icon v-if="ststus.more === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                                                    查看更多
                                                </button>
                                                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addcart(item.id)">
                                                    <font-awesome-icon v-if="ststus.addCart === item.id" :icon="['fa', 'spinner']" style="color:#ffc107" spin />
                                                    <!-- <i class="fas fa-spinner fa-spin" v-if="ststus.loandItem === item.id"></i> -->
                                                    加到購物車
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
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
    </div>
</div>
</template>


<script>
import $ from 'jquery'

export default {
    data(){ 
        return{
            products:[],
            product:{},
            subTotal: '',
            Asia:[],  //亞洲,(包含台港澳)
            Europe:[], //歐洲
            Africa:[], //非洲
            Animate: 'all_i',
            loadStatus:{
                pageLoading: false,
            },
            ststus:{
                more: '',
                addCart: '',
            },
            jumbotronBg: require('../../../assets/img/jumbotron-bg.jpg'),
        }
    },
    methods:{
        getProucts(id){
            const vm = this;
            let count = 0;
            let api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/products`;
            vm.loadStatus.pageLoading = true;
            this.$http.get(api).then((response) => {
                for (let i = 0; i < response.data.pagination.total_pages; i++) {
                    count++;
                    api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/products?page=${count}}`;
                    this.$http.get(api).then((response) => {
                        for (let index = 0; index < response.data.products.length; index++) {
                            // 分類寫入
                            vm.products.push(response.data.products[index]);
                            if(response.data.products[index].category === '歐洲'){
                                vm.Europe.push(response.data.products[index]);  
                            }else if(response.data.products[index].category === '東南亞' || response.data.products[index].category === '東北亞' || response.data.products[index].category === '台港澳'){
                                vm.Asia.push(response.data.products[index]);  
                            }else if(response.data.products[index].category === '非洲'){
                                vm.Africa.push(response.data.products[index]);  
                            }
                        }
                        vm.loadStatus.pageLoading = false;
                    });     
                }
            });
        },
        openModal(item){
            const vm = this;
            vm.ststus.more = item.id;
            vm.product = item;
            vm.product.number = Number(1);
            vm.subTotal = vm.product.price;
            $('#productModal').modal('show');
            vm.ststus.more = '';
        },
        changeevent(){
            const vm = this;
            vm.subTotal = Number(vm.product.number) * Number(vm.product.price);
        },
        selectArea(area = 'all_i'){
            const vm = this;
            vm.Animate = area;
            const areaStr = `.${area}`;
            setTimeout(() => {
                const fa =  document.querySelector(areaStr);
                fa.classList.add('animated', 'bounceInLeft');
            }, 100);
           
            
        },
        addcart(id, qty = 1){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/cart`;
            let cart = {
                product_id: id,
                qty: qty,
            };
            vm.ststus.addCart = id;
            this.$http.post(api , {data: cart}).then((response) => {
                if(response.data.success){
                    vm.$bus.$emit('getCartsEvent');
                    this.$bus.$emit('messsage:push', response.data.message , 'success'); 
                }else{
                    this.$bus.$emit('messsage:push', response.data.message , 'danger'); 
                }
                vm.ststus.addCart = '';
                $('#productModal').modal('hide');
            });
        },
    },
    mounted(){
        this.getProucts();
        this.selectArea();
    },
}
</script>

<style>
.jumbotron-bg{
    /* background-image: url('../../../assets/img/jumbotron-bg.jpg'); */
    background-size: cover;
    background-position: center top;
    min-height: 400px;
}

.bg-lighter{
    background-color: rgba(255, 255, 255, .25)
}

.btn.disabled{
    pointer-events: none;
}

.list-group .active{
    background-color: #343a40 !important;
}
.fa-plane{
    color: #ffc107;
}
</style>
