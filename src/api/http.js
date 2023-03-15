import axios from "axios";

// axios 객체 생성
// localServer 통신
function localServer() {
  const axiosConfig = {
    baseURL: process.env.REACT_APP_SOCKET+"/api",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }
  const instance = axios.create(axiosConfig);

  instance.interceptors.request.use((config) => {
    if (!config.headers) return config;

    let token = null;

    // console.log(config.url);

    if (config.url === "/reissue") {
      token = sessionStorage.getItem('refresh-token');
    } else {
      token = sessionStorage.getItem('access-token');
    }
    // console.log(config);
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log(config);
    return config;
  });

  const getRefreshToken = async () => {
    try {
      const refreshToken = sessionStorage.getItem('refresh-token');
      const accessToken = sessionStorage.getItem('access-token');

      const { data } = await axios.post(
        "https://ssafychat.shop/api/reissue",
        {
          refreshToken: refreshToken,
          accessToken: accessToken,
        }
      );
      sessionStorage.setItem('access-token', data.accessToken);
      console.log(sessionStorage.getItem('access-token'));

      if (refreshToken !== null) {
        sessionStorage.setItem('refresh-token', refreshToken);
      }

      return data.accessToken;
    } catch (e) {
      sessionStorage.removeItem('access-token');
      sessionStorage.removeItem('refresh-token');
      alert("다시 로그인 해주세요. 권한이 없습니다.")
    }
  }

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const { config, response: { status } } = error;

      if (status !== 401){
        return Promise.reject(error);
      }

      // config.sent = true;
      const accessToken = await getRefreshToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return axios(config);
    }
  );

  return instance;
}

export { localServer };