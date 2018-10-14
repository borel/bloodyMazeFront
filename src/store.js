import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const PATHS = 'PATHS'

const state = {
  paths: []
}

const getters = {
  getPaths: state => state.paths
}
const mutations = {
  [PATHS] : (state, paths) => {
    state.paths = paths
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
