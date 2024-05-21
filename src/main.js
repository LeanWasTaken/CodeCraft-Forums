
import { registerPlugins } from '@/plugins';
import { useAuthStore } from './stores/auth';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

const app = createApp(App);

registerPlugins(app);

const authStore = useAuthStore();
authStore.checkAuth(); // Check auth status on app initialization

app.mount('#app');
