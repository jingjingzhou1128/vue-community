import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ArticleDetail from '@/components/ArticleDetail'
import User from '@/components/User'
import UserBrief from '@/components/UserBrief'
import UserHome from '@/components/UserHome'
import UserTopics from '@/components/UserTopics'
import Login from '@/components/Login'
import TopicHome from '@/components/TopicHome'
import TopicRule from '@/components/TopicRule'
import TopicCreate from '@/components/TopicCreate'

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
      path: '/login',
      name: 'login',
      components: {
        main: Login
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
    },
    {
      path: '/topic',
      name: 'topic',
      components: {
        main: TopicHome,
        sidebar: TopicRule
      },
      children: [
        {
          path: 'create',
          name: 'topic-create',
          components: {
            topic: TopicCreate
          }
        }
      ]
    }
  ]
})
