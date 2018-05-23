import { SET_USER_INFO, SET_AK } from './mutation-types'

export const actions = {
  setUserInfo: ({commit}, ...args) => commit(SET_USER_INFO, ...args),
  setAk: ({commit}, ...args) => commit(SET_AK, ...args)
}