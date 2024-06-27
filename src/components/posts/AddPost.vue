<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          :text="$t('createpost.createpost')"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-lead-pencil" :label="$t('createpost.createpost')">
        <v-card-text>
          <v-text-field v-model="title" :label="$t('createpost.title')" required></v-text-field>
          <v-autocomplete
            v-model="selectedTopic"
            :items="topicItems"
            :label="$t('createpost.topic')"
            item-text="name"
            item-value="name"
            auto-select-first
          ></v-autocomplete>
          <VuetifyTiptap
            class="text-field"
            v-model="content"
            markdown-theme="github"
           />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="$t('createpost.close')" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            :text="$t('createpost.create')"
            variant="tonal"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const dialog = ref(false);
const title = ref('');
const content = ref('');
const selectedTopic = ref(null);
const topicItems = ref([]);

const authStore = useAuthStore();

const fetchTopics = async () => {
  try {
    const response = await axios.get('http://localhost:8008/api/topics');
    topicItems.value = response.data.map(topic => topic.name);
  } catch (error) {
    console.error('Error fetching topics:', error);
  }
};

const handleSubmit = async () => {
  try {
    const userId = authStore.getUserId;

    if (!userId) {
      return alert('No user ID provided.');
    }

    if (!title.value) {
      return alert('Post title is missing.');
    } else if (!content.value) {
      return alert('Post content is missing.');
    } else if (!selectedTopic.value) {
      return alert('Post topic is missing.');
    }

    const postData = {
      title: title.value,
      content: content.value,
      type: `TEXT`,
      topic: selectedTopic.value,
      userId: userId,
    };

    console.log(postData)

    const response = await axios.post('http://localhost:8008/api/posts', postData);
    

    if (response.status === 201) {
      dialog.value = false;
      title.value = '';
      content.value = '';
      selectedTopic.value = null;
    } else {
      alert('Failed to create post.');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    alert('Failed to create post: ' + error);
  }
};

onMounted(fetchTopics);
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
