import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ArticleDetail from '@/components/ArticleDetail'
import ArticleAuthor from '@/components/ArticleAuthor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        main: Home
      }
    },
    {
      path: '/article/:id',
      name: 'article',
      components: {
        main: ArticleDetail,
        sidebar: ArticleAuthor
      }
    }
  ]
})
