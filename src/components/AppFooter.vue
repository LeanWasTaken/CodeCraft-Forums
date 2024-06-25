<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon :icon="item.icon" :size="item.icon === '$vuetify' ? 24 : 16" />
    </a>

    <div
      class="text-caption"
      style="position: absolute; right: 16px"
    >
      &copy;{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">CodeCraft - kj23041, dr23041</span>
    </div>
  </v-footer>
</template>

<script setup>
const items = [
  {
    title: 'CodeCraft Repository',
    icon: `$vuetify`,
    href: 'https://github.com/LeanWasTaken/CodeCraft-Forums',
  },
  {
    title: 'Krists Martins Jāvalds - kj23041',
    icon: `mdi-github`,
    href: 'https://github.com/LeanWasTaken',
  },
  {
    title: 'Darja Rozonova - dr23041',
    icon: `mdi-github`,
    href: 'https://github.com/dariarozonova',
  },
  {
    title: 'Vuetify GitHub',
    icon: `mdi-github`,
    href: 'https://github.com/vuetifyjs/vuetify',
  },
];
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
