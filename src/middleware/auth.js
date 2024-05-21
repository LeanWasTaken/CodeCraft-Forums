import { useAuthStore } from '../stores/auth';

export default async function authMiddleware(to, from, next) {
  const authStore = useAuthStore();

  await authStore.checkAuth();

  if (!authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
}
