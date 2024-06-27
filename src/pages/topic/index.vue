<template>
    <div class="todays-feed">
      <v-row justify="space-between" class="mb-2 mt-1 ml-1">
        <h1 id="title">{{ $t('topic.topic') }}</h1>
        <AddPost />
      </v-row>
        <v-card>
          <v-tabs
            v-model="tab"
            variant="tonal"
          >
            <v-tab value="one">Item One</v-tab>
            <v-tab value="two">Item Two</v-tab>
            <v-tab value="three">Item Three</v-tab>
          </v-tabs>
      
          <v-card-text>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="one">
                One
              </v-tabs-window-item>
      
              <v-tabs-window-item value="two">
                Two
              </v-tabs-window-item>
      
              <v-tabs-window-item value="three">
                Three
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      <div v-if="loading" class="loading">{{ $t('home.loading') }}</div>
      <div v-if="allLoaded" class="end-of-feed">{{ $t('home.no-posts') }}<span style="cursor: pointer" @click="scrollToTop">{{ $t('home.back') }}</span></div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted, onUnmounted } from 'vue';
  import PostCard from '@/components/posts/PostCard.vue';
  import AddPost from '@/components/posts/AddPost.vue';
  
  const topics = ref([]);
  const loading = ref(false);
  const allLoaded = ref(false);
  

  const fetchPosts = async () => {
    if (loading.value || allLoaded.value) return;
  
    loading.value = true;
    try {
      const response = await axios.get('http://localhost:8008/api/topics/');
      const topics = response.data;
    } catch (error) {
      allLoaded.value = true;
    } finally {
      loading.value = false;
    }
  };
  
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      fetchPosts();
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  onMounted(() => {
    fetchPosts();
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  .todays-feed {
    padding: 20px;
  }
  .loading {
    text-align: center;
    padding: 10px;
  }
  .end-of-feed {
    text-align: center;
    padding: 10px;
    color: grey;
  }
  </style>
  