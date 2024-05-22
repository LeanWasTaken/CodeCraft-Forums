import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useContentStore = defineStore('content', () => {
  const content = ref('');

  function setContent(newContent) {
    content.value = newContent;
  }

  return { content, setContent };
});
