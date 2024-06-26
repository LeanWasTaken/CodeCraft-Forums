<template>
  <v-container class="profile">
    <ProfileInfo v-if="userLoaded" :user="user" />
    <ProfileButtonBar v-if="userLoaded" :user="user" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import ProfileInfo from '@/components/profile/ProfileInfo.vue';
import ProfileButtonBar from '@/components/profile/ProfileButtonBar.vue';

const authStore = useAuthStore();
const user = ref({});
const userLoaded = ref(false)

const fetchUser = async () => {
  let userId = authStore.user.username;

  if(userId){
    try {
      const response = await axios.get(`http://localhost:8008/api/users/username/${userId}`);
      user.value = response.data;
      userLoaded.value = true;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  } else {
    userLoaded.value = false
  }

  
};

onMounted(fetchUser);
</script>

<style scoped>
.profile {
  max-width: 1240px;
}
</style>
