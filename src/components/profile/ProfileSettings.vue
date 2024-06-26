<template>
    <v-container class="profile-settings">
      <v-card>
        <v-card-title>{{ $t('settings.profile') }}</v-card-title>
        <v-card-text>{{ $t('settings.info') }}</v-card-text>
        <v-list dense nav>
          <v-list-item @click="showDialog('password')" prepend-icon="mdi-lock-reset">{{ $t('settings.password') }}</v-list-item>
          <v-list-item @click="showDialog('email')" prepend-icon="mdi-email-outline">{{ $t('settings.email') }}</v-list-item>
          <v-list-item @click="showDialog('username')" prepend-icon="mdi-account-outline">{{ $t('settings.username') }}</v-list-item>
          <v-list-item @click="showDialog('fullname')" prepend-icon="mdi-form-textbox">{{ $t('settings.fullname') }}</v-list-item>
          <v-list-item @click="showDialog('language')" prepend-icon="mdi-translate">{{ $t('settings.language') }}</v-list-item>
          <v-list-item @click="showDialog('deactivate')" prepend-icon="mdi-heart-broken-outline">{{ $t('settings.deactivate') }}</v-list-item>
        </v-list>
      </v-card>

      <v-dialog v-model="dialogs.password.opened" max-width="600px">
        <v-card prepend-icon="mdi-lock-reset" title="Change Password">
          <v-card-text>
            <v-text-field v-model="dialogs.password.currentPassword" label="Current password" type="password" required></v-text-field>

            <v-text-field v-model="dialogs.password.newPassword" label="New password" type="password" required></v-text-field>
            <v-text-field v-model="dialogs.password.confirmPassword" label="Confirm password" type="password" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('password')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('password')">{{ $t('settings.save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="dialogs.email.opened" max-width="600px">
        <v-card prepend-icon="mdi-email-outline" title="Change E-mail">
          <v-card-text>
            <v-text-field v-model="dialogs.email.currentPassword" label="Current password" type="password" required></v-text-field>
            <v-text-field v-model="dialogs.email.currentEmail" label="Current e-mail" type="email" required></v-text-field>
            <v-text-field v-model="dialogs.email.newEmail" label="New e-mail" type="email" required></v-text-field>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('email')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('email')">{{ $t('settings.save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogs.username.opened" max-width="600px">
        <v-card prepend-icon="mdi-account-outline" title="Change username">
          <v-card-text>
            <v-text-field v-model="dialogs.username.currentPassword" label="Current password" type="password" required></v-text-field>
            <v-text-field v-model="dialogs.username.newUsername" label="Jaunais lietotājvārds" type="email" required></v-text-field>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('username')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('username')">{{ $t('settings.save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogs.fullname.opened" max-width="600px">
        <v-card prepend-icon="mdi-form-textbox" title="Change Full name">
          <v-card-text>
            <v-text-field v-model="dialogs.fullname.currentPassword" label="Current password" type="password" required></v-text-field>
            <v-text-field v-model="dialogs.fullname.newFullname" label="Jaunais vārds" type="email" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('fullname')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('fullname')">{{ $t('settings.save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="dialogs.language.opened" max-width="600px">
        <v-card prepend-icon="mdi-translate" title="Change Language">
          <v-card-text>
            <v-autocomplete
            :items="items"
            label="Language"
            auto-select-first
          >
          </v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('language')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('language')">{{ $t('settings.save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-dialog v-model="dialogs.deactivate.opened" max-width="600px">
        <v-card prepend-icon="mdi-heart-broken-outline" title="Deactivate Account">
          <v-card-text>
            <p>{{ $t('settings.deactivate-info') }}</p>
            <v-text-field v-model="dialogs.deactivate.currentPassword" label="Password" type="password" required class="mt-5"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('deactivate')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('deactivate')">{{ $t('settings.deactivate-btn') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import axios from 'axios';

  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore()

  let userId = authStore.getUserId

  const { locale } = useI18n();

  let dropdown = ref(false);

  const items = [
    { title: 'Latviski', locale: 'lv' },
    { title: 'English', locale: 'en' }
  ];

  const changeLocale = (newLocale) => {
    locale.value = newLocale;
    dropdown.value = false;
  };

  const dialogs = ref({
    password: {
      opened: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    email: {
      opened: false,
      currentPassword: '',
      currentEmail: '',
      newEmail: '',
    },
    deactivate: {
      opened: false,
      currentPassword: ''
    },
    language:{
      opened: false
    },
    username: {
      opened: false,
      currentPassword: '',
      newUsername: '',
    },
    fullname: {
      opened: false,
      currentPassword: '',
      newFullname: '',
    },
    bio:{
      opened: false,
      currentPassword: '',
      newBio: ''
    },
    images: {
      opened: false,
      currentPassword: ''
    }
  });

  const showDialog = (dialog) => {
    dialogs.value[dialog].opened = true;
  };

  const closeDialog = (dialog) => {
    dialogs.value[dialog].opened = false;
  };

  const saveChanges = async (dialog) => {
    try {
      switch (dialog) {
        case 'password':
          await axios.patch(`http://localhost:8008/api/users/password/${userId}`, {
            currentPassword: dialogs.value[dialog].currentPassword,
            newPassword: dialogs.value[dialog].newPassword,
          });
          break;
        case 'email':
          await axios.patch(`http://localhost:8008/api/users/email/${userId}`, {
            userPassword: dialogs.value[dialog].currentPassword,
            newEmail: dialogs.value[dialog].newEmail,
          });
          break;
        case 'username':
          await axios.patch(`http://localhost:8008/api/users/username/${userId}`, {
            currentPassword: dialogs.value[dialog].currentPassword,
            newUsername: dialogs.value[dialog].newUsername,
          });
          break;
        case 'fullname':
          await axios.patch(`http://localhost:8008/api/users/fullname/${userId}`, {
            userPassword: dialogs.value[dialog].userPassword,
            newFullname: dialogs.value[dialog].newFullname,
          }); 
          break;
        default:
          break;
      }
      closeDialog(dialog);
    } catch (error) {
      console.error('Error saving changes:', error);
      alert("Notika kļūda veicot pieprasījumu.")
    }
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
  