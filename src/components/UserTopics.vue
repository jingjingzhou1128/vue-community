<template>
  <div class="topics" v-loading="loading">
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
        <p class="panel-title">最近{{ typeToChinese }}的话题</p>
      </div>
      <div class="panel-body" style="padding: 0;">
        <article-summary v-for="topic in topics" :key="topic.id" :article="topic" :showTab="isShowTab"></article-summary>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleSummary from '@/components/ArticleSummary'
export default {
  name: 'UserTopics',
  data(){
    return {
      user: {},
      isShowTab: false,
      types: {
        topics: '创建',
        replies: '参与'
      },
      loading: true
    }
  },
  computed: {
    type: function(){
      let pathArray = this.$route.fullPath && this.$route.fullPath.split("/")
      return pathArray[pathArray.length-1] === "" ? pathArray[pathArray.length-2] : pathArray[pathArray.length-1]
    },
    topics: function(){
      return this.user[`recent_${this.type}`]
    },
    typeToChinese: function(){
      return this.types[this.type]
    }
  },
  methods: {
    getData(){
      this.loading = true
      let loginname = this.$route.params && this.$route.params.loginname
      this.$http.get(`https://www.vue-js.com/api/v1/user/${loginname}`).then((response) => {
        this.user = response.data.data
        this.loading = false
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
