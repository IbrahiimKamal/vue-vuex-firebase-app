import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from '@firebase/auth';

import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import FaqPage from '@/pages/FaqPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

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

router.beforeEach(async (to, _, next) => {
  const isAuth = await getAuth().currentUser;

  if (to.meta.onlyGuestUser) {
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
