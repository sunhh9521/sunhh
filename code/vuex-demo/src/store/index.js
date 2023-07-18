import Vue from 'vue'
import Vuex from 'vuex'
import counter from './module/Counter'
import userInfo from './module/UserInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    counter,
    userInfo
  }
})
