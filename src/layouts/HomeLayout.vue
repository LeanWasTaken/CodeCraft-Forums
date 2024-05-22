<template>
  <v-app>
    <v-layout class="sidebar-layout rounded-md">
      <NavbarComponent />
      <SideBar>
        <v-main>
          <router-view />
        </v-main>
      </SideBar>
    </v-layout>
  </v-app>
</template>

<script setup>
import NavbarComponent from '@/components/ui/NavbarComponent.vue';
import SideBar from '@/components/ui/SidebarComponent.vue';
</script>

<style scoped>
.sidebar-layout {
  min-height: 100vh;
  display: flex;
}
</style>
