<template>
  <div class="comment">
    <a href="#" class="comment-logo"><img :src="comment.author.avatar_url"></a>
    <div class="comment-content">
      <p><a href="#">{{ comment.author.loginname }}</a><small>{{ floor + 1 }}楼{{ comment.create_at | formatTime }}</small></p>
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
.comment-logo {
  display: block;
  width: 30px;
}
.comment-logo img {
  width: 30px;
  border-radius: 5px;
  height: auto;
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

