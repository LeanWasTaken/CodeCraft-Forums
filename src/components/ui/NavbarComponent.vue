<template>
  <v-app-bar>
    <v-app-bar-title>
      <a class="logo" href="/">
        <span class="blue-text">Code</span>
        <span class="yellow-text">Craft</span>
      </a>
    </v-app-bar-title>
    <template v-slot:append>
      <div v-if="!authStore.isAuthenticated">
        <v-btn to="/auth/login"><p>Get Started!</p></v-btn>
      </div>
      <div v-else>
        <v-btn text @click="navigateToProfile">{{
          authStore.user.username
        }}</v-btn>
        <v-btn text @click="logout">Log Out</v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const navigateToProfile = () => {
  router.push({ name: 'Profile' });
};

const logout = () => {
  authStore.logout();
  router.push({ name: 'Home' });
};
</script>

<style scoped>
.blue-text {
  color: rgb(88, 182, 206);
}
.yellow-text {
  color: rgb(248, 197, 126);
}
.logo {
  font-weight: bold;
  font-size: 25px;
}
</style>
