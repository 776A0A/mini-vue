/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Vue from 'vue'

// 简易版vuex
class Store {
  constructor(options = {}) {
    const { state = {}, mutations = {}, getters = {} } = options;
    this._mutations = mutations;
    this.init(state, getters);
  }

  commit (type, payload) {
    if (this._mutations[type]) {
      this._mutations[type](this.state, payload)
    }
  }

  init (state, getters) {

    const { commit } = this;

    const store = this;

    store.commit = function boundCommit (type, payload) {
      return commit.call(store, type, payload)
    }

    const computed = {}

    store.getters = {}

    Object.keys(getters).forEach(fnName => {

      computed[fnName] = store.partial(getters[fnName], state, store.getters); // 柯里化后的getter函数

      Object.defineProperty(store.getters, fnName, {
        get: () => store._vm[fnName], // 绑定vue实例上的computed属性
        enumerable: true
      })

    })

    this._vm = new Vue({
      data: {
        $$state: state
      },
      computed
    })

  }
  // 柯里化函数，把getters中的函数绑定state
  partial (fn, ...args) {
    return function () {
      return fn.call(this, ...args)
    }
  }

  get state () {
    return this._vm._data.$$state
  }

}

// 全局混入
function install (_Vue) {
  if (_Vue && _Vue === Vue) {
    _Vue.mixin({ beforeCreate: vuexInit })
  }
}

// 初始化每个vue实例的this.$store
function vuexInit () {
  const options = this.$options;
  if (options.store) {
    this.$store = options.store;
  } else {
    this.$store = options.parent && options.parent.$options.store;
  }
}

export default { Store, install }