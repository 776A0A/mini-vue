/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
// import Vuex from 'vuex'
import Router from 'vue-router'
import App from './App.vue'
import Vuex from './modules/js/mini-vue'

Vue.use(Router)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, payload) {
      state.count++
    }
  },
  getters: {
    dblCount(state) {
      return state.count * 2;
    }
  }
})

Vue.use(Vuex)

Vue.config.productionTip = false



new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
