<template>
    <div class="comment">
      <v-card
        class="py-2"
        color="surface-variant"
        rel="noopener noreferrer"
        rounded="lg"
        border="sm"
        :subtitle="postContent.username"
        target="_blank"
        :title="postContent.name"
        variant="text"
      >
        <template v-slot:prepend>
          <v-avatar size="48">
            <v-img :alt="postContent.name" :src="postContent.avatar"></v-img>
          </v-avatar>
        </template>
        <v-card-title class="post-title">{{ postContent.title }}</v-card-title>
        <div class="comment-content mx-4" v-html="postContent.content" />
        <v-card-actions class="comment-actions">
          <v-btn class="reply" @click="reply" prepend-icon="mdi-message-reply-outline">Reply</v-btn>
          <v-btn class="like" @click="like" prepend-icon="mdi-heart-outline">Like</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const postContent = defineProps({
    name: String,
    username: String,
    avatar: String,
    title: String,
    content: String
  })
  
  const comment = ref({
    name: 'Andris Kalniņš',
    username: '@andrisk',
    avatar: 'https://cdn.vuetifyjs.com/images/john.png',
    content: '<p>Comment content</p>',
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
  