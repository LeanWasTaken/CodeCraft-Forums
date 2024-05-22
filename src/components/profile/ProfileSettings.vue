<template>
    <v-container class="profile-settings">
      <v-card>
        <v-card-title>Your Profile</v-card-title>
        <v-card-text>See information about your account, change your data, or learn about your account deactivation options</v-card-text>
        <v-list dense nav>
          <v-list-item @click="showDialog('password')" prepend-icon="mdi-lock-reset">Change password</v-list-item>
          <v-list-item @click="showDialog('email')" prepend-icon="mdi-email-outline">Change E-mail</v-list-item>
          <v-list-item @click="showDialog('language')" prepend-icon="mdi-translate">Change language</v-list-item>
          <v-list-item @click="showDialog('deactivate')" prepend-icon="mdi-heart-broken-outline">Deactivate your account</v-list-item>
        </v-list>
      </v-card>

      <v-dialog v-model="dialogs.password" max-width="600px">
        <v-card prepend-icon="mdi-lock-reset" title="Change Password">
          <v-card-text>
            <v-text-field label="Current password" type="password" required></v-text-field>

            <v-text-field label="New password" type="password" required></v-text-field>
            <v-text-field label="Confirm password" type="password" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('password')">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('password')">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="dialogs.email" max-width="600px">
        <v-card prepend-icon="mdi-email-outline" title="Change E-mail">
          <v-card-text>
            <v-text-field label="Current e-mail" type="email" required></v-text-field>
            <v-text-field label="New e-mail" type="email" required></v-text-field>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('email')">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('email')">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="dialogs.language" max-width="600px">
        <v-card prepend-icon="mdi-translate" title="Change Language">
          <v-card-text>
            <v-autocomplete
            :items="[
              'LV',
              'ENG',
            ]"
            label="Language"
            auto-select-first
          >
          </v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('language')">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('language')">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-dialog v-model="dialogs.deactivate" max-width="600px">
        <v-card prepend-icon="mdi-heart-broken-outline" title="Deactivate Account">
          <v-card-text>
            <p>Are you sure you want to deactivate your account? If you are sure, enter your password!</p>
            <v-text-field label="Password" type="password" required class="mt-5"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('deactivate')">Close</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('deactivate')">Deactivate</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  
  const dialogs = ref({
    password: false,
    email: false,
    deactivate: false,
    language: false,
  });
  
  const isAuthenticated = computed(() => store.state.authStore.isAuthenticated);
  
  const showDialog = (dialog) => {
    dialogs.value[dialog] = true;
  };
  
  const closeDialog = (dialog) => {
    dialogs.value[dialog] = false;
  };
  
  const saveChanges = (dialog) => {
    // Add logic to save changes
    console.log(`Saving changes for ${dialog}`);
    closeDialog(dialog);
  };
  </script>
  
  <style scoped>
  .profile-settings {
    max-width: 700px;
    margin: auto;
  }
  
  .v-list-item {
    margin: 0 5px;
  }
  
  .v-list-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  </style>
  