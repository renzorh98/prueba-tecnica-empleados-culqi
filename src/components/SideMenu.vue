<script setup lang="ts">
import CulqiSvgMedium from "../assets/svg/culqiSvgMedium.vue";
import iconsSvg from "../assets/svg/iconsSvg.vue";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "../store/auth";

const items = [
  {
    title: 'Empleado',
    icon: 'employee',
    path: '/employee'
  },
  {
    title: 'Reclutamiento',
    icon: 'job',
    path: '/recruitment'
  }
];

const activeOpt = ref('employee');
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const goToPath = (path: string) => {
  if(route.path !== path){

    router.push(path);
  }
};

const handleOptionClick = (item: {title: string, icon: string, path: string}) => {
  activeOpt.value = item.icon;
  goToPath(item.path);
};

const exit = () => {
  authStore.clearToken();
  authStore.clearUserData();

  router.push('/');
}


</script>

<template>
  <aside class="h-screen w-[280px] bg-white flex flex-col justify-between items-center py-6 px-8 gap-6 border-r border-gray-200 fixed">
    <div class="w-full flex flex-col gap-6">
      <culqi-svg-medium></culqi-svg-medium>
      <div>
        <div class="flex w-full h-[54px] items-center gap-[10px] cursor-pointer" v-for="item in items" @click="handleOptionClick(item)">
          <icons-svg :type="item.icon" :activeIcon="activeOpt"></icons-svg>
          <span class="text-gray-900 font-bold text-sm" :class="{'text-emerald-600':activeOpt===item.icon}">{{item.title}}</span>
        </div>
      </div>
    </div>
    <button class="w-full h-[48px] rounded-[10px] bg-white border border-gray-900 text-gray-900 font-bold text-sm" @click="exit()">
      Salir
    </button>
  </aside>
</template>
