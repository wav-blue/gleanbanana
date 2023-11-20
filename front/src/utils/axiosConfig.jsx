import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_API_BASE_URL + "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
  withCredentials: true,
};

export const api = axios.create(config); // 인스턴스

// [Client] ------[ Interceptor ] -----> [Server]
api.interceptors.request.use(
  (req) => {
    //요청 data가 formData일때
    if (req.data && req.data instanceof FormData) {
      console.log("form데이터를 보냅니다. ");
      req.headers["Content-Type"] = "multipart/form-data";
    }
    //요청 data가 Object일 때
    else if (req.data && req.data instanceof Object) {
      console.log("object를 보냅니다");
      req.headers["Content-Type"] = "application/json";
    }

    return req;
  },
  (err) => {
    console.log("인터셉터에서 잡은", err);
  }
);

// [Client] <------[ Interceptor ] ----- [Server]

api.interceptors.response.use(
  (res) => {
    // console.log("응답이 도착했음", res);
    // alert("요청에 성공했습니다!");
    return res;
  },
  (err) => {
    console.log("인터셉터에서 잡은", err);
    throw new Error("잘못된 요청입니다");
  }
);

const getFetcher = async (path, params) => {
  return await api.get(path, { params });
};
const postFetcher = async (path, body) => {
  return await api.post(path, body);
};
const patchFetcher = async (path, body) => {
  return await api.put(path, body);
};
const putFetcher = async (path, body) => {
  return await api.put(path, body);
};
const deleteFetcher = async (path, params) => {
  return await api.delete(path, { params });
};

export const API_FETCHER = {
  get: (...args) => getFetcher(...args),
  post: (...args) => postFetcher(...args),
  put: (...args) => putFetcher(...args),
  patch: (...args) => patchFetcher(...args),
  delete: (...args) => deleteFetcher(...args),
};

export default api;
