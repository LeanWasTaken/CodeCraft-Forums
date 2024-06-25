import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/default.vue';
import HomeLayout from '@/layouts/HomeLayout.vue';
import LandingPage from '@/pages/index.vue';
import AuthLogin from '@/pages/auth/login.vue';
import AuthRegister from '@/pages/auth/register.vue';
import Profile from '@/pages/profile/index.vue';
import HomePage from '@/pages/home/index.vue';
import Settings from '@/pages/profile/settings.vue';
import ViewProfile from '@/pages/profile/view/index.vue';
import authMiddleware from '@/middleware/auth';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Landing',
        component: LandingPage,
      },
    ],
  },
  {
    path: '/home',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
      },
    ],
  },
  {
    path: '/auth',
    component: DefaultLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: AuthLogin,
        meta: { title: 'Login', requiresGuest: true },
      },
      {
        path: 'register',
        name: 'Register',
        component: AuthRegister,
        meta: { title: 'Register', requiresGuest: true },
      },
    ],
  },
  {
    path: '/profile',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Profile',
        component: Profile,
        meta: {
          title: 'Profile',
          middleware: authMiddleware,
        },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
        meta: {
          title: 'Settings',
          middleware: authMiddleware,
        },
      },
      {
        path: 'view/:username?',
        name: 'View',
        component: ViewProfile,
        meta: {
          title: 'View Profile'
        }
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? 'CodeCraft | ' + to.meta.title : 'CodeCraft';

  const authStore = useAuthStore();

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Profile' });
  } else if (to.meta.middleware) {
    await to.meta.middleware(to, from, next);
  } else {
    next();
  }
});

export default router;
