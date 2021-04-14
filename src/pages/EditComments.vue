<template>
  <div class="q-pa-md  row items-start q-gutter-md">

    <div
      class="q-pa-md"
      style="width: 550px"
      v-for="comment in comments"
      :key="comment.createtAt"
    >
      <q-list bordered padding>

        <!-- <CommentLayout :comment="comment" @deleteCommentEmit="deleteComment"/> -->
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
                unelevated
                icon="delete"
                @click="deleteComment(comment)"
              />
              <q-btn
                unelevated
                color="positive"
                icon-right="thumb_up"
                @click="commentIsApproved(comment)"
              />
            </div>
          </q-item-section>
        </q-item>

      </q-list>
    </div>
  </div>
</template>

<script>
import { db } from '../boot/firebaseBoot'
// import CommentLayout from 'components/CommentLayout.vue'

export default {
  name: 'EditComments',
  components: {
    // CommentLayout
  },
  data () {
    return {
      comments: ['']
    }
  },
  methods: {
    async deleteComment (comment) {
      if (
        confirm('Bist Du sicher, dass Du diesen Kommentar löschen möchtest?')
      ) {
        try {
          await db
            .collection('comments')
            .doc(comment.id)
            .delete()
        } catch (error) {}
      }
    },
    async commentIsApproved (comment) {
      console.log(comment.id)
      try {
        await db
          .collection('comments')
          .doc(comment.id)
          .update({ approved: true })
      } catch (error) {}
    }
  },
  computed: {
    unapprovedComments () {
      return this.comments.filter((element) => {
        return element.approved === false
      })
    },
    approvedComments () {
      return this.comments.filter((element) => {
        return element.approved === true
      })
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
