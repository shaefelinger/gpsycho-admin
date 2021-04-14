import { firestoreAction } from 'vuexfire'
import { db } from '../boot/firebaseBoot'

const namespaced = true

const state = {
  id: null,
  name: null,
  email: null
}

const mutations = {
  SET_USER_DATA: (state, payload) => {
    state.id = payload.id
    state.name = payload.name
    state.email = payload.email
  },
  CLEAR_USER_DATA: state => {
    state.id = null
    state.name = null
    state.email = null
  }

}

const actions = {
  setUserData (context, userData) {
    context.commit('SET_USER_DATA', userData)
  },
  clearUserData (context, userData) {
    context.commit('CLEAR_USER_DATA', userData)
  }
}

const getters = {}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
