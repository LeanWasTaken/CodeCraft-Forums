<template>
    <div class="comment">
        <v-card
            class="comment-card"
            :title="comment.title"
            prepend-icon="mdi-house">
        </v-card>
        <v-card-text class="comment-content">
            {{ comment.content }}
        </v-card-text>
    </div>
</template>

<script setup>
</script>