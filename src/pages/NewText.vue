<template>
  <div class="q-pa-md q-mx-auto" style="max-width: 800px">
    <!-- {{ storeArticle }} -->
    <q-form @submit="onSubmit" @reset="confirm = true" class="q-gutter-md">
      <q-input
        outlined
        v-model="storeArticle.articleTitle"
        label="Titel"
        hint="Titel"
        lazy-rules
        class="text-h6 text-weight-bold"
        :rules="[val => (val && val.length > 0) || 'Das Feld ist leer!']"
      />
      <q-input
        outlined
        v-model="storeArticle.articleTeaserText"
        label="Teaser-Text"
        hint="Teaser-Text"
        lazy-rules
        type="textarea"
        class="text-subtitle1 text-weight-bold "
        bg-color="grey-1"
        autogrow
        :rules="[val => (val && val.length > 0) || 'Das Feld ist leer!']"
      />
      <q-input
        outlined
        v-model="storeArticle.articleContent"
        label="Text"
        hint="Inhalt"
        lazy-rules
        type="textarea"
        autogrow
        class="text-body1 "
        :rules="[val => (val && val.length > 0) || 'Das Feld ist leer!']"
      />

      <!-- <q-input
        filled
        v-model="articleTeaserText"
        label="Teaser Text"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Please type your age',
          val => (val > 0 && val < 100) || 'Please type a real age'
        ]"
      /> -->
      <!-- <q-editor
        :toolbar="[['bold', 'italic']]"
        v-model="articleTeaserText"
        min-height="5rem"
        class="text-body1"
      />

      <q-editor
        :toolbar="[['bold', 'italic']]"
        v-model="articleContent"
        min-height="10rem"
        class="text-body2"
      /> -->

      <q-input
        filled
        v-model="storeArticle.articleColor"
        :rules="['anyColor']"
        hint="Hintergrundfarbe"
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color
                v-model="storeArticle.articleColor"
                default-view="palette"
                :palette="[
                  '#F89476',
                  '#B8D977',
                  '#E8045A',
                  '#B2028A',
                  '#2A0449',
                  '#019A9D'
                ]"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="signal_wifi_off"
              color="primary"
              text-color="white"
            />
            <span class="q-ml-sm"
              >Willst Du wirklich das komplette Formular zurücksetzen?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              @click="onReset"
              flat
              label="Ja"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
    <div
      :style="`background-color: ${storeArticle.articleColor};`"
      class="q-py-lg q-px-xl q-mt-lg"
    >
      <h5 class="text-subtitle2 ">{{ storeArticle.articleTitle }}</h5>
      <h5 class="text-weight-bold">{{ storeArticle.articleTeaserText }}</h5>
      <p class="text-body2">{{ storeArticle.articleContent }}</p>
    </div>
  </div>
</template>

<script>
import { db } from '../boot/firebaseBoot'

export default {
  data () {
    return {
      // articleTitle: '',
      // articleTeaserText: '',
      // articleContent: '',
      // articleColor: '#F89476'

      confirm: false
    }
  },
  methods: {
    async onSubmit () {
      // alert('submit')
      console.log(this.storeArticle)
      const newArticle = {
        title: this.storeArticle.articleTitle,
        teaserText: this.storeArticle.articleTeaserText,
        articleContent: this.storeArticle.articleContent,
        articleColor: this.storeArticle.articleColor
      }
      try {
        await db.collection('Texte').add(newArticle)
      } catch (err) {
        console.log(err)
      }
    },
    onReset () {
      this.confirm = true
      this.$store.dispatch('firebaseStore/clearNewArticle')
    }
  },
  computed: {
    storeArticle () {
      return this.$store.state.firebaseStore.newArticle
      // return this.$store.firebaseStore.getters.getNewArticle
      // return this.$store.getters.getNewArticle
    }
  }
}
</script>

<style scoped></style>
