import Axios from "axios";
// import store from "@/store";

/**
 * 取消重複請求
 */
const pendingMap = new Map();

// 生成每個請求唯一的 Key
function getPendingKey(config) {
  const { url, method, parems } = config;
  let { data } = config;

  if (typeof data === "string") data = JSON.parse(data);
  return [url, method, JSON.stringify(parems), JSON.stringify(data)].join(" ");
}

// 儲存每個請求唯一值，也就是 cancel() 方法，用于取消請求
function addPending(config) {
  const CONFIG = config;
  const pendingKey = getPendingKey(CONFIG);
  CONFIG.cancelToken =
    CONFIG.cancelToken ||
    new Axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

// 刪除重複請求
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

function httpErrorStatusHandle(error) {
  let message = "";

  if (Axios.isCancel(error)) return console.log(`重複請求 ${error.message}`);

  if (error.response?.data?.error) {
    message = error.response.data.error;
  } else if (error.message.includes("timeout")) {
    message = "Timeout";
  } else if (error.message.includes("Network")) {
    message = window.navigator.onLine ? "Server異常" : "請重新連網";
  } else {
    message = error.message;
  }

  return null;

  // store.dispatch("app/addToast", {
  //   type: "Error",
  //   message
  // });
}

/**
 * Axios 設定
 */
const service = Axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
  withCredentials: false,
  timeout: 30000
});

service.interceptors.request.use(
  (config: any) => {
    removePending(config);
    addPending(config);

    // const loading: number = store.getters["app/loading"];
    // store.commit("app/setLoading", loading + 1);
    // config.headers['Route'] = 'Mem'

    // const token =
    //   window.localStorage.getItem('accessToken') ??
    //   store.getters['persistedState/token']
    // if (token) {
    //   config.headers['authorization'] = 'Bearer ' + token
    //   config.headers['authorization'] = token
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    removePending(response.config);

    // const loading: number = store.getters["app/loading"];
    // store.commit("app/setLoading", loading - 1);

    if (response.status === 200 && response.data) {
      const { data } = response as any;
      return data.result;
    }
    return response;
  },
  (error) => {
    error.config && removePending(error.config);

    // const loading: number = store.getters["app/loading"];
    // store.commit("app/setLoading", loading - 1);

    httpErrorStatusHandle(error);

    return Promise.reject(error);
  }
);

export default service;
