<template>
    <div>
        <loading :active.sync="loadStatus.pageLoading"></loading>
        <div class="text-right my-2">
            <button type="button" class="btn btn-primary" @click="openCouponModal(true)">建立新的優惠</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th width="120" class="text-center">優惠碼</th>
                    <th width="120" class="text-center">折扣比</th>
                    <th width="120" class="text-center">到期日</th>
                    <th width="120" class="text-center">是否啟用</th>
                    <th width="140" class="text-center">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr :class="['list-group-item-action',{'list-group-item-secondary': (index % 2) == 0}]" v-for="(item, index) in coupons" :key="item.id">
                    <td>{{item.title}}</td>
                    <td class="text-center">{{item.coupon}}</td>
                    <td class="text-center">{{item.percent}}%</td>
                    <td class="text-center">{{item.time}}</td>
                    <td class="text-center">
                        <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary" @click="openCouponModal(false, item)">編輯</button>
                        <button class="btn btn-sm btn-outline-danger"  @click="openDeleteModal(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>  

        
        <!-- modal -->
        <div class="modal fade" id="newCouponModal" tabindex="-1" role="dialog"
        aria-labelledby="newCouponModal" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="newCouponModal">
                    <span v-if="isNew">建立新優惠</span>
                    <span v-else>編輯優惠</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="title">標題</label>
                            <input type="text" class="form-control" id="title"
                                placeholder="請輸入標題" v-model="tempCoupon.title">
                        </div>

                        <div class="form-group">
                            <label for="coupon">優惠碼</label>
                            <input type="text" class="form-control" id="coupon"
                                placeholder="請輸入優惠碼" v-model="tempCoupon.coupon">
                        </div>

                        <div class="form-group">
                            <label for="time">到期日</label>
                            <input type="date" class="form-control" id="time"
                                placeholder="請輸入到期日" v-model="tempCoupon.time">
                        </div>

                        <div class="form-group">
                            <label for="percent">折扣百分比</label>
                            <input type="number" class="form-control" id="percent"
                                placeholder="請輸入折扣百分比" v-model="tempCoupon.percent">
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                id="is_enabled" 
                                v-model="tempCoupon.is_enabled" 
                                :true-value="1"
                                :false-value="0">
                                <label class="form-check-label" for="is_enabled">
                                是否啟用
                                </label>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
                </div>
                </div>
            </div>
        </div>

        <!-- deleteModal -->
        <div class="modal fade" id="delCouponsModal" tabindex="-1" role="dialog"
        aria-labelledby="delCouponsModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="delCouponsModal">
                    <span>刪除優惠卷</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{tempCoupon.title}}</strong> 優惠卷(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger"
                    @click="deleteCoupon"
                    >確認刪除</button>
                </div>
                </div>
            </div>
        </div>

        <!-- page -->
        <pagination :pagination="pagination" :getPages="getCoupon"></pagination>
    </div>
</template>


<script>
import $ from 'jquery'
import pagination from "@/components/Pagination";

export default {
    components:{
        pagination,
    },
    data(){
        return{
            coupons: [],
            tempCoupon: {},
            isNew: false,
            pagination:{},
            loadStatus:{
                pageLoading: false,
            },
        }
    },
    methods:{
        getCoupon(page = 1 ){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
            vm.loadStatus.pageLoading = true;
            this.$http.get(api).then((response) => {
                vm.pagination = response.data.pagination;
                vm.coupons = response.data.coupons;
                vm.loadStatus.pageLoading = false;
            });   
        },
        updateCoupon(){
            const vm = this;
            let api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/coupon`;
            let httpMethod = 'post';
            if(!vm.isNew){
                api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
                httpMethod = 'put';
            }
            this.$http[httpMethod](api, {data: vm.tempCoupon}).then((response) => {
                if(response.data.success){
                    $('#newCouponModal').modal('hide');
                    vm.getCoupon();
                    this.$bus.$emit('messsage:push', response.data.message , 'success'); 
                }else{
                    vm.getCoupon();
                    this.$bus.$emit('messsage:push', response.data.message , 'danger'); 
                }
            });          
        },
        openCouponModal(isNew, item){
            const vm = this;
            if(isNew){
                vm.tempCoupon = {};
                vm.isNew = true;
            }else{
                vm.tempCoupon = Object.assign({}, item);
                vm.isNew = false;
            }
            $('#newCouponModal').modal('show');
        },
        openDeleteModal(item){
            const vm = this;
            vm.tempCoupon = Object.assign({}, item);
            $('#delCouponsModal').modal('show');
        },
        deleteCoupon(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
            this.$http.delete(api).then((response) => {
                if(response.data.success){
                    $('#delCouponsModal').modal('hide');
                    vm.getCoupon();
                    this.$bus.$emit('messsage:push', response.data.message , 'success');
                }else{
                    this.$bus.$emit('messsage:push', response.data.message , 'danger');
                }
            });
        }
    },
    created(){
        this.getCoupon();
    }
}
</script>