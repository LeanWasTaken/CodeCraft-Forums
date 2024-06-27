<template>
  <v-navigation-drawer expand-on-hover permanent>
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        v-if="authStore.isAuthenticated"
        prepend-avatar="/assets/p-img/dog.jpeg"
        :subtitle="$t('sidebar.loggedin')"
        :title="authStore.user.name"
      ></v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        link
        :to="{ name: 'Home' }"
        prepend-icon="mdi-home-outline"
        :title="$t('sidebar.home')"
      ></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-arrow-top-right-thin-circle-outline"
        :title="$t('sidebar.popular')"
      ></v-list-item>
      <v-list-item
        link
        prepend-icon="mdi-map-search-outline"
        :title="$t('sidebar.all')"
      ></v-list-item>
      <v-list-item
        v-if="authStore.isAuthenticated"
        prepend-icon="mdi-forum"
        :title="$t('sidebar.topic')"
      ></v-list-item>
      <v-list-item
        link
        :to="{ name: 'Settings' }"
        v-if="authStore.isAuthenticated"
        prepend-icon="mdi-cog-outline"
        :title="$t('sidebar.settings')"
      ></v-list-item>
      <v-list-item
        @click="logout"
        prepend-icon="mdi-logout"
        :title="$t('sidebar.logout')"
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
  router.push({ name: 'Landing' });
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
