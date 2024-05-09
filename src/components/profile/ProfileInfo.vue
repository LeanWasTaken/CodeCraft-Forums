<template>
  <v-container class="container">
    <v-card class="profile-info" elevation="3" rounded="lg">
            <v-card-title class="profile-title">
          <v-row class="justify-space-between py-1 px-4">
            <v-list-item
                  
                  subtitle="views count"
                  title="Profile name"
                >
                    </v-list-item>
                    <v-list-item class="my-1 pa-1">
                <v-btn class="edit-btn ma-1"
                        variant=text>EDIT PROFILE</v-btn>
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
      <v-row class="followers">
        <p>Following X</p>
        <p>Followers Y</p>
      </v-row>
      <div class="py-3"></div>
    </v-card>
  </v-container>
</template>

<style scoped>
.followers > * {
  padding: 10px;
}

.profile-name {
  padding-left: 15px;
  font-weight: 300;
}

.avatar {
  margin-left: 20px;
  margin-bottom: 35px;
  border: white 5px solid;
}

.followers {
  margin-left: 20px;
  padding: 10px;
  font-weight: 300;
}

.profile-main-info {
    max-height: 50px;
    font-size: 10px;
    font-weight: 300;
}

.profile-info {
    font-weight: 300;
}


</style>
