import { createRouter, createWebHistory } from 'vue-router';
import { PATH } from './path';
import HomePage from '@/pages/HomePage.vue';

const routes = [
  { path: PATH.home, component: HomePage },
  { path: PATH.pie, component: () => import('@/pages/PieChartPage.vue') },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
