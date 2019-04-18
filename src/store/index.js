import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'
import app from './modules/app'
import permission from './modules/permission'

import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    app,
    permission
  },
  plugins: [
    saveInLocal
  ]
})

export default store
