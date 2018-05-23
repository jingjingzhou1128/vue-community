<template>
  <nav id="header">
    <div class="container">
      <div class="header-logo">
        <img src="../assets/logo.png" alt="VueJs">
        <span>VueJs</span>
      </div>
      <ul class="header-menus">
        <li>关于</li>
        <template v-if="user.success">
          <li><router-link :to="{name: 'user-home', params: {loginname: user.loginname}}">{{ user.loginname }}</router-link></li>
          <li style="cursor: pointer;" @click="logout">退出</li>
        </template>
        <li v-else style="cursor: pointer;"><router-link :to="{name: 'login'}">登录</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Header',
    computed: mapGetters([
      'user'
    ]),
    methods: {
      ...mapActions([
        'setUserInfo',
        'setAk'
      ]),
      logout(){
        this.setUserInfo({loginname: '', id: '', avatar_url: '' ,success: false})
        this.setAk("")
        this.$router.push({name: 'home'})
      }
    }
  }
</script>

<style>
  #header {
    height: 60px;
    line-height: 60px;
    background: #1c6132;
    color: #fff;
    font-size: 15px;
  }
  .container {
    min-width: 960px;
    max-width: 1400px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
  .header-logo img {
    height: 50px;
    width: auto;
    vertical-align: middle;
  }
  .header-logo span {
    font-size: 18px;
    font-weight: 600;
  }
  .header-menus {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .header-menus > li {
    display: inline-block;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 13px;
    padding: 0 10px;
  }
  .header-menus > li > a {
    color: #fff;
    text-decoration: none;
  }
</style>