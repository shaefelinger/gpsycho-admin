<template>
  <div class="q-pa-md q-mx-auto" style="max-width: 800px">
    <!-- {{ storeArticle.articleContent }} -->
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        ref="field1"
        outlined
        v-model="storeArticle.articleTitle"
        label="Titel"
        hint="Titel"
        class="text-h6 text-weight-bold"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Das Feld ist leer!']"
      />
      <q-input
        ref="field2"
        outlined
        v-model="storeArticle.articleTeaserText"
        label="Teaser-Text"
        hint="Teaser-Text"
        type="textarea"
        class="text-subtitle1 text-weight-bold "
        bg-color="grey-1"
        autogrow
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Das Feld ist leer!']"
      />

      <!-- <q-input
        ref="field3"
        outlined
        v-model="storeArticle.articleContent"
        label="Text"
        hint="Inhalt"
        lazy-rules
        type="textarea"
        autogrow
        class="text-body1 "
        :rules="[val => (val && val.length > 0) || 'Das Feld ist leer!']"
      /> -->

      <q-editor
        v-model="storeArticle.articleContent"
        ref="editor_ref"
        :definitions="{}"
        :toolbar="[['bold', 'italic']]"
        label="Text"
        @paste.native="evt => pasteCapture(evt)"
      />

      <q-input
        ref="field4"
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

    </q-form>
    <div
      :style="`background-color: ${storeArticle.articleColor};`"
      class="q-py-lg q-px-xl q-mt-lg"
    >
      <h5 class="text-subtitle2 ">{{ storeArticle.articleTitle }}</h5>
      <h5 class="text-weight-bold">{{ storeArticle.articleTeaserText }}</h5>
      <!-- <v-pre class="text-body2">{{ storeArticle.articleContent }}</v-pre> -->
      <q-card-section
        v-html="storeArticle.articleContent"
        class="q-px-xs"
        sanitize="true"
      />
    </div>
  </div>
</template>

<script>
import { db } from '../boot/firebaseBoot'

export default {
  data () {
    return {
      articleTitle: '',
      articleTeaserText: '',
      articleContent: '',
      articleColor: '#F89476'
    }
  },
  methods: {
    pasteCapture (evt) {
      if (evt.target.nodeName === 'INPUT') return
      let text, onPasteStripFormattingIEPaste
      evt.preventDefault()
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true
          this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
        }
        onPasteStripFormattingIEPaste = false
      }
    },
    resetValidation () {
      this.$refs.field1.resetValidation()
      this.$refs.field2.resetValidation()
      // this.$refs.field3.resetValidation()
      this.$refs.field4.resetValidation()
    },
    async onSubmit () {
      // alert('submit')
      console.log(typeof this.storeArticle.articleContent)
      const newArticle = {
        title: this.storeArticle.articleTitle,
        teaserText: this.storeArticle.articleTeaserText,
        articleContent: this.storeArticle.articleContent,
        articleColor: this.storeArticle.articleColor
      }
      try {
        await db.collection('Texte').add(newArticle)
        this.$store.dispatch('firebaseStore/clearNewArticle')
        this.$q.notify({
          message: 'Text gespeichert',
          color: 'positive',
          position: ''
        })
        this.resetValidation()
      } catch (err) {
        alert(err)
        console.log('💣', err)
      }
    },
    onReset () {
      // alert('rest')
      this.$q
        .dialog({
          title: 'Reset',
          message: 'Willst Du wirklich das komplette Formular zurücksetzen?',
          cancel: true,
          persistent: true,
          transitionShow: 'none',
          transitionHide: 'none'
        })
        .onOk(() => {
          // console.log('>>>> OK')
          // this.$q.notify('Task deleted')
          this.$store.dispatch('firebaseStore/clearNewArticle')
        })
      // this.$q.notify('Task deleted')
      // this.confirm = true
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
