<template>
    <v-container class="container">
        <v-card 
            class="profile-info"
            elevation="3"
            rounded="lg"
        >
            <v-row>
                <v-list-item
                class="profile-main-info"
                subtitle="views count"
                title="Profile name"
                ></v-list-item>
                <v-btn class="edit-btn">EDIt</v-btn>
            </v-row>
            <v-img
            class="align-end text-white"
            height="200"
            src="https://i.pinimg.com/736x/57/87/39/578739480ca0069cceb40b5034dfb3c5.jpg"
            cover>
                <v-avatar class="avatar" color="surface-variant" size="120"> <v-img src="https://www.intentional-collective.com/wp-content/uploads/2021/03/120450684_4003220729694135_3695653168839154084_n.jpg" cover></v-img></v-avatar>
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
    padding: 10px
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
    padding-top: 5px;
    padding-left: 60px;
    font-weight: 300;
}

.profile-info {
    max-width: 900px;
    font-weight: 300;
}

.edit-btn {

    margin-left: 30px;
}

</style>