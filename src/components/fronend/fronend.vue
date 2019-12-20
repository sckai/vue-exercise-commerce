<template>
  <div>
    <navBar></navBar>
    <AlertMessage></AlertMessage>
      <router-view></router-view>
    <footers></footers>
  </div>
</template>

<script>
import navBar from './views/navbar';
import footers from './views/footer';
import AlertMessage from '../AlertMessage';

export default {
  components: {
    navBar,
    footers,
    AlertMessage,
  }
}
</script>