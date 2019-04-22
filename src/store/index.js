import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'
import app from './modules/app'

import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    app,
    user
  },
  plugins: [
    saveInLocal
  ]
})

export default store
