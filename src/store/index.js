import Vue from 'Vue'
import Vuex from 'Vuex'

import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

Vue.use(Vuex)

const state = {
  loginName: localStorage.loginName || ''
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})