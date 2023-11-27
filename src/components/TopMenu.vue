<script setup lang="ts">
import {useAuthStore} from "../store/auth.ts";

const authStore = useAuthStore();
const userObj = JSON.parse(authStore.userData)
const userName = userObj.nombre
const names = userName.split(' ')
const fletter = names[0].split('')[0]
const sletter = names[1].split('')[0]
const randomColor = Math.floor(Math.random()*5);
const colors = ['#76448A', '#2874A6', '#1E8449', '#B03A2E', '#AF601A']
</script>

<template>
  <aside class="w-full h-24 flex justify-end items-center border-b border-gray-200 px-8 gap-2 bg-white">
    <div class="h-8 w-8 rounded-full flex justify-center items-center text-white font-bold text-sm cursor-pointer" :style="{'background-color': colors[randomColor]}">
      {{fletter}}{{sletter}}
    </div>
    <span class="text-xs text-gray-900 font-bold">{{userObj?.nombre}}</span>
  </aside>

</template>
