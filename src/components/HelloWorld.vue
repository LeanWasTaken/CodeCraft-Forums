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
            class="py-4 text-center"
            rel="noopener noreferrer"
            rounded="lg"
            target="_blank"
            variant="text"
          >
            <v-overlay
              opacity=".06"
              scrim="primary"
              contained
              model-value
              persistent
            />
            <v-card-title>What's currently happening</v-card-title>
            <div class="my-5" />

            <div class="pa-4">
              
            <v-window cycle show-arrows="hover" v-model="selectedPostIndex">
              <v-overlay
              opacity=".08"
              scrim="primary"
              contained
              model-value
              persistent
            />
              <v-window-item v-for="(post, index) in posts" :key="index">
                <v-card>
                  <v-card-title>{{ post.title }}</v-card-title>
                  <v-card-subtitle>{{ post.author }}</v-card-subtitle>
                  <v-card-text>{{ post.content }}</v-card-text>
                  <v-divider></v-divider>
                  <v-card v-for="(comment, cIndex) in post.comments" :key="cIndex">
                    <v-card-text>{{ comment.text }}</v-card-text>
                    <v-divider></v-divider>
                  </v-card>
                  <v-card-actions>
                    <v-avatar v-for="(avatar, aIndex) in post.avatars" :key="aIndex" :size="24">
                      <v-img :src="avatar"></v-img>
                    </v-avatar>
                    <v-spacer></v-spacer>
                    <v-icon>mdi-heart</v-icon>{{ post.likes }}
                  </v-card-actions>
                </v-card>
              </v-window-item>
            </v-window>
          </div>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const selectedPostIndex = ref(0);

const posts = [
  {
    title: "Post 1",
    author: "Author 1",
    content: "This is the content of post 1.",
    comments: [
      { text: "Comment 1 for post 1" },
      { text: "Comment 2 for post 1" }
    ],
    avatars: ["/avatar1.png", "/avatar2.png"],
    likes: 10
  },
  {
    title: "Post 2",
    author: "Author 2",
    content: "This is the content of post 2.",
    comments: [
      { text: "Comment 1 for post 2" },
      { text: "Comment 2 for post 2" }
    ],
    avatars: ["/avatar3.png", "/avatar4.png", "/avatar5.png"],
    likes: 5
  },
  // Add more posts as needed
];
</script>
