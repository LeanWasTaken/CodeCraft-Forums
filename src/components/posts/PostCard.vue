<template>
  <div class="comment">
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
        <RouterLink :to="'/profile/view/' + props.username">
        <v-avatar size="48">
          <v-img :alt="props.name" :src="props.avatar"></v-img>
        </v-avatar>
      </RouterLink>
      </template>
      <v-card-title class="post-title">{{ props.title }}</v-card-title>
      <div class="comment-content mx-4" v-html="props.content" />
      <v-card-actions class="comment-actions">
        <v-btn class="reply" @click="showAddReply = true" prepend-icon="mdi-message-reply-outline">Reply</v-btn>
        <v-btn class="like" @click="like" prepend-icon="mdi-heart-outline">Like</v-btn>
      </v-card-actions>
      <AddReply :id="props.id" v-if="showAddReply" @close="showAddReply = false"><v-btn @click="showAddReply = false">Cancel</v-btn></AddReply>
    </v-card>
    
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import AddReply from '@/components/posts/AddReply.vue'

const showAddReply = ref(false)

const props = defineProps({
  id: String,
  name: String,
  username: String,
  avatar: String,
  title: String,
  content: String
});

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
