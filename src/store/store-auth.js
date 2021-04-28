import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'src/boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false
}

const mutations = {
  SET_LOGGED_IN (state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser ({ }, payload) {
    Loading.show()
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response:', response)
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  loginUser ({ }, payload) {
    console.log('login')

    Loading.show()
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response:', response)
      })
      .catch(error => {
        showErrorMessage(error.message)
      })
  },
  logoutUser () {
    console.log('😎logout')
    firebaseAuth.signOut()
  },
  handleAuthStateChange (context) {
    firebaseAuth.onAuthStateChanged(user => {
      console.log('😎authstate changed')
      Loading.hide()
      if (user) {
        context.commit('SET_LOGGED_IN', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => {
          console.log(err)
        })
      } else {
        context.commit('SET_LOGGED_IN', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(err => {
          console.log(err)
        })
      }
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
