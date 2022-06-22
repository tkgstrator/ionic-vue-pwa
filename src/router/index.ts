import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Navigation from "../views/Navigation.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/tabs/tab1'
  // },
  {
    path: "/",
    component: Navigation,
    children: [
      {
        path: "/",
        redirect: "/home",
      },
      {
        path: "/results",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/search",
        component: () => import("@/views/Search.vue"),
      },
      {
        path: "/schedules",
        component: () => import("@/views/Schedules.vue"),
      },
      {
        path: "/schedules/:start_time",
        component: () => import("@/views/Stats.vue"),
      },
      {
        path: "/ranking",
        component: () => import("@/views/Ranks.vue"),
      },
      {
        path: "/settings",
        component: () => import("@/views/MyPageMenu.vue"),
      },
      {
        path: "/home",
        component: () => import("@/views/MyPageMenu.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
