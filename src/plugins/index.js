/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify';
import pinia from '@/stores';
import router from '@/router';
import i18n from './i18n';
import { vuetifyProTipTap } from './tiptap';

export function registerPlugins(app) {
  app.use(vuetify).use(router).use(pinia).use(vuetifyProTipTap).use(i18n);
}
