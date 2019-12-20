<template>
  <div class="hello">
    <button type="button" class="btn btn-primary" @click.prevent="signout">登出</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
