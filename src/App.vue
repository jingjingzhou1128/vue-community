<template>
  <div id="app">
    <Header></Header>
    <div class="container-warpper">
      <router-view name="main"></router-view>
      <router-view name="sidebar"></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
// import { mapGetters } from 'vuex'
export default {
  name: 'App',
  // data(){
  //   return {}
  // },
  // computed: {
  //   ...mapGetters([
  //     'loginName'
  //   ])
  // },
  components: { Header }
}
</script>

<style>
@import url("css/common.css");
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.container-warpper {
  max-width: 1400px;
  min-width: 960px;
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
}
</style>
