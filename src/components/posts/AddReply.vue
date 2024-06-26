<template>
  <div class="pa-4">
      <v-card prepend-icon="mdi-lead-pencil" title="Reply">
        <v-card-text>
          <VuetifyTiptap
            class="text-field"
            v-model="content"
            markdown-theme="github"
           />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <slot />

          <v-btn
            color="primary"
            text="Submit"
            variant="tonal"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const content = ref('');
const authStore = useAuthStore();

const props = defineProps({
  id: String,
})

const handleSubmit = async () => {
  try {
    const userId = authStore.getUserId;

    if (!userId) {
      return alert('No user ID provided.');
    }

    if (!content.value) {
      return alert('Reply content is missing.');
    }

    const postData = {
      content: content.value,
      postId: props.id,
      userId: userId,
      type: 'TEXT'
    };

    const response = await axios.post('http://localhost:8008/api/comments', postData);

    if (response.status === 201) {
      alert('Reply submitted successfully.');
      content.value = '';
    } else {
      alert('Failed to submit reply.');
    }
  } catch (error) {
    console.error('Error submitting reply:', error);
    alert('Failed to submit reply: ' + error);
  }
};
</script>

<style scoped>
.avatar {
  margin-left: 30px;
  margin-top: 45px;
  border: white 5px solid;
}

.profile-info {
  margin: 10px;
}

.profile-bg {
  color: rgb(253, 241, 241);
  align-self: self-end;
  margin-bottom: 10px;
}

.edit-pic-btn {
  margin-top: 15px;
  opacity: 50%;
  color: black;
}

.edit-bg-btn {
  margin-top: 65px;
  margin-right: 200px;
  opacity: 50%;
  color: black;
}

.add-btns > * {
  margin-bottom: 30px;
}
</style>
