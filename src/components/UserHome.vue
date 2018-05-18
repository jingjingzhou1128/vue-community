<template>
  <div class="user-home" v-loading="loading">
    <div class="panel panel-grey">
      <div class="panel-header" style="padding: 0;">
        <ul class="breadcrumbs">
          <li><router-link :to="{name: 'home'}">主页</router-link></li>
        </ul>
      </div>
    </div>
    <div class="user-panel panel">
      <div class="panel-body">
        <div class="user-info">
          <span class="user-logo big"><img :src="user.avatar_url" class="img-responsive"></span>
          <span class="user-name">{{ user.loginname }}</span>
        </div>
        <p class="integral">积分: {{ user.score }}</p>
        <ul class="user-contact">
          <li><i class="el-icon-message"></i>{{ user.githubUsername }}</li>
        </ul>
        <p class="register">注册时间 {{ user.create_at | formatTime }}</p>
      </div>
    </div>
    <div class="panel panel-grey">
      <div class="panel-header" style="padding:3px 15px; color: #369219;">
        <p class="panel-title">最近创建的话题</p>
      </div>
      <div class="panel-body" style="padding: 0;" v-if="user.recent_topics.length > 0">
        <article-summary v-for="topic in topics" :key="topic.id" :article="topic" :showTab="isShowTab"></article-summary>
        <div class="view-more"><router-link :to="{name: 'user-topics'}">查看更多<i class="el-icon-d-arrow-right"></i></router-link></div>
      </div>
      <div class="panel-body empty-content" v-else>
        <p>当前还没有内容</p>
      </div>
    </div>
    <div class="panel panel-grey">
      <div class="panel-header" style="padding:3px 15px; color: #369219;">
        <p class="panel-title">最近参与的话题</p>
      </div>
      <div class="panel-body" style="padding: 0;" v-if="user.recent_replies.length > 0">
        <article-summary v-for="reply in replies" :key="reply.id" :article="reply" :showTab="isShowTab"></article-summary>
        <div class="view-more"><router-link :to="{name: 'user-replies'}">查看更多<i class="el-icon-d-arrow-right"></i></router-link></div>
      </div>
      <div class="panel-body empty-content" v-else>
        <p>当前还没有内容</p>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleSummary from '@/components/ArticleSummary'
export default {
  name: 'UserHome',
  data(){
    return {
      user: {
        recent_topics: [],
        recent_replies: []
      },
      isShowTab: false,
      loading: true
    }
  },
  computed: {
    topics: function(){
      return this.user.recent_topics.slice(0, 4)
    },
    replies: function(){
      return this.user.recent_replies.slice(0, 4)
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

<style>
.user-contact {
  list-style: none;
  padding-left: 0;
  margin: 0;
  color: #909399;
  font-size: 14px;
}
.user-contact li {
  line-height: 30px;
}
.user-contact li i {
  padding: 0 5px 0 0;
}
.register {
  color: #C0C4CC;
  font-size: 13px;
}
</style>

