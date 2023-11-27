<script setup lang="ts">

import IconsSvg from "../assets/svg/iconsSvg.vue";
import {onMounted, Ref, ref, watch} from "vue";
import {personObject, getEmployees} from "../utils/apiUtils";

const page = ref(1);
const limit = ref(10);
const arrayPages: Ref<Array<Array<number>>> = ref([[0,0]]);
const total = ref(0);

const headers = [
  'Nombre',
  'Nombre cargo',
  'Departamento',
  'Oficina',
  'Cuenta',
  'Acciones',
];

const defaultData = {
  id: 0,
  nombre: "",
  correo: "",
  cargo: "",
  departamento: "",
  oficina: "",
  estadoCuenta: ""
} as personObject;

const employeeList: Ref<personObject[]> = ref([]);
const loading = ref(false);
const loadingTable = ref(false);

onMounted(() => {
  loading.value = true;
  loadingTable.value = true;
  setDefaultEmployeeArray();
  callToGetEmployee();
});

watch(limit, async (newLimit, oldLimit) => {
  if(newLimit !== oldLimit){
    page.value = 1;
    loadingTable.value = true;
    loading.value = true;

    setDefaultEmployeeArray();
    callToGetEmployee();
  }
})

watch(page, async(newPage, oldPage) => {
  if(newPage !== oldPage){
    loadingTable.value = true;

    setDefaultEmployeeArray();
    callToGetEmployee();
  }
})

const callToGetEmployee = () => {
  getEmployees(limit.value, page.value)
      .then(resp => {
        employeeList.value = resp.data;
        total.value = resp.total

        calculatePages(total.value, limit.value)
      })
      .catch(() => {
      })
      .finally(() => {
        loading.value = false;
        loadingTable.value = false;
      });
};
const calculatePages = (total: number, limit: number)=>{
  arrayPages.value=[]

  const numPages = Math.ceil(total/limit)
  for(let i = 0; i < numPages; i++){
    let init = (i*limit)+1
    let final = (i+1) * limit

    if((i+1) === numPages){
      final = total
    }

    arrayPages.value.push([init, final])
  }

  console.log(arrayPages.value)
};

const setDefaultEmployeeArray = () => {
  employeeList.value = []
  for (let i = 0; i < limit.value; i++) {
    employeeList.value.push({ ...defaultData });
  }
}

</script>

