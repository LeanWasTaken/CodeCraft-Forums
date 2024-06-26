<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="1440">
      <div class="text-center">
        <div class="text-body-1 font-weight-medium mb-n1">{{ $t('home.welcome') }}</div>

        <h3 class="text-h2 font-weight-bold">
          <span style="color: var(--blue-text)">Code</span>
          <span style="color: var(--yellow-text)">Craft</span>
        </h3>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="5">
          <v-card
            class="py-4"
            rel="noopener noreferrer"
            rounded="lg"
            variant="text"
          >
            <v-img cover src="/group.png"></v-img>
          </v-card>
        </v-col>

        <v-col cols="7">
          <v-card
            class="py-4"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            variant="text"
          >
            <v-card-title class="text-center"
              >{{ $t('home.happening') }}</v-card-title
            >
            <div class="my-5" />

            <div v-if="loading == false" class="pa-4">
              <PostCard
              :id="post.id"
              :name="post.author.fullname"
              :username="post.author.username"
              :avatar="post.author.avatar_url"
              :title="post.title"
              :content="post.content"
              dont_show />
            </div>  
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import PostCard from '@/components/posts/PostCard.vue';

let post = ref([])
const loading = ref(false);

const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://localhost:8008/api/posts/latest');
    post.value = response.data;
    console.log(post)
    loading.value = false
  } catch (error) {
    loading.value = true;
  } finally {
    loading.value = false;
  }
};

if(loading.value == false) {
  fetchPosts()
}
</script>
