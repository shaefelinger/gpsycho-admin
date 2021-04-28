<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-dark text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-uppercase text-grey-5">
          Germanpsycho
          <span class="text-weight-light">Admin</span>
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />
        <q-btn
          v-else
          @click="logoutUser"
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="loggedIn"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <!-- <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list> -->

      <q-item-label
        header
        class="text-grey-8"
      > Menü </q-item-label>

      <q-list padding>

        <q-item
          clickable
          to="/"
          exact
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="flutter_dash" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item
          clickable
          to="/kommentare"
          exact
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="grading" />
          </q-item-section>
          <q-item-section>Kommentare</q-item-section>
        </q-item>

        <q-item
          clickable
          to="/newtext"
          exact
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="grading" />
          </q-item-section>
          <q-item-section>Neuer Text</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  // components: { CommentLayout },
  data () {
    return {
      leftDrawerOpen: false
      // essentialLinks: linksData
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  }
}
</script>
