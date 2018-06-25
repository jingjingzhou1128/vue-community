<template>
  <div class="reply panel panel-grey">
    <div class="panel-header" style="padding: 3px 15px;">
      <h4 class="panel-title">添加回复</h4>
    </div>
    <div class="panel-body">
      <div class="form-group form-group-block">
        <textarea type="text" name="content" style="resize: none;" v-model="content"></textarea>
      </div>
      <button class="btn btn-primary" @click="publishReply">回复</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommentReply',
  props: ['topicId', 'replyId'],
  data(){
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters({
      accesstoken: 'accesstoken',
      loginUser: 'user'
    })
  },
  methods: {
    publishReply(){
      if(!this.content.trim()) return
      let topicId = this.topicId
      this.$http.post(`https://www.vue-js.com/api/v1/topic/${topicId}/replies`, {
        accesstoken: this.accesstoken,
        content: this.content.trim()
      }).then(response => {
        console.log(response)
        if(response.data.success) this.content = ''
        this.$router.push({name: 'article', params: {id: this.topicId, loginname: this.loginUser.loginname}})
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
}
</script>

<style>

</style>
