<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="1440"
    >
      <div class="text-center">
        <div class="text-body-1 font-weight-medium mb-n1">Welcome to</div>

        <h3 class="text-h2 font-weight-bold">
          <span style="color: var(--blue-text)">Code</span>
          <span style="color: var(--yellow-text)">Craft</span>
        </h3>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="5">
          <v-card
            class="py-4"
            rel="noopener noreferrer"
            rounded="lg"
            variant="text"
          >
            <v-img
              cover
              src="/group.png"
            ></v-img>
          </v-card>
        </v-col>

        <v-col cols="7">
          <v-card
            class="py-4"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            variant="text"
          >
            
            <v-card-title class="text-center">What's currently happening</v-card-title>
            <div class="my-5" />

            <div class="pa-4">
              <CommentCard />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
