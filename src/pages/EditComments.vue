<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
        <!-- <p>{{ comments }}</p> -->
    </q-card>

    <div></div>

    <div
      class="q-pa-md"
      style="width: 550px"
      v-for="comment in comments"
      :key="comment.createtAt"
    >
      <q-list bordered padding>
        <q-item>
          <q-item-section>
             <q-item-label class="q-mb-md">
              {{ comment.reference }}
            </q-item-label>
            <q-item-label overline class="text-grey-8">
              <div>
                {{
                  comment.createdAt.toDate().toLocaleDateString("de", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })
                }}
                {{
                  comment.createdAt.toDate().toLocaleTimeString(["de"], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                }}
              </div>
            </q-item-label>
            <q-item-label class="text-amber">{{ comment.name }}</q-item-label>
            <q-item-label>{{ comment.comment }}</q-item-label>
          </q-item-section>

          <q-item-section side top>

            <q-item-label caption>
              {{ comment.email }}
            </q-item-label>
            <div class="q-mt-lg">
              <q-btn
                color="negative"
                outline
                stack
                icon-right="delete"
                label=""
                @click="onClick"
              />
              <q-btn
                color="positive"
                outline
                stack
                icon-right="thumb_up"
                label=""
                @click="onClick"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced />
      </q-list>
    </div>
  </div>
</template>

<script>
import { db } from '../boot/firebaseBoot'

export default {
  name: 'EditComments',
  data () {
    return {
      comments: ['lklkj']
    }
  },
  firestore () {
    return {
      comments: db.collection('comments').orderBy('createdAt', 'desc')
    }
  }
}
</script>

<style></style>
