import { SET_USER_INFO, SET_AK } from './mutation-types'

export const mutations = {
  [SET_USER_INFO](state, data){
    state.userInfo = data
    localStorage.userInfo = JSON.stringify(data)
  },
  [SET_AK](state, data){
    state.ak = data
    localStorage.userAk = data
  }
}