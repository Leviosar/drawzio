import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import "@/assets/scss/main.scss";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
