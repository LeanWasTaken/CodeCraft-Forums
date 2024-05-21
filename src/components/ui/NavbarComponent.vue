<template>
  <v-app-bar>
    <v-app-bar-title>
      <a class="logo" href="/">
        <span class="blue-text">Code</span>
        <span class="yellow-text">Craft</span>
      </a>
    </v-app-bar-title>

    <template v-slot:append>
      <div v-if="!authenticated">
        <v-btn to="/auth/login"><p>Get Started!</p></v-btn>
      </div>
      <div v-else>
        <v-btn @click="logout()"><p>Log Out</p></v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
const authenticated = ref(false);

/*const dropdownItems = [
  { text: 'Profile' },
  { text: 'Settings' },
  { text: 'Logout' },
];*/
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
