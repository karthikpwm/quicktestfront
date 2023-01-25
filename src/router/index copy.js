import { useUserStore } from './../store/user'
import { createWebHistory, createRouter } from "vue-router";
// import Home from "../components/HelloWorld.vue";
// import Login from "../components/loginform.vue";
// import User from "../components/userinfo.vue";
// import result from "../components/result.vue";
// import info from "../components/info.vue";
// import question from "../components/question.vue";
// import cresult from "../components/candidateresults.vue";
// import calc from "../components/calculator.vue"
// import printcanquestions from "../components/printcandidatequestions.vue"

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("../components/loginform.vue"), meta: { requiresAuth: true } },
      { path: "/welcome/:id", component: () => import("../components/welcome.vue") },
      { path: "/home", component: () => import("../components/HelloWorld.vue") },
      { path: "/login", component: () => import("../components/loginform.vue") },
      { path: "/user", component: () => import("../components/userinfo.vue"), meta: { requiresAuth: true } },
      { path: "/guestuser", component: () => import("../components/guestUserDetails.vue"), meta: { requiresAuth: true, disableBack: true } },
      { path: "/result", component: () => import("../components/result.vue"), meta: { requiresAuth: false, disableBack: true } },
      { path: "/info", component: () => import("../components/info.vue"), meta: { requiresAuth: true } },
      { path: "/guestinfo", component: () => import("../components/guestInfo.vue"), meta: { requiresAuth: true, disableBack: true } },
      { path: "/question", component: () => import("../components/question.vue"), meta: { requiresAuth: true } },
      { path: "/cresult", name: '/cresult', component: () => import("../components/candidateresults.vue"), meta: { requiresAuth: true } },
      { path: "/calc", component: () => import("../components/calculator.vue"), meta: { requiresAuth: true } },
      { path: "/email", component: () => import("../components/emailgenerate.vue"), meta: { requiresAuth: true } },
      { path: "/token", name: '/token', component: () => import("../components/tokengenerate.vue"), meta: { requiresAuth: true } },
      // { path: "/addqstn", component: () => import("../components/addquestions.vue"), meta: { requiresAuth: true } },
      { path: "/editqstn", component: () => import("../components/editquestions.vue"), meta: { requiresAuth: true, disableBack: true } },
      { path: "/signup", component: () => import("../components/signUp.vue"), meta: { requiresAuth: true } },
      { path: "/checkout", component: () => import("../components/checkout.vue"), meta: { requiresAuth: true } },
      { path: "/razorpay/:id/:credit", component: () => import("../components/razorpay.vue") },
      { path: "/register", component: () => import("../components/register.vue") },
      { path: "/errorpage", component: () => import("../components/errorPageNotFound.vue") },
      { path: "/printcanquestions/:id", component: () => import("../components/printcandidatequestions.vue") },
      { path: "/token/test/:token", component: () => import("../components/token.vue"), meta: { disableBack: true } },
      { path: '/:pathMatch(.*)*', redirect: '/login' },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

window.popStateDetected = false
window.addEventListener('popstate', () => {
  window.popStateDetected = true
})

router.beforeEach((to, from, next) => {
  const IsItABackButton = window.popStateDetected
  window.popStateDetected = false
  if (IsItABackButton && from.meta.disableBack) {
    next(false)
    return ''
  }
  const store = useUserStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.token) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;