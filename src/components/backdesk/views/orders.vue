<template>
    <div>
        <loading :active.sync="loadStatus.pageLoading"></loading>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="160" class="text-center">購買時間</th>
                    <th width="240" class="text-center">e-mail</th>
                    <th class="text-center">購買款項</th>
                    <th width="120" class="text-center">應付金額</th>
                    <th width="120" class="text-center">是否付款</th>
                    <th width="120" class="text-center">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr :class="['list-group-item-action',{'list-group-item-secondary': (index % 2) == 0}]" v-for="(item, index) in order" :key="item.id">
                    <td>{{item.create_at | timeFormat }}</td>
                    <td class="text-center" v-if="typeof(item.user) === 'object'">{{item.user.email}}</td>
                    <td>
                        <ul  v-for="items in item.products" :key="items.id" style="list-style:none;">
                            <li>{{items.product.title}}</li>
                        </ul>
                    </td>
                    <td class="text-right">{{item.total | currency }}</td>
                    <td class="text-success text-center" v-if="item.is_paid">已付款</td>
                    <td class="text-center" v-else >未付款</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary" @click="openEditModal(item)">
                            編輯
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- page -->
        <pagination :pagination="pagination" @getPages="getorder"></pagination>


        <!-- modal -->
        <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
        aria-labelledby="orderModal" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="orderModal">
                    <span>訂單會員資訊</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">姓名</label>
                                <input type="text" class="form-control" id="name"
                                    placeholder="請輸入姓名" v-model="tempOrders.user.name">
                            </div>

                            <div class="form-group">
                                <label for="tel">電話</label>
                                <input type="text" class="form-control" id="tel"
                                    placeholder="請輸入電話" v-model="tempOrders.user.tel">
                            </div>

                            <div class="form-group">
                                <label for="email">電子郵件</label>
                                <input type="email" class="form-control" id="email"
                                    placeholder="請輸入信箱"  v-model="tempOrders.user.email">
                            </div>

                            <div class="form-group">
                                <label for="address">地址</label>
                                <input type="text" class="form-control" id="address"
                                    placeholder="請輸入地址" v-model="tempOrders.user.address" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="editOrder">確認</button>
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
    data(){
        return{
            order: {
                products:{},
                user: {
                },
            },
            pagination: {},
            loadStatus:{
                pageLoading: false,
            },
            tempOrders:{
                user:{},
            },
        };
    },
    methods: { 
        getorder(page = 1){   
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
            const vm = this;
            vm.loadStatus.pageLoading = true;
            this.$http.get(api).then((response) => {
                vm.pagination = response.data.pagination;
                vm.order = response.data.orders;
                vm.loadStatus.pageLoading = false;
            })
        },
        openEditModal(item){
            const vm = this;
            $('#orderModal').modal('show');
            vm.tempOrders = item;
        },
        editOrder(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/order/${vm.tempOrders.id}`;
            vm.loadStatus.pageLoading = true;
            this.$http.put(api, {data: vm.tempOrders}).then((response) => {
                if(response.data.success){
                    this.$bus.$emit('messsage:push', response.data.message , 'success');
                    vm.loadStatus.pageLoading = false;
                    $('#orderModal').modal('hide');
                }else{
                    this.$bus.$emit('messsage:push', response.data.message , 'danger'); 
                    vm.loadStatus.pageLoading = false;
                }
            })
        }

        
    },
    created(){
        const vm = this;
        vm.getorder();
    },
    filters:{
        timeFormat(timestamp){
            return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
        }
    }
}
</script>