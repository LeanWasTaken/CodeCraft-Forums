<template>
  <v-container>
    <v-card class="profile-info" elevation="3" rounded="lg">
      <v-card-title class="profile-title">
        <v-row class="justify-space-between py-1 px-4">
          <v-list-item subtitle="Views count" title="Profile name">
          </v-list-item>
          <v-list-item class="my-1 pa-1">
            <ProfileEdit />
          </v-list-item>
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
* {
  font-weight: 300;
}
.followers > * {
  padding-right: 10px;
}

.profile-name {
  padding-left: 15px;
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
