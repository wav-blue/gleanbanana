import axios from "axios";

const config = {
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  timeout: 5000,
};

export const api = axios.create(config); // 인스턴스

// //refresh token api
// export async function postRefreshToken() {
//   const response = await api.post("/refresh", {
//     user_id: localStorage.getItem("refreshToken"),
//   });
//   return response;
// }

// [Client] ------[ Interceptor ] -----> [Server]
api.interceptors.request.use(
  (req) => {
    //요청 data가 formData일때
    if (req.data && req.data instanceof FormData) {
      console.log("form데이터를 보내는 통신 시작");
      req.headers["Content-Type"] = "multipart/form-data";
    }
    //요청 data가 Object일 때
    else if (req.data && req.data instanceof Object) {
      console.log("object를 보내는 통신 시작");
      req.headers["Content-Type"] = "application/json";
    }

    return req;
  },
  (err) => {
    console.log("인터셉터에서 요청에러", err);
  }
);

// [Client] <------[ Interceptor ] ----- [Server]

api.interceptors.response.use(
  (res) => {
    // console.log("응답이 도착했음", res);
    // alert("요청에 성공했습니다!");
    return res;
  },
  async (err) => {
    console.log("인터셉터에서 응답에러", err);
    // const {
    //   config,
    //   response: { status },
    // } = err;
    // if (status === 401) {
    //   if (err.response.data.message === "Unauthorized") {
    //     const originRequest = config;
    //     //리프레시 토큰 api
    //     const response = await postRefreshToken();
    //     //리프레시 토큰 요청이 성공할 때
    //     if (response.status === 200) {
    //       const newAccessToken = response.data.token;
    //       localStorage.setItem("accessToken", response.data.token);
    //       localStorage.setItem("refreshToken", response.data.refreshToken);
    //       axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
    //       //진행중이던 요청 이어서하기
    //       originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //       return axios(originRequest);
    //       //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
    //     } else if (response.status === 404) {
    //       alert("로그인이 만료되었습니다. 다시 로그인해주세요");
    //       window.location.replace("/login");
    //     } else {
    //       alert("????");
    //     }
    //   }
    // }
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
