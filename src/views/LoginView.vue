<script setup lang="ts">
import CulqiSvg from "../assets/svg/culqiSvgSmall.vue";
import AlertSvg from "../assets/svg/alertSvg.vue";
import {useAuthStore} from "../store/auth";
import {login} from "../utils/apiUtils";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const user = ref('c.quispe@culqi.com');
const password = ref('admin123');
const haveError = ref(false);
const router = useRouter();

onMounted(() => {
  authStore.clearToken();
  authStore.clearUserData();
})
const callToLogin = () => {
  haveError.value = false;

  login(user.value, password.value)
      .then(resp => {
        authStore.setToken(resp.data.token as string);
        authStore.setUserData(JSON.stringify(resp.data.user));
        router.push('/employee')
      })
      .catch(err => {
        haveError.value = true;
      })
};

</script>

<template>
  <div class="w-screen h-screen flex">
    <aside class="w-1/2 max-w-[720px] h-screen bg-gray-900">
      <div class="w-full">
        <img class="object-cover" src="../assets/images/peoplePhoto.png" alt="peoplePhoto.png"/>
      </div>
      <div class="flex flex-col gap-6 w-full border-t-[5px] border-emerald-500 pt-[50px] px-[50px]">
        <culqi-svg></culqi-svg>
        <h1 class="text-white font-bold text-5xl">Dale más power ⚡ a tus empleados hoy 💪</h1>
        <span class="text-white font-normal text-lg">Te ayudamos a gestionarlos de manera más sencilla</span>
      </div>
    </aside>

    <aside class="relative flex-1 h-screen flex flex-col justify-center items-center gap-8">
      <div class="flex flex-col items-center w-full max-w-[480px] gap-8">
        <h4 class="text-gray-900 text-2xl font-bold">Inicia sesión</h4>

        <form class="w-full flex flex-col gap-6">
          <div class="flex flex-col w-full gap-2.5">
            <p class="font-medium text-sm text-gray-900">Correo electrónico <span class="text-red-600">*</span></p>
            <input v-model="user"
                   class="h-14 rounded-[10px] border border-gray-300 focus:border-green-500 focus:outline-none px-5"
                   placeholder="Ingresa el correo electrónico" type="email"/>
          </div>
          <div class="flex flex-col w-full max-w-[480px] gap-2.5">
            <p class="font-medium text-sm text-gray-900">Contraseña <span class="text-red-600">*</span></p>
            <input v-model="password"
                   class="h-14 rounded-[10px] border border-gray-300 focus:border-green-500 focus:outline-none px-5"
                   placeholder="Ingresa la contraseña" type="password"/>
          </div>
        </form>

        <div v-if="haveError" class="flex w-full items-center gap-1">
          <alert-svg class="text-red-600"></alert-svg>
          <span class="text-red-600 font-normal text-xs">Correo o contraseña incorrectos</span>
        </div>

        <button class="w-full max-w-[480px] bg-gray-900 text-white font-bold text-base" @click="callToLogin()">Iniciar sesión</button>

        <p class="text-gray-400 text-sm font-medium">¿Eres nuevo aquí? <span class="text-green-500">Crea una cuenta</span></p>
      </div>

      <span class="absolute bottom-[10px] text-gray-400 text-sm font-medium">© 2023 Culqi . Todos los derechos reservados</span>

    </aside>
  </div>
</template>

<style scoped>

</style>