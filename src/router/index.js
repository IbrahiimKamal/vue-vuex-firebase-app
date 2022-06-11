import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from '@firebase/auth';

import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import FaqPage from '@/pages/FaqPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/faq',
    name: 'Faq',
    component: FaqPage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { onlyAuthUser: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { onlyGuestUser: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { onlyGuestUser: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuth = !!getAuth().currentUser;

  if (to.meta.onlyAuthUser) {
    if (isAuth) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (to.meta.onlyGuestUser) {
    if (isAuth) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
