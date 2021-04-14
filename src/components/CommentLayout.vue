<template>
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
</template>

<script>
export default {
  props: ['comment'],
  methods: {
    deleteComment (comment) {
      this.$emit('deleteCommentEmit')
    },
    commentIsApproved (comment) {
      this.$emit('commentIsApprovedEmit')
    }
  }
}
</script>

<style></style>
