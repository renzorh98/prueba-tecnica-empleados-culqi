<script setup lang="ts">
import {useRoute} from "vue-router";
import TopMenu from "./components/TopMenu.vue";
import SideMenu from "./components/SideMenu.vue";

const route = useRoute()

</script>

<template>
  <div class="flex w-screen" v-if="route.path !== '/'">
    <side-menu></side-menu>
    <div class="flex-1 bg-gray-100 ml-[280px] h-screen">
      <top-menu></top-menu>
      <div class="flex pt-8 px-6">
        <router-view></router-view>
      </div>
    </div>
  </div>

  <router-view v-else></router-view>
</template>
