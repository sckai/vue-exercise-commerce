<template>
<div>
    <loading :active.sync="loadStatus.pageLoading"></loading>
    <div class="container">
       <div class="bd-example mb-5">
            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active ">
                        <img src="@/assets/img/bg-1.jpg" class="carousel-bg d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block bg-lighter">
                            <h5 class="text-warning">紐西蘭——100% 純凈的紐西蘭</h5>
                            <p>這句紐西蘭耳熟能詳的標語已大獲成功，這樣的小清新路線已成經典，紐西蘭是一片凈土，大部分景點都不需要門票費用，鳥兒在這裡沒有天敵，島上滿眼蒼翠的綠地，置身與此，仿佛可以觸摸到原始森林的力量，這裡舒服地似乎有些太過安逸。</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="@/assets/img/bg-2.jpg" class="carousel-bg d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block bg-lighter">
                            <h5 class="text-warning">夏威夷——微笑的群島，這裡陽光燦爛!</h5>
                            <p>陽光燦爛讓我們想到海灘的風和日麗以及夕陽西下的落日景象，可以划船衝浪也可以沿著沙灘散步。夏威夷處於太平洋的「十字路口」，是多種文化匯集交融的大熔爐，有著讓人完全放鬆的熱帶環境，也是情侶們夢想中的蜜月天堂。</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="@/assets/img/bg-3.jpg" class="carousel-bg d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block bg-lighter">
                            <h5 class="text-warning">沖繩——在色彩絢麗夢幻般的珊瑚中游動，妙不可言！</h5>
                            <p>青洞是沖繩必訪景點，盛名絕非空虛得來，一進入青洞內彷如進入另一個世界，洞內溫度光線比洞外低，水面顏色隨天氣、溫度、角度、陽光…變化，反射出的色彩美得讓人瞠目結舌，同一天的不同時間就有不同面貌。</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="@/assets/img/bg-4.jpg" class="carousel-bg d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block bg-lighter">
                            <h5 class="text-warning">非洲——陽光13月</h5>
                            <p>衣索比亞有「非洲屋脊」之稱，在衣索比亞，最流行的旅遊口號是「享受13個月的陽光」。這源於衣索比亞全年宜人的氣候、溫暖的陽光以及有13個月的年曆，他們遵循古老的羅馬儒略曆法，每年共有13月，前12個月均有30天，而第13月有5天或6天(閏年)。這個標語也很好的體現了埃塞爾比亞全年陽光普照的特色。</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="@/assets/img/bg-5.jpg" class="carousel-bg d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block bg-lighter">
                            <h5 class="text-warning">澳大利亞——生機勃勃的原始叢林</h5>
                            <p>有人說澳大利亞很豐富，豐富到你無法給她下定義，熱情，沉靜，野性，恬靜，前衛，古樸······充滿矛盾，又擁有一切。</p>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    <hr>
    </div>

    <div class="container">
        <div class="row">
            <div class="card-group my-2 col-md-4" v-for="item in randomProducts" :key="item.id">
                <div class=" card mx-2">
                    <div class="product-bg" :style="['',{backgroundImage: `url(${item.imageUrl})`}]"></div>
                    <div class="card-body">
                        <h5 class="card-title">{{item.title}}</h5>
                        <router-link to="/products_list">
                            <button type="button" class="btn btn-sm btn-outline-primary btn-lg btn-block">更多</button>
                        </router-link>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>
</template>

<style>

.carousel-bg{
  height: calc(100vh - 211.2px);
}

.bg-lighter{
    background-color: rgba(48, 47, 47, 0.35);
}

/* card-bg */
.product-bg{
    /* background-color: #212529; */
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
</style>

<script>
import $ from 'jquery';
$('.carousel').carousel();

export default {
    data(){
        return{
            randomProducts: [], //取六筆
            loadStatus:{
                pageLoading: false,
                // uploadLoading: false,
            },
        }
    },
    methods:{
        getProducts(){
            const vm = this;
            const api = `${process.env.API_PATH}${process.env.CUSTOMPATH}/products/all`;
            vm.loadStatus.pageLoading = true;
            this.$http.get(api).then((response) => {
                if(response.data.success){  
                    
                    // 取六筆
                    let i = 0;
                    while (i<6)
                    {
                        const arr = response.data.products;
                        let r = Math.floor( Math.random() * response.data.products.length );
                        var obj = arr[r].title;                     
                        if(vm.randomProducts.length === 0){
                            vm.randomProducts.push(response.data.products[r]);
                            i++;
                        }else{
                            let findEmpty = vm.randomProducts.some(function(item, index, array){
                                return item.title === obj;
                            });
                            if(!findEmpty){
                                vm.randomProducts.push(response.data.products[r]);
                                i++;
                            }
                        } 
                    }
                }
                vm.loadStatus.pageLoading = false;
            });
    
        },
    },
    mounted(){
        this.getProducts();
    },
    
}
</script>