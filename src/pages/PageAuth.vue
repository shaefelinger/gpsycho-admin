<template>
  <q-page padding>
    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        align="justify"
        dense
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab
          name="login"
          label="Login"
        />
        <!-- <q-tab
          name="register"
          label="Register"
        />-->
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="login">
          <LoginRegister :tab="tab" />
        </q-tab-panel>

        <!-- <q-tab-panel name="register">
          <LoginRegister :tab="tab" />
        </q-tab-panel>-->
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import LoginRegister from 'components/Auth/LoginRegister.vue'

export default {
  data () {
    return {
      tab: 'login'
    }
  },
  components: {
    LoginRegister
  }
}
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
