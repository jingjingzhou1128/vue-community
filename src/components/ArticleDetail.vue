<template>
  <div class="article-container" v-loading="loading">
    <div class="panel panel-default">
      <div class="panel-header">
        <div class="flex">
          <h4 class="panel-title" style="font-size: 20px;"><span class="label" :class="tabClass">{{ tabName }}</span>{{ article.title }}</h4>
          <template v-if="loginUser.success">
            <span v-if="!isCollected" class="btn btn-success" @click="collect">加入收藏</span>
            <span v-if="isCollected" class="btn" @click="cancleCollect">取消收藏</span>
          </template>
        </div>
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
    <comment-reply :topicId="article.id"></comment-reply>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleComment from '@/components/ArticleComment'
import CommentReply from '@/components/CommentReply'

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
      },
      loading: true,
      loginUserInfo: {}
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
    },
    ...mapGetters({
      accesstoken: 'accesstoken',
      loginUser: 'user'
    }),
    isCollected(){
      if(!this.loginUser.success || !this.loginUserInfo.collect_topics) return false
      if(this.loginUserInfo.collect_topics.find(item => item.id === this.$route.params.id)) return true
      return false
    }
  },
  components: { ArticleComment, CommentReply },
  methods: {
    getData(){
      this.loading = true
      this.$http.get(`https://www.vue-js.com/api/v1/topic/${this.$route.params.id}`, {
        params: {mdrender: true}
      }).then((response) => {
        this.article = response.data.data
        this.loading = false
        console.log(response.data.data)
      }).catch(function(error){
        console.log(error)
      })
    },
    collect(){
      this.$http.post('https://www.vue-js.com/api/v1/topic/collect', {
        accesstoken: this.accesstoken,
        topic_id: this.article.id
      }).then(response => {
        console.log(response)
        if(response.data.success) this.getCollectedArt()
      }).catch(error => {
        console.log(error)
      })
    },
    cancleCollect(){
      this.$http.post('https://www.vue-js.com/api/v1/topic/de_collect', {
        accesstoken: this.accesstoken,
        topic_id: this.article.id
      }).then(response => {
        console.log(response)
        if(response.data.success) this.getCollectedArt()
      }).catch(error => {
        console.log(error)
      })
    },
    getCollectedArt(){
      if(!this.loginUser.success) return
      let loginname = this.loginUser.loginname
      this.$http.get(`https://www.vue-js.com/api/v1/user/${loginname}`).then(response => {
        this.loginUserInfo = response.data.data
        console.log(response.data.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  watch: {
    $route(){
      this.getData()
    }
  },
  beforeMount(){
    let articleId = this.$route.params.id
    this.getData()
    this.getCollectedArt()
  }
}
</script>

<style>
.article-container {
  margin-right: 305px;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* .collect {
  background: #369219;
  color: #fff;
  padding: 7px 10px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
} */
</style>

