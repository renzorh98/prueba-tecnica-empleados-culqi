import {useAxios} from '../composable/useAxios';

const {sendRequest} = useAxios()

export interface personObject {
  id: number,
  cargo: string,
  correo: string,
  departamento: string,
  estadoCuenta: string,
  nombre: string,
  oficina: string
}

export interface employeesResponseObject {
  total: number,
  status: string,
  data: personObject[]
}

export const login = async (correo: string, password: string) => {
  const apiConfig = {
    method: 'post',
    url: '/auth/login',
    data: {
      correo,
      password
    }
  };

  return await sendRequest(apiConfig);
};

export const getEmployees = async (limit: number = 10, page: number = 1) => {
  const apiCofing = {
    method: 'get',
    url: '/empleados',
    params: {
      limit,
      page
    }
  };

  return await sendRequest(apiCofing) as Promise<employeesResponseObject>;
};