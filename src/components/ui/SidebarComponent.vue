<template>
  <v-navigation-drawer expand-on-hover permanent>
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        v-if="authStore.isAuthenticated"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        subtitle="Logged in"
        title="Jane Smith"
      ></v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        link
        :to="{ name: 'Home' }"
        prepend-icon="mdi-home-outline"
        title="Home"
      ></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-arrow-top-right-thin-circle-outline"
        title="Popular"
      ></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-map-search-outline"
        title="All"
      ></v-list-item>
      <v-list-item
        v-if="authStore.isAuthenticated"
        prepend-icon="mdi-forum"
        title="My topics"
      ></v-list-item>
      <v-list-item
        link
        :to="{ name: 'Profile' }"
        v-if="authStore.isAuthenticated"
        prepend-icon="mdi-cog-outline"
        title="Settings"
      ></v-list-item>
      <v-list-item
        @click="logout"
        prepend-icon="mdi-logout"
        title="Log out"
        v-if="authStore.isAuthenticated"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main class="content">
    <slot class="slot-container" />
  </v-main>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

import { useRouter } from 'vue-router';
const router = useRouter();

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push({ name: 'Home' });
};
</script>

<style scoped>
.content {
  min-height: 100vh;
  padding: 0;
}

.slot-container {
  max-width: 900px;
}
.v-navigation-drawer {
  width: 250px;
}

.v-list-item {
  margin: 0 5px;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
