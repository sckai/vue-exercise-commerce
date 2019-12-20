<template>
  <div>
    <Navbar/>
    <AlertMessage></AlertMessage>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './navBar';
import Sidebar from './sideBar';
import AlertMessage from '../AlertMessage';

export default {
  
  components: {
    Navbar,
    Sidebar,
    AlertMessage,
  }
}
</script>