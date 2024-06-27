<template>
  <div class="post-view">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="my-4"
    ></v-progress-circular>

    <PostCard
      class="mb-4"
      v-if="post"
      :id="post.id"
      :name="post.author.fullname"
      :username="post.author.username"
      :avatar="post.author.avatar_url"
      :title="post.title"
      :content="post.content"
    />

    <h2>Komentāri</h2>

    <div v-if="comments.length">
      <template v-for="comment in topLevelComments" :key="comment.id">
        <div class="mb-4" style="background-color: rgb(250, 250, 250);">
        <CommentCard
          :commentId="comment.id"
          :postId="post.id"
          :name="comment.author.fullname"
          :username="comment.author.username"
          :avatar="comment.author.avatar_url"
          :content="comment.content"
          class="mb-4"
          
          
        />
        <template v-for="reply in getReplies(comment.id)" :key="reply.id">
          
          <CommentCard
            :commentId="reply.id"
            :postId="post.id"
            :name="reply.author.fullname"
            :username="reply.author.username"
            :avatar="reply.author.avatar_url"
            :content="reply.content"
            class="ml-4 mb-4"
          />
        </template>
      </div>
      </template>
      
    </div>

    <div v-else class="end-of-feed">
      No comments to load.
      <span style="cursor: pointer" @click="scrollToTop">Back to top</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import PostCard from '@/components/posts/PostCard.vue';
import CommentCard from '@/components/comments/CommentCard.vue';

const route = useRoute();
const postId = route.params.postId;

const post = ref(null);
const comments = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPostAndComments = async () => {
  try {
    const [postResponse, commentsResponse] = await Promise.all([
      axios.get(`http://localhost:8008/api/posts/${postId}`),
      axios.get(`http://localhost:8008/api/comments/${postId}`)
    ]);

    console.log(commentsResponse.data)
    if (postResponse.data) {
      post.value = postResponse.data;
      
    } else {
      error.value = 'Post not found';
    }

    comments.value = commentsResponse.data;
  } catch (err) {
    console.error('Error fetching post or comments:', err);
    error.value = 'Failed to fetch post or comments';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPostAndComments();
});

const topLevelComments = computed(() => {
  return comments.value.filter(comment => comment.parentId === null);
});

const getReplies = (parentId) => {
  return comments.value.filter(comment => comment.parentId === parentId);
};


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

</script>

<style scoped>
.post-view {
  padding: 20px;
}
.loading,
.error {
  text-align: center;
  padding: 10px;
  color: red;
}
.end-of-feed {
  text-align: center;
  padding: 10px;
  color: grey;
  cursor: pointer;
}
.end-of-feed span {
  text-decoration: underline;
}
</style>