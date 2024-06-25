<template>
  <div class="todays-feed">
    <h1>Today's Feed</h1>
    <div v-for="post in posts" :key="post.id">
      <PostCard
        class="post-card"
        :name="post.author.fullname"
        :username="post.author.username"
        :avatar="post.author.avatar || 'default-avatar.png'"
        :title="post.title"
        :content="post.content"
      />
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div>Nothing more to show..</div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
import PostCard from '@/components/posts/PostCard.vue';

  const posts = ref([]);
  const skip = ref(0);
  const take = ref(5);
  const loading = ref(false);
  const allLoaded = ref(false);

  const fetchPosts = async () => {
    if (loading.value || allLoaded.value) return;

    loading.value = true;
    try {
      const response = await axios.get('http://localhost:8008/api/posts/latest', {
        params: {
          skip: skip.value,
          take: take.value,
        },
      });
      const newPosts = response.data;
      console.log(response)
      if (newPosts.length < take.value) {
        allLoaded.value = true;
      }
      posts.value = [...posts.value, ...newPosts];
      skip.value += take.value;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      fetchPosts();
    }
  };

  onMounted(() => {
    fetchPosts();
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style scoped>
.post-card {
  margin-bottom: 12px
}
.todays-feed {
  padding: 20px;
}
.loading {
  text-align: center;
  padding: 10px;
}
</style>
