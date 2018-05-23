<template>
  <div class="login">
    <div class="form-group">
      <label>AccessToken:</label>
      <input v-model="accesstoken" id="accesstoken" name="accesstoken" type="text">
    </div>
    <div style="text-align: center;"><button class="submit" @click="login">登录</button></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data(){
    return {
      accesstoken: ''
    }
  },
  methods: {
    ...mapActions([
      'setUserInfo',
      'setAk'
    ]),
    login(){
      if(!this.accesstoken) return false
      this.$http.post('https://www.vue-js.com/api/v1/accesstoken', {accesstoken: this.accesstoken}).then(response => {
        this.setUserInfo(response.data)
        this.setAk(this.accesstoken)
        this.$router.push({name: 'home'})
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
.login {
  max-width: 450px;
  margin: 0 auto;
  background: #fff;
  padding: 50px 30px;
  border-radius: 3px;
  box-shadow: 0 0 8px 2px #b3b3b3;
}
.form-group label {
  font-size: 20px;
  color: #8c8c8c;
  padding-right: 20px;
  line-height: 35px;
}
.form-group input {
  border: 0;
  border-bottom: 2px solid #ccc;
  display: inline-block;
  width: 260px;
  font-size: 12px;
  line-height: 35px;
  padding: 0 15px;
  color: #8c8c8c;
}
.form-group input:focus {
  outline: none;
  outline-offset: 0;
}
.submit {
  font-size: 14px;
  color: #fff;
  background: #369219;
  border: none;
  padding: 8px 20px;
  border-radius: 3px;
  margin-top: 30px;
}
</style>

