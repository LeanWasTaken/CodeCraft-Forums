<template>
  <v-container>
    <v-card class="interactions-card" rounded="lg">
      <v-tabs v-model="tab" grow>
        <v-tab value="one">Posts</v-tab>
        <v-tab value="two">Replies</v-tab>
        <v-tab value="three">Media</v-tab>
        <v-tab value="four">Likes</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one"> One </v-tabs-window-item>

          <v-tabs-window-item value="two"> Two </v-tabs-window-item>

          <v-tabs-window-item value="three"> Three </v-tabs-window-item>
          <v-tabs-window-item value="four"> Three </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style>
.interactions-card {
  max-width: 900px;
}
</style>

<script>
export default {
  data: () => ({
    tab: null,
  }),
};
</script>
