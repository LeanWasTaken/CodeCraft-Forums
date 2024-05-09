<template>
  <v-container fluid class="content">
    <v-row class="row">
      <v-col cols="12" md="4">
        <v-card class="home-picture">
          <v-img cover src="/group.png"></v-img>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="home-info">
          <v-card-title style="text-align: center" class="home-header">
            <p>
              We are <span class="blue-text">Code</span
              ><span class="yellow-text">Craft</span>
            </p>
          </v-card-title>

          <v-card-text class="custom-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
            amet, distinctio asperiores adipisci corporis quibusdam rem natus
            temporibus. Maiores reiciendis saepe sed quod ea quo magnam animi
            qui molestiae rem!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.row {
  max-width: 1440px;
  justify-content: center;
}
.container {
  width: 100%;
  display: flex;
}
.home-picture {
  border-color: none;
  box-shadow: none;
  height: 100%;
  background-color: #e1ddee;
}

.home-info {
  border-color: none;
  box-shadow: none;
  height: 100%;
  background-color: #e1ddee;
}

.custom-text {
  font-size: 20px;
}

.home-header {
  padding-top: 50px;
  font-size: 24px;
}

.blue-text {
  color: rgb(117, 188, 206);
}

.yellow-text {
  color: rgb(254, 216, 163);
}
</style>
