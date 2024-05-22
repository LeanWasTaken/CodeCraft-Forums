<template>
  <v-container>
    <v-card class="interactions-card" rounded="lg">
      <v-tabs v-model="tab" grow>
        <v-tab value="1">{{ $t('profile-button-bar.posts') }}</v-tab>
        <v-tab value="2">{{ $t('profile-button-bar.replies') }}</v-tab>
        <v-tab value="3">{{ $t('profile-button-bar.likes') }}</v-tab>
      </v-tabs>

      <v-card-text>
        <v-btn @click="fetchPosts">fetch posts</v-btn>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="1">
            
            <PostCard
              v-for="post in posts"
              :key="post.id"
              :name="post.author.fullname"
              :username="post.author.username"
              avatar="username"
              :title="post.title"
              :content="post.content"
              class="mb-4"
            />
          </v-tabs-window-item>

          <v-tabs-window-item value="2"> Two </v-tabs-window-item>

          <v-tabs-window-item value="3"> Three </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const tab = ref('1');
const posts = ref([])

const authStore = useAuthStore();

const fetchPosts = async () => {

  const userId = authStore.getUserId

  try {
    const response = await axios.get('http://localhost:8008/api/posts/', { params : {
      userId: userId
    }});
    posts.value = response.data
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

onMounted(fetchPosts)
</script>
