<template>
  <v-container>
    <v-card class="profile-info" elevation="3" rounded="lg">
      <v-card-title>
        <v-row class="justify-space-between py-1 px-4" no-gutters>
          <v-col cols="2" class="my-auto">
            <p class="profile-name">{{ user.username }}</p>
          </v-col>
          <v-col cols="2" v-if="showButtons" offset="6">
            <AddPost class="px-0 mx-1"/>
          </v-col>
          <v-col cols="2" v-if="showButtons">
            <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-account"
              variant="tonal"
              @click="router.push('/profile/settings')"
            >{{ $t('settings.settings') }}</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-img
        class="align-end text-white"
        height="200"
        :src="user.banner_url"
        cover
      >
        <v-avatar class="avatar" color="surface-variant" size="120">
          <v-img
            :src="user.avatar_url"
            cover
          ></v-img>
        </v-avatar>
      </v-img>
      <v-list-item
        class="profile-info"
        :subtitle="user.username"
        :title="user.fullname"
      ></v-list-item>
      <p class="profile-bio">{{ user.bio }}</p>
      <v-row class="followers py-2">
        <p>{{ $t('profile-info.following') }} {{ user.followingCount }}</p>
        <p>{{ $t('profile-info.followers') }}  {{ user.followerCount }}</p>
      </v-row>
      <div class="py-3"></div>
    </v-card>
  </v-container>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

import { useRouter } from 'vue-router';

const router = useRouter()

const authStore = useAuthStore()

const showButtons = ref(false)

const defaultUser = {
  username: 'PlaceholderUsername',
  fullname: 'Placeholder Name',
  avatar_url: 'default-avatar-url.jpg',
  bio: 'No bio.',
  followingCount: 0,
  followerCount: 0
};

const props = defineProps({
  user: Object,
});

const user = { ...defaultUser, ...props.user };

if(authStore.user && authStore.user.id == user.id) {
  showButtons.value = true
}
</script>

<style scoped>
.profile-name {
  font-size:16px
}

.profile-views {
  font-size: 12px
}

* {
  font-weight: 300;
}
.followers > * {
  padding-right: 10px;
}

.avatar {
  margin-left: 20px;
  margin-bottom: 35px;
  border: white 5px solid;
}

.followers {
  margin-left: 20px;
}

.profile-bio {
  margin-left: 20px;
  margin-bottom: 15px;
  padding-right: 10px;
}

.profile-main-info {
  max-height: 50px;
  font-size: 10px;
}
</style>
