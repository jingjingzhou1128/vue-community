<template>
  <div class="article-container">
    <div class="panel panel-default">
      <div class="panel-header">
        <h4 class="panel-title" style="font-size: 20px;"><span class="label" :class="tabClass">{{ tabName }}</span>{{ article.title }}</h4>
        <small class="minor-info">发布于 {{ article.create_at | formatTime}}  作者 {{ article.author.loginname }}  {{ article.visit_count }} 次浏览  来自 {{ fromLab }}</small>
      </div>
      <div class="panel-body" v-html="article.content"></div>
    </div>
    <div class="panel panel-grey">
      <div class="panel-header" style="padding: 3px 15px;">
        <p class="panel-title">{{ article.reply_count}}回复</p>
      </div>
      <div class="panel-body" style="padding: 0;">
        <article-comment v-for="(reply, index) in article.replies" :key="index" :comment="reply" :floor="index"></article-comment>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleComment from '@/components/ArticleComment'

export default {
  name: 'ArticleDetail',
  data(){
    return {
      article: {
        author: {
          loginname: ''
        },
        content: ""
      },
      tabs: {
        top: '置顶',
        good: '精华',
        weex: 'weex',
        share: '分享',
        ask: '问答',
        job: '招聘'
      }
    }
  },
  computed: {
    tabClass: function(){
      return (this.article.top || this.article.good) ? 'light' : 'grey'
    },
    tabName: function(){
      return this.article.top ? this.tabs['top'] : (this.article.good ? this.tabs['good'] : this.tabs[this.article.tab])
    },
    fromLab: function(){
      return this.tabs[this.article.tab]
    }
  },
  components: { ArticleComment },
  methods: {
    getData(){
      axios.get(`https://www.vue-js.com/api/v1/topic/${this.$route.params.id}`, {
        params: {mdrender: true}
      }).then((response) => {
        this.article = response.data.data
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
    let articleId = this.$route.params.id
    this.getData()
  }
}
</script>

<style>
@import url("../css/common.css");
.article-container {
  margin-right: 305px;
}
</style>

