import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userData: localStorage.getItem('userData') || null,
  }),

  actions: {
    setToken(token: string){
      this.token = token;
      localStorage.setItem('token', token);
    },

    clearToken(){
      this.token = null;
      localStorage.removeItem('token');
    },

    setUserData(userData: any){
      this.userData = userData;
      localStorage.setItem('userData', userData)
    },

    clearUserData(){
      this.userData = null;
      localStorage.removeItem('userData');
    }
  }
})