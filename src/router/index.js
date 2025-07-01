import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/pages/HomePage.vue") },
  { path: "/pie", component: () => import("@/pages/PieChartPage.vue") },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
