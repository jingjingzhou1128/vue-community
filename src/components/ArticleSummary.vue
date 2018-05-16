<template>
  <div class="cell">
    <a href="#" class="author-logo"><img :src="article.author.avatar_url" :alt="article.author.loginname"></a>
    <span class="view-count"><small>{{ article.reply_count }}</small>/<small>{{ article.visit_count }}</small></span>
    <p class="article-title"><span v-if="showTab" :class="tabClass">{{ tabName }}</span><a href="#">{{ article.title }}</a></p>
    <span class="time">{{ article.last_reply_at }}</span>
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
      }
    }
  }
</script>

<style>
  .cell {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    line-height: 50px;
    text-align: left;
    padding: 0 10px;
    font-size: 14px;
  }
  .author-logo {
    display: inline-block;
  }
  .author-logo img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    vertical-align: middle;
    overflow: hidden;
    display: inline-block;
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
  .article-title span {
    color: #fff;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
  }
  .article-title span.light {
    background: #369219;
  }
  .article-title span.grey {
    background: #b4b4b4;
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