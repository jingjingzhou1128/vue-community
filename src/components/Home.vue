<template>
  <div class="main-container panel panel-grey">
    <div class="panel-header" style="padding: 0;">
      <ul class="article-type">
        <li v-for="(type, index) in types" :key="index" :class="{ active: activeTab === type.name }" @click="changeTab(type.name)">
          <router-link :to="{path: '/', query: {tab: type.name}}">{{ type.shown }}</router-link>
        </li>
      </ul>
    </div>
    <div class="panel-body article-list" style="padding: 0;" v-loading="loading">
      <article-summary v-for="summary in articleList" :key="summary.id" :article="summary" :showTab="isShowTab"></article-summary>
    </div>
  </div>
</template>

<script>
  import ArticleSummary from '@/components/ArticleSummary'
  export default {
    name: 'Home',
    data(){
      return {
        types: [
          { name: 'all', shown: '全部'},
          { name: 'good', shown: '精华'},
          { name: 'weex', shown: 'weex'},
          { name: 'share', shown: '分享'},
          { name: 'ask', shown: '问答'},
          { name: 'job', shown: '招聘'},
        ],
        articleList: null,
        loading: true
      }
    },
    computed: {
      activeTab: function(){
        return this.$route.query.tab ? this.$route.query.tab : 'all'
      },
      isShowTab: function(){
        return ['all', 'good'].find(value => value === this.activeTab) ? true : false
      }
    },
    methods: {
      getData(tab){
        this.loading = true
        this.$http.get('https://www.vue-js.com/api/v1/topics', {
          params: { page: 1, limit: 20, tab: tab}
        }).then((response) => {
          this.articleList = response.data.data
          this.loading = false
          console.log(response.data.data)
        }).catch(function(error){
          console.log(error)
        })
      },
      changeTab(tab){
        this.getData(tab)
      }
    },
    components: { ArticleSummary },
    watch: {
      '$route'(to, from){
        this.getData(to.query.tab ? to.query.tab : 'all')
      }
    },
    beforeMount() {
      let tab = this.$route.query.tab ? this.$route.query.tab : 'all'
      this.getData(tab);
    }
  }
</script>

<style>
.el-loading-parent--relative {
  min-height: 200px;
}
  .main-container {
    width: 100%;
  }
  .article-type {
    list-style: none;
    background: #f6f6f6;
    padding: 10px 15px;
    text-align: left;
    font-size: 14px;
    margin: 0;
    border-radius: 5px;
  }
  .article-type > li {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 3px;
  }
  .article-type > li > a {
    color: #369219;
    text-decoration: none;
  }
  .article-type > li + li {
    margin-left: 10px;
  }
  .article-type > li.active {
    background: #369219;
  }
  .article-type > li.active > a {
    color: #fff;
  }
</style>