import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ArticleDetail from '@/components/ArticleDetail'
import User from '@/components/User'
import UserBrief from '@/components/UserBrief'
import UserHome from '@/components/UserHome'
import UserTopics from '@/components/UserTopics'

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
      path: '/article/:id/:loginname',
      name: 'article',
      components: {
        main: ArticleDetail,
        sidebar: UserBrief
      }
    },
    {
      path: '/user/:loginname',
      name: 'user',
      components: {
        main: User,
        sidebar: UserBrief
      },
      children: [
        {
          path: '',
          name: 'user-home',
          components: {
            home: UserHome
          }
        },
        {
          path: 'topics',
          name: 'user-topics',
          components: {
            home: UserTopics
          }
        },
        {
          path: 'replies',
          name: 'user-replies',
          components: {
            home: UserTopics
          }
        }
      ]
    }
  ]
})
