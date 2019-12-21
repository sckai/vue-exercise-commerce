<template>
    <div>  
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0">
          <a class="navbar-brand col-4 col-sm-3 col-md-2 mr-0" href="#">漫遊旅遊後台</a>
          <ul class="navbar-nav px-3">
              <li class="nav-item text-nowrap">
                <a class="nav-link" href="#" @click.prevent="signout">
                  <font-awesome-icon :icon="['fa', 'sign-out-alt']"/>
                  Sign out
                </a>
              </li>
          </ul>
        </nav>
    </div>
</template>

<script>
export default {
    methods:{
    signout(){
      const vm = this;
      const api = `${process.env.API_PATH}/logout`;
      this.$http.post(api).then((response) => {
        if(response.data.success){
          vm.$router.push('/login');   //use router change page
        }
      });
    }
  }
}
</script>
