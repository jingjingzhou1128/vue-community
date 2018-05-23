<template>
  <div class="topic-create">
    <div class="panel panel-grey">
      <div class="panel-header" style="padding: 0;">
        <ul class="breadcrumbs">
          <li><router-link :to="{name: 'home'}">主页</router-link></li>
          <li><a href="javascript:;">发布话题</a></li>
        </ul>
      </div>
      <div class="panel-body">
        <div class="form-group form-group-inline">
          <label>选择板块:</label>
          <select id="tab" name="tab" v-model="tab">
            <option>请选择</option>
            <option vlaue="share">分享</option>
            <option vlaue="ask">问答</option>
            <option vlaue="job">招聘</option>
          </select>
        </div>
        <div class="form-group form-group-block">
          <input type="text" name="title" id="title" v-model="title" placeholder="请输入标题">
        </div>
        <div class="form-group form-group-block">
          <textarea type="text" name="content" id="content" v-model="content" rows="20" style="resize: none;"></textarea>
        </div>
        <button class="btn btn-success" @click="publishTopic">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TopicCreate',
  data(){
    return {
      tab: '请选择',
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'accesstoken'
    ])
  },
  methods: {
    publishTopic(){
      let tab = ''
      if(this.tab === '分享') {
        tab = 'share'
      }else if (this.tab === '问答') {
        tab = 'ask'
      }else if(this.tab === '招聘'){
        tab = 'job'
      }
      if(!tab || !this.title.trim() || !this.content.trim()) return false
      this.$http.post('https://www.vue-js.com/api/v1/topics', {
        accesstoken: this.accesstoken.trim(),
        title: this.title.trim(),
        tab: tab,
        content: this.content
      }).then(response => {
        console.log(response)
        if(response.data.topic_id) {
          this.$router.push({name: 'article', params: {id: response.data.topic_id, loginname: this.user.loginname}})
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
