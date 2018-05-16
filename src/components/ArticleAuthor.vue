<template>
  <div class="author-container">
    <div class="panel panel-grey">
      <div class="panel-header" style="padding: 8px 15px;">
        <p class="panel-title" style="font-size: 18px;color: #08c;">作者</p>
      </div>
      <div class="panel-body">
        <a href="#" class="user-logo">
          <span class="user-img"><img :src="author.avatar_url"></span>
          <span class="user-name">{{ author.loginname }}</span>
        </a>
        <p class="integral">积分：{{ author.score }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Author',
  data(){
    return {
      author: {}
    }
  },
  computed: {

  },
  methods: {
    getData(){
      axios.get(`https://www.vue-js.com/api/v1/topic/${this.$route.params.id}`).then((response) => {
        let loginname = response.data.data && response.data.data.author && response.data.data.author.loginname
        console.log(response.data.data.author.loginname)
        axios.get(`https://www.vue-js.com/api/v1/user/${loginname}`).then((response) => {
          this.author = response.data.data
          console.log(response.data.data)
        }).catch(function(error){
          console.log(error)
        })
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
@import url("../css/common.css");
  .author-container {
    position: absolute;
    right: 0;
    top: 0;
    width: 280px;
  }
  .user-logo {
    display: flex;
    text-decoration: none;
    color: #778087;
    align-items: center;
  }
  .user-img {
    display: block;
    width: 50px;
  }
  .user-img img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .user-name {
    padding: 0 15px;
  }
</style>


