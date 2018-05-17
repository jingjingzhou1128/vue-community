<template>
  <div class="comment">
    <router-link :to="{name: 'user-home', params: {loginname: comment.author.loginname}}" class="user-logo small">
      <img :src="comment.author.avatar_url" class="img-responsive">
    </router-link>
    <div class="comment-content">
      <p><router-link :to="{name: 'user-home', params: {loginname: comment.author.loginname}}">{{ comment.author.loginname }}</router-link><small>{{ floor + 1 }}楼{{ comment.create_at | formatTime }}</small></p>
      <p style="padding: 15px;margin: 0;" v-html="comment.content"></p>
    </div>
    <span class="thumbs-up"><i class="el-icon-star-off"></i>{{ comment.ups.length }}</span>
  </div>
</template>

<script>
export default {
  name: 'ArticleComment',
  props: ['comment', 'floor']
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
.thumbs-up {
  width: 50px;
}
</style>