<template>
  <aside class="flex w-full flex-col bg-white rounded-2xl p-6 gap-6">
    <div class="flex w-full justify-between">
      <div class="flex flex-col gap-2">
        <span class="text-gray-900 font-bold text-2xl">Empleados</span>
        <span class="text-gray-600 font-medium text-sm">Gestiona tus empleados</span>
      </div>
      <div class="flex items-center gap-5">
        <template v-if="!loading">
          <button class="flex gap-2 items-center rounded-[10px] border border-gray-900 h-14">
            <icons-svg type="download"></icons-svg>
            Descargar
          </button>
        </template>
        <template v-else>
          <div class="w-40 h-10 loading">
          </div>
        </template>

        <template v-if="!loading">
          <button class="flex gap-2 items-center rounded-[10px] text-white bg-gray-900 h-14">
            <icons-svg type="add"></icons-svg>
            Nuevo
          </button>
        </template>
        <template v-else>
          <div class="w-40 h-10 loading">
          </div>
        </template>
      </div>
    </div>

    <div class="flex gap-4">
      <template v-if="!loading">
        <div class="flex w-3/4 h-[54px] items-center px-5 py-4 border border-gray-200 rounded-[10px]">
          <input class="w-full" type="text" placeholder="Buscar empleado">
          <icons-svg type="search"></icons-svg>
        </div>

        <div class="w-1/4 flex items-center px-5 py-4 border border-gray-200 rounded-[10px]">
          <select class="w-full text-sm">
            <option value="opt1">Nombre de cargo</option>
            <option value="opt2">Opción 2</option>
            <option value="opt3">Opción 3</option>
            <option value="opt4">Opción 4</option>
          </select>
        </div>
      </template>
      <template v-else>
        <div class="flex-1 h-10 loading"></div>
        <div class="flex-1 h-10 loading"></div>
        <div class="flex-1 h-10 loading"></div>
      </template>
    </div>

    <div class="w-full max-h-[500px] overflow-y-scroll">
      <table class="w-full rounded-t-xl">
        <thead class="bg-gray-50">
        <tr>
          <th class="h-14 first:rounded-tl-xl last:rounded-tr-xl w-1/5 text-left last:text-right px-4"
              v-for="head in headers">
            <template v-if="!loading">
              <span class="text-gray-500 font-bold text-xs w-full">{{ head }}</span>
            </template>
            <template v-else>
              <div class="w-3/4 h-5 loading"></div>
            </template>
          </th>
        </tr>
        </thead>
        <tr class="border-b border-gray-200" v-for="employee in employeeList">
          <td class="h-16 text-left px-4">
            <template v-if="!loadingTable">
              <span class="font-medium text-xs text-gray-900">{{ employee.nombre }}</span><br>
              <span class="font-normal text-[10px] text-gray-500">{{ employee.correo }}</span>
            </template>
            <template v-else>
              <div class="w-3/4 h-5 loading"></div>
            </template>
          </td>
          <td class="h-16 text-left px-4">
            <template v-if="!loadingTable">
              <span class="font-normal text-xs text-gray-900">{{ employee.cargo }}</span>
            </template>
            <template v-else>
              <div class="w-3/4 h-5 loading"></div>
            </template>
          </td>
          <td class="h-16 text-left px-4">
            <template v-if="!loadingTable">
              <span class="font-normal text-xs text-gray-900">{{ employee.departamento }}</span>
            </template>
            <template v-else>
              <div class="w-3/4 h-5 loading"></div>
            </template>
          </td>
          <td class="h-16 text-left px-4">
            <template v-if="!loadingTable">
              <span class="font-normal text-xs text-gray-900">{{ employee.oficina }}</span>
            </template>
            <template v-else>
              <div class="w-3/4 h-5 loading"></div>
            </template>
          </td>
          <td class="h-16 text-left px-4">
            <template v-if="!loadingTable">
              <span class="font-normal text-xs text-gray-900">{{ employee.estadoCuenta }}</span>
            </template>
            <template v-else>
              <div class="w-3/4 h-5 loading"></div>
            </template>
          </td>
          <td class="h-16 text-right px-4">
            <template v-if="!loadingTable">
              <div class="flex gap-[10px] h-full justify-end items-center">
                <div
                    class="bg-emerald-600 h-[30px] w-[30px] flex justify-center items-center rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg">
                  <icons-svg :type="'eye'"></icons-svg>
                </div>
                <div
                    class="bg-blue-600 h-[30px] w-[30px] flex justify-center items-center rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg">
                  <icons-svg :type="'edit'"></icons-svg>
                </div>
                <div
                    class="bg-red-500 h-[30px] w-[30px] flex justify-center items-center rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg">
                  <icons-svg :type="'delete'"></icons-svg>
                </div>

              </div>
            </template>
            <template v-else>
              <div class="w-32 h-5 loading"></div>
            </template>
          </td>
        </tr>
      </table>
    </div>

    <div v-if="!loading" class="flex justify-between items-center">
      <div class="flex items-center gap-6">
        <div @click="page = page-1" class="cursor-pointer" :class="{'pointer-events-none': page===1}">
          <icons-svg type="arrow-left" :active="page!==1" ></icons-svg>
        </div>
        <div class="flex">
          <template v-for="(item,index) in arrayPages">
            <div class="h-8 w-8 flex justify-center items-center text-gray-900 text-xs font-semibold cursor-pointer" :class="{'border border-emerald-600 rounded-full': index+1 === page}" @click="page = index + 1">
              {{index+1}}
            </div>
          </template>
        </div>
        <div @click="page = page+1" class="cursor-pointer" :class="{'pointer-events-none': page===arrayPages.length}">
          <icons-svg type="arrow-right" :active="page!==arrayPages.length"></icons-svg>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-xs text-gray-600 font-medium">Mostrando {{arrayPages[page-1][0]}} a {{arrayPages[page-1][1]}} de {{total}} registros</span>
        <div class="flex items-center gap-0.5">
          <span class="text-xs text-gray-900 font-medium">Mostrar</span>
          <select v-model="limit" class="text-xs text-gray-900 font-medium border-none">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
          </select>
        </div>
      </div>

    </div>

  </aside>

</template>

<style lang="css" scoped>
.loading {
  border-radius: 10px;
  animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }

}
</style>