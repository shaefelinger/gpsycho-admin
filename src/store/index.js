import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

// import example from './module-example'
import firebaseStore from './firebaseStore'
import auth from './store-auth'

import { vuexfireMutations } from 'vuexfire'

// const vuexLocal = new VuexPersist({
//   storage: window.localStorage
// })

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      firebaseStore,
      auth
    },
    mutations: {
      ...vuexfireMutations
    }
    // plugins: [vuexLocal.plugin],

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEBUGGING
  })
  return Store
}
