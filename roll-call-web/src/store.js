import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.use(Vuex)

let store = new Vuex.Store({
  base: process.env.NODE_ENV,
  mode: 'history',
  state: {
    profile: {}
  },
  getters: {
    getProfile: (state) => {
      return state.profile
    },
    getUser: (state) => {
      return state.profile.user
    },
    checkLogined: (state) => {
      let logined = false
      if (state.profile != null) {
        logined = Object.keys(state.profile).length > 2
      }
      return logined
    }
  },
  mutations: {
    setProfile: (state, profile) => {
      state.profile = profile
    },
    clearProfile: (state) => {
      state.profile = {}
    },
    setUser: (state, user) => {
      state.profile.user = user
    }
  },
  actions: {
    UserLogin () {
      return
    }
  }
})

export default store
