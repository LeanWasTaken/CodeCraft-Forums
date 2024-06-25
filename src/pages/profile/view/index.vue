<template>
    <v-container class="profile">
      <ProfileInfo v-if="userFound" :user="user" />
      <ProfileButtonBar v-if="userFound" :user="user" />
      <p v-else>User not found</p>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import ProfileInfo from '@/components/profile/ProfileInfo.vue';
  import ProfileButtonBar from '@/components/profile/ProfileButtonBar.vue';
  
  const user = ref(null);
  const userFound = ref(false);
  const route = useRoute();
  
  const fetchUser = async () => {
  const username = route.params.username;

  if (username) {
    try {
      const response = await axios.get(`http://localhost:8008/api/users/username/${username}`);
      user.value = response.data;
      userFound.value = true;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('User not found');
        user.value = {};
        userFound.value = false;
      } else {
        console.error('Error fetching user.');
        userFound.value = false;
      }
    }
  } else {
    userFound.value = false;
  }
};
  if(route.params.username) {
    fetchUser()
  }
</script>
  
  <style scoped>
  .profile {
    max-width: 1240px;
  }
  </style>
    