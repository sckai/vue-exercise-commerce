<template>
    <div>
        <loading :active.sync="loadStatus.pageLoading"></loading>
        <div class="text-right mt-2">
            <button class="btn btn-primary" @click="openModel(true)">建立新產品</button>
        </div>

        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="120" class="text-center">圖片</th>
                    <th width="120" class="text-center">原價</th>
                    <th width="120" class="text-center">售價</th>
                    <th width="120" class="text-center">是否啟用</th>
                    <th width="120" class="text-center">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr :class="['list-group-item-action',{'list-group-item-secondary': (index % 2) == 0}]" v-for="(item, index) in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td><img class="img-fluid" :src="item.imageUrl" alt=""></td>
                    <td class="text-right">
                        {{ item.origin_price | currency }}
                        <span class="text-info" v-if="item.unit">/1{{item.unit}}</span>
                    </td>
                    <td class="text-right">
                        {{ item.price | currency }}
                        <span class="text-info" v-if="item.unit">/1{{item.unit}}</span>
                    </td>
                    <td class="text-center">
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" @click="openModel(false, item)">編輯</button>
                        <button class="btn btn-sm btn-outline-danger" @click="deleteModel(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- page -->
        <pagination :pagination="pagination" @getPages="getProducts"></pagination>

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="productModal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="productModal">
                    <span v-if="isNew">新增產品</span>
                    <span v-else>編輯產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            placeholder="請輸入圖片連結" v-model="tempProducts.imageUrl">
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <font-awesome-icon v-if="loadStatus.uploadLoading" :icon="['fa', 'spinner']" spin/>
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files" @change="uploadFile">
                        </div>
                        <img class="img-fluid" :src="tempProducts.imageUrl" alt="">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題" v-model="tempProducts.title">
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                            placeholder="請輸入分類" v-model="tempProducts.category">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input type="unit" class="form-control" id="unit"
                            placeholder="請輸入單位" v-model="tempProducts.unit">
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control" id="origin_price"
                            placeholder="請輸入原價" v-model="tempProducts.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                            placeholder="請輸入售價" v-model="tempProducts.price">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" class="form-control" id="description"
                            placeholder="請輸入產品描述" v-model="tempProducts.description"></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea type="text" class="form-control" id="content"
                            placeholder="請輸入產品說明內容" v-model="tempProducts.content"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            id="is_enabled" 
                            v-model="tempProducts.is_enabled" 
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
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
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
                    <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempProducts.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger"
                    @click="deleteProduct"
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
    components: {
        pagination,
    },
    data(){
        return{
            products: [],
            tempProducts:{},
            isNew: false,
            pagination: {},
            loadStatus:{
                pageLoading: false,
                uploadLoading: false,
            },
            
        };
    },
    methods:{
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
        openModel(isNew, item){
            const vm = this;
            if(isNew){
                vm.tempProducts = {};
                vm.isNew = true;
            }else{
                vm.tempProducts = Object.assign({}, item);
                vm.isNew = false;
            }
            $('#productModal').modal('show');
        },
        updateProduct(){
            const vm = this;
            let api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/product`;
            let httpMethod = 'post';
            if(!vm.isNew){
                api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/product/${vm.tempProducts.id}`;
                httpMethod = 'put';
            }
            this.$http[httpMethod](api, {data: vm.tempProducts}).then((response) => {
                if(response.data.success){
                    $('#productModal').modal('hide');
                    vm.getProducts();
                    this.$bus.$emit('messsage:push', response.data.message , 'success');
                }else{
                    vm.getProducts();   
                    this.$bus.$emit('messsage:push', response.data.message , 'danger'); 
                }
            })
        },
        deleteModel(item){
            const vm = this;
            vm.tempProducts = Object.assign({}, item);
            $('#delProductModal').modal('show');
        },
        deleteProduct(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/product/${vm.tempProducts.id}`;
            this.$http.delete(api).then((response) => {
                if(response.data.message){
                    vm.getProducts();
                    $('#delProductModal').modal('hide');
                    this.$bus.$emit('messsage:push', response.data.message , 'success');
                }else{
                    this.$bus.$emit('messsage:push', response.data.message , 'danger');
                }
                
            });
        },
        uploadFile(){
            const uploadedFile = this.$refs.files.files[0];
            if(uploadedFile === undefined){
                return;
            }
            const vm  = this;
            const formData  =  new FormData();
            formData.append('file-to-upload', uploadedFile);
            const url = `${process.env.API_PATH}${process.env.CUSTOMPATH}/admin/upload`;
            vm.loadStatus.uploadLoading = true;
            this.$http.post(url, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                if(response.data.imageUrl){
                    vm.$set(vm.tempProducts, 'imageUrl', response.data.imageUrl);
                    vm.loadStatus.uploadLoading = false;
                    console.log(response.data);
                    this.$bus.$emit('messsage:push', '上傳成功' , 'success');
                }else{
                    this.$bus.$emit('messsage:push', response.data.message , 'danger');
                    vm.loadStatus.uploadLoading = false;
                }
            }); 
        }
    },
    created(){
        this.getProducts();
    },
}
</script>