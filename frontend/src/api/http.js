import axios from "axios";

import { reissue } from "./userAxios";

// axios 객체 생성
// localServer 통신
function localServer() {
  // console.log(process.env.REACT_APP_SOCKET);
  const axiosConfig = {
    // baseURL: 'https://jobtender.shop/api',
    baseURL: 'http://localhost:8000/',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }
  const instance = axios.create(axiosConfig);

  instance.interceptors.request.use(async (config) => {
    if (!config.headers) return config;

    config.withCredentials = true;

    // try{
    //   const { data } = await reissue();
    //   if(data.status === 200){
    //     return axios(config);
    //   }
    // } catch (error){
    //   console.log(error);
    // }

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const { config, response: { status } } = error;

      if (status === 401){
        sessionStorage.removeItem("isLogin");
      }
    }
  );

  return instance;
}

function loginServer() {
  const axiosConfig = {
    baseURL: 'http://localhost:8000/',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }
  return axios.create(axiosConfig);
}

function pythonServer() {
  const axiosConfig = {
    baseURL: 'http://localhost:8001/',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }
  return axios.create(axiosConfig);
}

export { localServer, pythonServer, loginServer };