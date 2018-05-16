<template>
  <div class="main-container">
    <ul class="article-type">
      <li v-for="(type, index) in types" :key="index" :class="{ active: activeTab === type.name }" @click="changeTab(type.name)">
        <router-link :to="{path: '/', query: {tab: type.name}}">{{ type.shown }}</router-link>
      </li>
    </ul>
    <div class="article-list">
      <article-summary v-for="summary in articleList" :key="summary.id" :article="summary" :showTab="isShowTab"></article-summary>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
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
        articleList: null
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
        axios.get('https://www.vue-js.com/api/v1/topics', {
          params: { page: 1, limit: 20, tab: tab}
        }).then((response) => {
          this.articleList = response.data.data
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
    beforeMount() {
      let tab = this.$route.query.tab ? this.$route.query.tab : 'all'
      this.getData(tab);
    }
  }
</script>

<style>
  .main-container {
    min-width: 960px;
    max-width: 1400px;
    width: 100%;
    background: #fff;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 5px;
  }
  .article-type {
    list-style: none;
    background: #f6f6f6;
    padding: 10px;
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