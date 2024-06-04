<template>
  <div class="comment" v-hover>
    <v-card
      class="py-2"
      color="surface-variant"
      rel="noopener noreferrer"
      rounded="lg"
      border="sm"
      :subtitle="username"
      target="_blank"
      :title="name"
      variant="text"
    >
      <template v-slot:prepend>
        <v-avatar size="48">
          <v-img :alt="name" :src="avatar"></v-img>
        </v-avatar>
      </template>
      <v-card-title class="post-title">{{ title }}</v-card-title>
      <div class="comment-content mx-4" v-html="content" />
      <v-card-actions class="comment-actions">
        <v-btn class="reply" @click="reply" prepend-icon="mdi-message-reply-outline" v-hover>Reply</v-btn>
        <v-btn class="like" @click="like" prepend-icon="mdi-heart-outline" v-hover>Like</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  name: String,
  username: String,
  avatar: String,
  title: String,
  content: String
});

const reply = () => {
  // Logic for reply action
};

const like = () => {
  // Logic for like action
};
</script>

<style scoped>
.comment {
  transition: background-color 0.3s ease;
}
.comment:hover {
  background-color: rgb(238, 242, 244);
}

.comment-content {
  font-size: 18px;
}

.comment-actions {
  display: flex;
  margin: 0px;
}

.comment-actions > * {
  transition: background-color 0.3s ease;
}

.comment-actions > *:hover {
  background-color: rgba(238, 242, 244, 0.8);
}
</style>
