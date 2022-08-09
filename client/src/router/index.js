import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Index from "../views/index.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/404.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Infoshow from "../views/Infoshow.vue";
import FundList from "../views/FundList.vue";
const routes = [
  {
    path: "/",
    redirect: "/index",
    component: HomeView,
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: Infoshow,
      },
      {
        path: '/fundlist',
        name: "fundlist",
        component:FundList
      }
    ],
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () =>
  //     import("../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
