import {createRouter, createWebHistory} from "vue-router";
import LoginView from "../views/LoginView.vue";
import EmployeesView from "../views/EmployeesView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import {useAuthStore} from "../store/auth";
import RecruitmentView from "../views/RecruitmentView.vue";

const routes = [
  {
    path: '/', component: LoginView
  },
  {
    path: '/employee', component: EmployeesView, meta: {requiredAuth: true}
  },
  {
    path: '/recruitment', component: RecruitmentView, meta: {requiredAuth: true}
  },
  {
    path: '/:catchAll(.*)', component: NotFoundView, meta: {requiredAuth: true}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const authStore= useAuthStore();

  if(to.meta.requiredAuth && !authStore.token){
    next("/");
  } else {
    next();
  }
});

export default router;