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
        <!-- <p class="error-info" v-if="errorInfo">{{ errorInfo }}</p> -->
        <alert :content="errorInfo" v-if="errorInfo" @hidden="handleClose" type="error"></alert>
        <div class="form-group form-group-inline" :class="{ 'error': tabIsError }">
          <label>选择板块:</label>
          <select id="tab" name="tab" v-model="tab">
            <option>请选择</option>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
          </select>
        </div>
        <div class="form-group form-group-block" :class="{ 'error': titleIsError }">
          <input type="text" name="title" id="title" v-model="title" placeholder="请输入标题">
        </div>
        <div class="form-group form-group-block" :class="{ 'error': contentIsError }">
          <textarea type="text" name="content" id="content" v-model="content" rows="20" style="resize: none;"></textarea>
        </div>
        <button class="btn btn-success" @click="publishTopic">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert'
export default {
  name: 'TopicCreate',
  data(){
    return {
      tab: '请选择',
      title: '',
      content: '',
      tabIsError: false,
      titleIsError: false,
      contentIsError: false,
      errorInfo: ''
      // tab: {
      //   value: '请选择',
      //   isError: 'false'
      // },
      // title: {
      //   value: '',
      //   isError: false
      // },
      // content: {
      //   value: '',
      //   isError: false
      // }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'accesstoken'
    ])
  },
  methods: {
    formIsVaild(){
      let tabs = ['share', 'ask', 'job']
      let _this = this
      if (!tabs.find((val) => val=== _this.tab)) _this.tabIsError = true
      if (_this.title.trim().length < 10) _this.titleIsError = true
      if (!_this.content.trim()) _this.contentIsError = true
      if (_this.tabIsError || _this.titleIsError || _this.contentIsError) return false
      return true
    },
    publishTopic(){
      if(!this.formIsVaild()) return false
      let tab = this.tab
      // if(!tab || !this.title.trim() || !this.content.trim()) return false
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
        this.errorInfo = "创建话题失败！"
      })
    },
    handleClose(){
      this.errorInfo = ""
    }
  },
  watch: {
    tab: function(){
      let tabs = ['share', 'ask', 'job']
      if (!tabs.find((val) => val === this.tab)){
        this.tabIsError = true
      }else {
        this.tabIsError = false
      }
    },
    title: function(){
      if (this.title.trim().length < 10){
        this.titleIsError = true
      }else {
        this.titleIsError = false
      }
    },
    content: function(){
      if (!this.content.trim()){
        this.contentIsError = true
      }else {
        this.contentIsError = false
      }
    }
  },
  components: { Alert }
}
</script>

<style>
  
</style>
