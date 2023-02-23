import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import calculator from "./calculator";

const routes = [
  calculator
]
export const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: routes as unknown as RouteRecordRaw[],
});

