import {ref} from "vue";
import axios from "axios";
import {useAuthStore} from "../store/auth.ts";

const axiosInstance = axios.create({
  baseURL: 'https://fepruebatecnicaculqi-backend-production.up.railway.app/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const useAxios = () => {
  const loading = ref(false);
  const error = ref();

  const sendRequest = async (config: {method: string, url: string, params?:any, data?: any}) => {
    const authStore= useAuthStore()

    if (authStore.token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
    }else{
      delete axiosInstance.defaults.headers.common['Authorization']
    }

    try{
      loading.value = true;
      const response = await axiosInstance(config);
      return response.data
    }catch (err){
      error.value = err;
      console.error(err);
    }finally {
      loading.value = false;
    }
  };

  return { loading, error, sendRequest };
};

export{
  useAxios
};
