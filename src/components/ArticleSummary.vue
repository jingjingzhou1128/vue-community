<template>
  <div class="cell">
    <router-link :to="{name: 'user-home', params: {loginname: article.author.loginname}}" class="user-logo small vertical-middle">
      <img :src="article.author.avatar_url" :alt="article.author.loginname" class="img-responsive">
    </router-link>
    <span class="view-count" v-if="showViewCount"><small>{{ article.reply_count }}</small>/<small>{{ article.visit_count }}</small></span>
    <p class="article-title">
      <span v-if="showTab" class="label" :class="tabClass">{{ tabName }}</span>
      <router-link :to="{name: 'article', params: {id: article.id, loginname: article.author.loginname}}">{{ article.title }}</router-link>
    </p>
    <span class="time">{{ article.last_reply_at | formatTime }}</span>
  </div>
</template>

<script>
  export default {
    name: 'ArticleSummary',
    props: ['article', 'showTab'],
    data(){
      return {
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
      showViewCount: function(){
        return (this.article.reply_count === undefined && this.article.visit_count === undefined) ? false : true
      }
    }
  }
</script>

<style>
  .cell {
    border-bottom: 1px solid #eee;
    line-height: 50px;
    text-align: left;
    padding: 0 15px;
    font-size: 14px;
  }
  .view-count {
    width: 70px;
    display: inline-block;
    text-align: center;
  }
  .view-count small:first-child {
    color: #9e78c0;
    font-size: 14px;
  }
  .view-count small:last-child {
    color: #b4b4b4;
    font-size: 10px;
  }
  .article-title {
    display: inline-block;
    margin: 0;
  }
  .article-title a {
    font-size: 16px;
    color: #464646;
    text-decoration: none;
  }
  .cell .time {
    float: right;
    font-size: 12px;
    color: #b4b4b4;
  }
</style>