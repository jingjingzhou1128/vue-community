<template>
  <div class="right-container">
    <div class="panel panel-grey">
      <div class="panel-header" style="padding: 8px 15px;">
        <p class="panel-title" style="font-size: 18px;color: #08c;">个人信息</p>
      </div>
      <div class="panel-body">
        <div class="user-info">
          <router-link :to="{name: 'user-home', params: {loginname: user.loginname}}" tag="a" class="user-logo big"><img :src="user.avatar_url" class="img-responsive"></router-link>
          <router-link :to="{name: 'user-home', params: {loginname: user.loginname}}" tag="a" class="user-name">{{ user.loginname }}</router-link>
        </div>
        <p class="integral">积分：{{ user.score }}</p>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body" v-if="user.loginname === loginUser.loginname">
        <router-link class="btn btn-success" :to="{name: 'topic-create'}">发布话题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserBrief',
  data(){
    return {
      user: {}
    }
  },
  computed: mapGetters({
    loginUser: 'user'
  }),
  methods: {
    getData(){
      let loginname = this.$route.params && this.$route.params.loginname
      this.$http.get(`https://www.vue-js.com/api/v1/user/${loginname}`).then((response) => {
        this.user = response.data.data
        console.log(response.data.data)
      }).catch(function(error){
        console.log(error)
      })
    },
  },
  watch: {
    $route(){
      this.getData()
    }
  },
  beforeMount(){
    this.getData()
  }
}
</script>

<style>
  .user-container {
    position: absolute;
    right: 0;
    top: 0;
    width: 280px;
  }
</style>