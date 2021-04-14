<template>
  <div class="q-pa-md q-mx-auto" style="max-width: 800px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        outlined
        v-model="articleTitle"
        label="Titel"
        hint="Titel"
        lazy-rules
        class="text-h6 text-weight-bold"
        :rules="[val => (val && val.length > 0) || 'Das Feld ist leer!']"
      />
      <q-input
        outlined
        v-model="articleTeaserText"
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
        v-model="articleContent"
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
        v-model="articleColor"
        :rules="['anyColor']"
        hint="Hintergrundfarbe"
        class="my-input"
      >
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color
                v-model="articleColor"
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
      :style="`background-color: ${articleColor};`"
      class="q-py-lg q-px-xl q-mt-lg"
    >
      <h5 class="text-subtitle2 ">{{ articleTitle }}</h5>
      <h5 class="text-weight-bold">{{ articleTeaserText }}</h5>
      <p class="text-body2">{{ articleContent }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleTitle: '',
      articleTeaserText: '',
      articleContent: ' ',
      articleColor: '#F89476'
    }
  }
}
</script>

<style scoped></style>
