<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Edit Profile"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text class="profile-info">
          <v-img
            class="profile-bg"
            height="200"
            src="https://i.pinimg.com/736x/57/87/39/578739480ca0069cceb40b5034dfb3c5.jpg"
            cover
          >
            <v-avatar class="avatar" color="surface-variant" size="120">
              <v-img
                src="https://www.intentional-collective.com/wp-content/uploads/2021/03/120450684_4003220729694135_3695653168839154084_n.jpg"
                cover
              ></v-img
            ></v-avatar>
          </v-img>

          <v-text-field label="Name" required></v-text-field>

          <v-text-field label="Usename" required></v-text-field>

          <v-text-field label="Bio"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Save"
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
</style>
<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>
