<template>
  <v-container class="container">
    <v-card>
      <v-card-title>{{ $t('fyp.trending') }}</v-card-title>
    </v-card>
  </v-container>
</template>

<style scoped>
.container {
  width: 100%;
}
</style>

<script setup>
import { ref } from 'vue';

const content = ref('');

import { useContentStore } from '@/stores/content';

const contentStore = useContentStore();
</script>
