<template>
    <div class="comment">
      <v-card
        class="py-2"
        color="surface-variant"
        rel="noopener noreferrer"
        rounded="lg"
        border="sm"
        :subtitle="props.username"
        target="_blank"
        :title="props.name"
        variant="text"
        
      >
      
        <template v-slot:prepend>
          <RouterLink :to="'/profile/view/' + props.username">
          <v-avatar size="48">
            <v-img :alt="props.name" :src="props.avatar"></v-img>
          </v-avatar>
        </RouterLink>
        </template>
        <RouterLink :to="'/posts/view/' + props.id" style="cursor: pointer; color: black">
          <v-card-title class="post-title">{{ props.title }}</v-card-title>
          <v-card-subtitle>Replied to: {{ props.subtitle }}</v-card-subtitle>
          <div class="comment-content mx-4" v-html="props.content" />
        </RouterLink>
      </v-card>
      
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter()
  
  const props = defineProps({
    id: String,
    name: String,
    username: String,
    avatar: String,
    title: String,
    content: String,
    subtitle: String
  });

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
  