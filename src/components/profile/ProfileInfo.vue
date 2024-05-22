<template>
  <v-container>
    <v-card class="profile-info" elevation="3" rounded="lg">
      <v-card-title>
        <v-row class="justify-space-between py-1 px-4" no-gutters>
          <v-col cols="2" class="my-auto">
            <p class="profile-name">Profile Name</p>
            <p class="profile-views">Profile views</p>
          </v-col>
          <v-col cols="2" offset="6"><AddPost class="px-0 mx-1"/></v-col>
          <v-col cols="2"><ProfileEdit class="px-0 mx-1"/></v-col>
        </v-row>
      </v-card-title>
      <v-img
        class="align-end text-white"
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
      <v-list-item
        class="profile-info"
        subtitle="@username"
        title="Profile name"
      ></v-list-item>
      <p class="profile-bio">
        Clothes make the man. Naked people have little or no influence in
        society.
      </p>
      <v-row class="followers py-2">
        <p>{{ $t('profile-info.following') }} X</p>
        <p>{{ $t('profile-info.followers') }}  Y</p>
      </v-row>
      <div class="py-3"></div>
    </v-card>
  </v-container>
</template>

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
