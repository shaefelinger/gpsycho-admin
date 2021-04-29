<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted () {
    this.handleAuthStateChange()
  }
}
</script>

// TODO: try vuex-persist plugin
// https://www.digitalocean.com/community/tutorials/vuejs-vuex-persist-state
// https://github.com/championswimmer/vuex-persist
// https://dev.to/mrbrowny/persisting-vuex-store-in-quasar-4jkm
