import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue';  // Login.vue component
import HistoryView from '../views/HistoryView.vue'
import StatView from '../views/StatView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }, // Only authenticated users can access this route
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/login',  // Redirect to login if user is not authenticated
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Check authentication status before routing
router.beforeEach((to, from, next) => {
  const user = getAuth().currentUser; // Get current authenticated user
  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next({ name: 'login' }); // If not authenticated, redirect to login
  } else {
    next();
  }
});

// Ensure that user is authenticated before routing to restricted pages
onAuthStateChanged(getAuth(), (user) => {
  if (!user) {
    // Ensure user is redirected to the login page if logged out
    router.push({ name: 'login' });
  }
});

export default router
