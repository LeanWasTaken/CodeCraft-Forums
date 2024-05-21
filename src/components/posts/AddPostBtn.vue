<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Add Post"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-lead-pencil" title="Create a post!">
        <v-card-text>
          <v-text-field label="Title" required></v-text-field>
          <v-text-field label="Post"></v-text-field>
          <v-autocomplete
            :items="['Crypto', 'Web', 'Data bases', 'SQL', 'Python', 'GPT', 'AI', 'Coding', 'Jobs']"
            label="Topic"
            auto-select-first>
          </v-autocomplete>
      </v-card-text>
      
      <v-row class="add-btns">
          <v-btn icon="mdi-image" class="add-image-btn"></v-btn>
          <v-btn icon="mdi-code-tags" class="add-code-btn"></v-btn>
      </v-row>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Add"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
.avatar {
  margin-left: 30px;
  margin-top: 45px;
  border: white 5px solid;
}

.profile-info {
  margin: 10px;
}

.profile-bg {
  color: rgb(253, 241, 241);
  align-self: self-end;
  margin-bottom: 10px;
}

.edit-pic-btn {
  margin-top: 15px;
  opacity: 50%;
  color: black;
}

.edit-bg-btn {
  margin-top: 65px;
  margin-right: 200px;
  opacity: 50%;
  color: black;
}

.add-btns > * {
  margin-bottom: 30px;
}

</style>
<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>
