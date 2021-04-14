import { firestoreAction } from 'vuexfire'
import { db } from '../boot/firebaseBoot'

const namespaced = true

const state = {
  newArticle: {
    articleTitle: null,
    articleTeaserText: null,
    articleContent: null,
    articleColor: '#F89476'
  }
}

const mutations = {
  SET_NEW_ARTICLE: (state, payload) => {
    state.newArticle.articleTitle = payload.articleTitle
    state.newArticle.articleTeaserText = payload.articleTeaserText
    state.newArticle.articleContent = payload.articleContent
    state.newArticle.articleColor = payload.articleColor
  },
  CLEAR_NEW_ARTICLE: state => {
    state.newArticle.articleTitle = null
    state.newArticle.articleTeaserText = null
    state.newArticle.articleContent = null
    state.newArticle.articleColor = '#F89476'
  }
}

const actions = {
  setNewArticle (context, articleData) {
    context.commit('SET_NEW_ARTICLE', articleData)
  },
  clearNewArticle (context, articleData) {
    context.commit('CLEAR_NEW_ARTICLE', articleData)
  },
  bindMatchesRef: firestoreAction(context => {
    return context.bindFirestoreRef(
      'matches',
      db
        .collection('users')
        .doc(context.state.id)
        .collection('matches')
    )
  })
}

const getters = {
  getNewArticle (state) {
    return 'aaaaaa'
    // return state.firebaseStore.newArticle
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
