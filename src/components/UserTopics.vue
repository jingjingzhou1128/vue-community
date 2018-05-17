<template>
  <div class="topics">
    <div class="panel panel-grey">
      <div class="panel-header" style="padding: 0;">
        <ul class="breadcrumbs">
          <li><router-link :to="{name: 'home'}">主页</router-link></li>
          <li><router-link :to="{name: 'user-home', params: {loginname: user.loginname}}">{{ user.loginname }}</router-link></li>
        </ul>
      </div>
    </div>
    <div class="panel panel-grey">
      <div class="panel-header" style="padding:3px 15px; color: #369219;">
        <p class="panel-title">{{ user.loginname }}创建的话题</p>
      </div>
      <div class="panel-body" style="padding: 0;">
        <article-summary v-for="topic in topics" :key="topic.id" :article="topic" :showTab="isShowTab"></article-summary>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleSummary from '@/components/ArticleSummary'
export default {
  name: 'UserTopics',
  data(){
    return {
      user: {},
      isShowTab: false
    }
  },
  computed: {
    topics: function(){
      let pathArray = this.$route.fullPath && this.$route.fullPath.split("/")
      let topic = pathArray[pathArray.length-1] == '/' ? pathArray[pathArray.length-2] : pathArray[pathArray.length-1]
      return this.user[`recent_${topic}`]
    }
  },
  methods: {
    getData(){
      let loginname = this.$route.params && this.$route.params.loginname
      axios.get(`https://www.vue-js.com/api/v1/user/${loginname}`).then((response) => {
        this.user = response.data.data
        console.log(this.user)
      }).catch(function(error){
        console.log(error)
      })
    }
  },
  components: { ArticleSummary },
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
