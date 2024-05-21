<template>
    <v-container>
        <v-card class="interactions-card"
          rounded="lg"
          >
            <v-tabs
              v-model="tab"
              grow
            >
                <v-tab value="1">Posts</v-tab>
                <v-tab value="2">Replies</v-tab>
                <v-tab value="3">Media</v-tab>
                <v-tab value="4">Likes</v-tab>
                </v-tabs>

                <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="1">
                    <h1>This is example text for the first atb in the user profile page.</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum mollitia labore similique nobis illum ipsum laboriosam repudiandae hic omnis incidunt perferendis, adipisci nisi, eaque magni architecto voluptatum tenetur eius consequuntur!</p>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="2">
                    Two
                    </v-tabs-window-item>

                    <v-tabs-window-item value="3">
                    Three
                    </v-tabs-window-item>
                    <v-tabs-window-item value="4">
                    Four
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>

import { ref } from 'vue'
const tab = ref('1')

</script>