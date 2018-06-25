<template>
  <div class="comment">
    <router-link :to="{name: 'user-home', params: {loginname: recomment.author.loginname}}" class="user-logo small">
      <img :src="recomment.author.avatar_url" class="img-responsive">
    </router-link>
    <div class="comment-content">
      <p><router-link :to="{name: 'user-home', params: {loginname: recomment.author.loginname}}">{{ recomment.author.loginname }}</router-link><small>{{ floor + 1 }}楼{{ comment.create_at | formatTime }}</small></p>
      <p style="padding: 15px;margin: 0;" v-html="recomment.content"></p>
    </div>
    <span v-if="loginUser.success" class="thumbs-up-wrapper">
      <i @click="thumbUp" :class="thumbUpCls"></i>
      {{ recomment.ups.length }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ArticleComment',
  props: ['comment', 'floor'],
  data(){
    return {
      recomment: this.comment
    }
  },
  computed: {
    ...mapGetters({
      loginUser: 'user',
      accesstoken: 'accesstoken'
    }),
    thumbUpCls: function(){
      // if(!this.loginUser.success) return 'el-icon-star-off'
      // if(this.recomment.ups.find(item => item === this.loginUser.id)) return 'el-icon-star-on'
      // return 'el-icon-star-off'
      return [
        'thumbs-up',
        this.loginUser.success && this.recomment.ups.find(item => item === this.loginUser.id) ? 'el-icon-star-on' : 'el-icon-star-off'
      ]
    }
  },
  methods: {
    thumbUp(){
      if(!this.loginUser.success) return
      let replyId = this.recomment.id
      this.$http.post(`https://www.vue-js.com/api/v1/reply/${replyId}/ups`, {
        accesstoken: this.accesstoken
      }).then(response => {
        console.log(response)
        let data = response.data
        if(!data.success) return
        if(data.action === 'up') {
          this.recomment.ups.push(this.loginUser.id)
        }else {
          this.recomment.ups = this.recomment.ups.filter(item => item !== this.loginUser.id)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
.comment {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
  }
.comment-content {
  flex-grow: 1;
  padding: 0 15px;
  font-size: 15px;
}
.comment-content p {
  margin: 0
}
.comment-content a {
  color: #666;
  font-weight: 600;
  text-decoration: none;
}
.comment-content small {
  color: #08c;
}
.thumbs-up-wrapper {
  width: 50px;
}
.thumbs-up {
  cursor: pointer;
}
</style>

