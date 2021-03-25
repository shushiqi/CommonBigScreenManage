import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import getInfo from './modules/getInfo'
import setInfo from './modules/setInfo'
import indexConfig from './modules/indexConfig'
import psOverview from './modules/psOverview'
import plMessage from './modules/plMessage'
import deviceMonitoring from './modules/deviceMonitoring'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    getInfo,
    setInfo,
    indexConfig,
    psOverview,
    plMessage,
    deviceMonitoring
  },
  getters,
  plugins: [persistedState()]
})

export default store
