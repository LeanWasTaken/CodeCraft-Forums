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
      <div class="comment-content mx-4" v-html="comment.content" />
      <v-card-actions class="comment-actions">
        <v-btn class="reply" @click="showAddReply()" prepend-icon="mdi-message-reply-outline">Reply</v-btn>
        <v-btn class="like" @click="like" prepend-icon="mdi-heart-outline">Like</v-btn>
      </v-card-actions>
      <AddCommentReply :parentId="comment.commentId" :postId="comment.postId" v-if="showReplyCard" @close="showReplyCard = false"><v-btn @click="showAddReply()">Cancel</v-btn></AddCommentReply>
    </v-card>
    
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';

import AddCommentReply from '@/components/comments/AddCommentReply.vue';

const router = useRouter()

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

const showReplyCard = ref(false)

const showAddReply = () => {
  console.log("Showing reply card")

  if(!authStore.isAuthenticated) {
    router.push('/auth/login')
  } else {
    if(showReplyCard.value == false) {
    showReplyCard.value = true
  } else {
    showReplyCard.value = false
  }
  }
}


const comment = defineProps({
  commentId: String,
  postId: String,
  name: String,
  username: String,
  avatar: String,
  content: String,
});

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
