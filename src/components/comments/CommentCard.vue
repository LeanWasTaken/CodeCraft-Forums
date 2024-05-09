<template>
  <div class="comment">
    <v-card
      class="py-2"
      color="surface-variant"
      rel="noopener noreferrer"
      rounded="lg"
      border="sm"
      :subtitle="comment.username"
      target="_blank"
      :title="comment.name"
      variant="text"
    >
      <template v-slot:prepend>
        <v-avatar size="48">
          <v-img :alt="comment.name" :src="comment.avatar"></v-img>
        </v-avatar>
      </template>
      <v-card-text class="comment-content">{{ comment.content }}</v-card-text>
      <v-card-actions class="comment-actions">
        <v-btn class="reply" @click="reply">Reply</v-btn>
        <v-btn class="like" @click="like">Like</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const comment = ref({
  name: 'Andris Kalniņš',
  username: '@andrisk',
  avatar: 'https://cdn.vuetifyjs.com/images/john.png',
  content: 'Comment content',
});

const reply = () => {
  // Logic for reply action
};

const like = () => {
  // Logic for like action
};
</script>

<style scoped>
.comment-content {
  font-size: 18px;
}

.comment-actions {
  display: flex;
  margin: 0px;
}

.comment-actions > * {
  padding: 4px 8px;
}
</style>
