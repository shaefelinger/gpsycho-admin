<template>
  <form @submit.prevent="submitForm">
    <p>test</p>
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon
            name="account_circle"
            color="primary"
          />
        </template>
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        outlined
        v-model="formData.email"
        label="Email"
        ref="email"
        stack-label
        lazy-rules
        :rules="[
          val => isValidEmailAddress(val) || 'Please enter valid Email-Address'
        ]"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        outlined
        type="password"
        ref="password"
        v-model="formData.password"
        label="Password"
        stack-label
        lazy-rules
        :rules="[
          val => val.length >= 6 || 'Please enter at least 6 characters'
        ]"
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn
        type="submit"
        color="primary"
        :label="tab"
      />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  props: ['tab'],
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    isValidEmailAddress (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    submitForm () {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab === 'login') {
          this.loginUser(this.formData)
        } else {
          this.registerUser(this.formData)
        }
      }
    }
  },
  filters: {
    titleCase (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style></style>
