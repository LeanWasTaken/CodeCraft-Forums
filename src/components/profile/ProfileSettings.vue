<template>
    <v-container class="profile-settings">
      <v-card>
        <v-card-title>{{ $t('settings.profile') }}</v-card-title>
        <v-card-text>{{ $t('settings.info') }}</v-card-text>
        <v-list dense nav>
          <v-list-item @click="showDialog('password')" prepend-icon="mdi-lock-reset">{{ $t('settings.password') }}</v-list-item>
          <v-list-item @click="showDialog('email')" prepend-icon="mdi-email-outline">{{ $t('settings.email') }}</v-list-item>
          <v-list-item @click="showDialog('language')" prepend-icon="mdi-translate">{{ $t('settings.language') }}</v-list-item>
          <v-list-item @click="showDialog('deactivate')" prepend-icon="mdi-heart-broken-outline">{{ $t('settings.deactivate') }}</v-list-item>
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
            <v-btn color="blue darken-1" text @click="closeDialog('password')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('password')">{{ $t('settings.save') }}</v-btn>
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
            <v-btn color="blue darken-1" text @click="closeDialog('password')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('password')">{{ $t('settings.save') }}</v-btn>
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
            <v-btn color="blue darken-1" text @click="closeDialog('password')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('password')">{{ $t('settings.save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-dialog v-model="dialogs.deactivate" max-width="600px">
        <v-card prepend-icon="mdi-heart-broken-outline" title="Deactivate Account">
          <v-card-text>
            <p>{{ $t('settings.deactivate-info') }}</p>
            <v-text-field label="Password" type="password" required class="mt-5"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog('password')">{{ $t('settings.close') }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveChanges('password')">{{ $t('settings.deactivate-btn') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  const store = useStore();
  const router = useRouter();
  const { locale } = useI18n();

  let dropdown = ref(false)

const items = [
  { title: 'Latviski', locale: 'lv' },
  { title: 'English', locale: 'en' }
]

const changeLocale = (newLocale) => {
  locale.value = newLocale
  dropdown.value = false
}
  
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
  