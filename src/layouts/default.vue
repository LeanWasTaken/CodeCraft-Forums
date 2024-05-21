<template>
  <v-app>
    <NavbarComponent />
    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import NavbarComponent from '@/components/ui/NavbarComponent.vue'
//
</script>
