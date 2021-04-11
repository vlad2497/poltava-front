import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@components/pages/home/Home.vue";

Vue.use(VueRouter);

export const routeNames = {
  home: "home",
};

const routes = [
  {
    path: "/",
    name: routeNames.home,
    component: Home,
  },
];

export const router = new VueRouter({
  routes,
});
