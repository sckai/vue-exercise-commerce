<template>
  <div class="bgImg" :style="{backgroundImage: 'url(' + travelBg +')' }">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">漫步旅遊</h1>
      <div class="alert alert-warning" role="alert" v-if="!isMesssage">
        {{messsage}}
      </div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" 
      required autofocus v-model="user.username">
      <label for="inputPassword" class="sr-only" >Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" 
      required v-model="user.password">
      <button class="btn btn-lg btn-primary btn-block mt-5" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-white">&copy; 2019 漫步旅遊</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',

  data () {
    return {
      user:{
        username: '',
        password: '',
      },
      isMesssage: true,
      messsage: '',
      travelBg: require('../../assets/img/travel.jpg'),
    }
  },
  methods:{
    signin(){
      const vm = this;
      const api = `${process.env.API_PATH}/admin/signin`;
      this.$http.post(api, vm.user).then((response) => {
        console.log(response.data);
        if(response.data.success){
          vm.$router.push('/dashboard/products');   //use router change page
        }else{
            vm.isMesssage = false;
            vm.messsage = response.data.message;
        }
      });
    },
  },
  watch:{
    isMesssage: function(value) {
      const vm = this;
      console.log('我監控到了');
      setTimeout(function(){
        vm.isMesssage = true;
      },5000);
    }
  }
}
</script>

<style scoped>
  html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.bgImg{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
}
</style>


