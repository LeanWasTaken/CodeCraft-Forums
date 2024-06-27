<template>
  <v-container>
    <v-card class="interactions-card" rounded="lg">
      <v-tabs v-model="tab" grow>
        <v-tab value="1">{{ $t('profile-button-bar.posts') }}</v-tab>
        <v-tab value="2">{{ $t('profile-button-bar.replies') }}</v-tab>
        <!--<v-tab value="3">{{ $t('profile-button-bar.likes') }}</v-tab>-->
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="1">
            <div v-if="posts.length > 0">
              <PostCard
              v-for="post in posts"
              :key="post.id"
              :id="post.id"
              :name="post.author.fullname"
              :username="post.author.username"
              :avatar="post.author.avatar_url"
              :title="post.title"
              :content="post.content"
              class="mb-4"
            /></div>
            <div v-else>
              <p>This user has no posts.</p>
            </div>
            
          </v-tabs-window-item>

          <v-tabs-window-item value="2">
            <div v-if="replies.length >= 1">
                <ReplyCard
                  class="mb-2"
                  v-for="reply in replies"
                  :key="reply.id"
                  :id="reply.post.id"
                  :name="reply.author.fullname"
                  :username="reply.author.username"
                  :avatar="reply.author.avatar_url"
                  :title="reply.title"
                  :subtitle="reply.post.title"
                  :content="reply.content"
                  />
            </div>
          </v-tabs-window-item>

          <!---<v-tabs-window-item value="3"> Three </v-tabs-window-item>-->
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { defineProps } from 'vue';
import PostCard from '@/components/posts/PostCard.vue';
import ReplyCard from '@/components/posts/ReplyCard.vue'

const props = defineProps({
  user: Object,
});


const tab = ref('1');
const posts = ref([]);
const replies = ref([])

const fetchPosts = async () => {
  let userId = props.user.id;
  try {
    const response = await axios.get(`http://localhost:8008/api/posts/user/${userId}`);
    posts.value = response.data;  
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const fetchReplies = async () => {
  let userId = props.user.id;
  try {
    const response = await axios.get(`http://localhost:8008/api/comments/user/${userId}`);
    replies.value = response.data
  } catch (error) {
    console.log(error)
  }
}

if(props.user){
  fetchPosts()
  fetchReplies()
}
</script>
