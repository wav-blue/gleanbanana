//401에러 엑세스x ->> 리프레시토큰으로 엑세스 토큰 발급
import axios from "axios";

const config = {
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
};

export const api = axios.create(config); // 인스턴스

// //refresh token api
export async function postRefreshToken() {
  const autorizationData = `Bearer ${localStorage.getItem("refreshToken")}`;
  const response = await api.post("/accessToken", {
    Authorization: autorizationData,
  });
  console.log(response, "acessToken으로의 요청결과!");
  return response;
}

// [Client] ------[ Interceptor ] -----> [Server]
api.interceptors.request.use(
  (req) => {
    console.log(req.method, "요청보냅니다!", req.url);
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
    console.log(res);
    return res;
  },
  async (err) => {
    const { response } = err;
    const { status, data } = response;
    console.log({ status, data }, "에러!!!");

    //토큰 만료시 재발급 로직
    if (response && status === 401 && data === "Access token이 존재하지 않음") {
      //엑세스 토큰 없을 때 (만료로 삭제 )
      console.log("에러응답. 상태는 401입니다.");
      console.log(data, "message");
      if (data === "Access Token의 정보가 서버에 존재하지 않습니다.") {
        const originRequest = config;
        try {
          //리프레시 토큰 api
          const response = await postRefreshToken();
          //리프레시 토큰 요청이 성공할 때
          console.log(response);
          if (response.status === 201) {
            console.log(response.status);
            //응답이 {Authorization : Bearer 토큰}
            const newAccessToken = response.data.Authorization.split(" ")[1];
            console.log(newAccessToken, "newAccessTokens");
            //refreshToken 만료시간에 동일한 localStorage 만료시간??
            localStorage.setItem("refreshToken", response.data.Authorization);
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            //진행중이던 요청 이어서하기???
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originRequest);
            //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
          }
        } catch (refreshError) {
          console.log(refreshError); //어떤 키값이 있는지 // response가 없다 ...?
          console.log(refreshError.response.status);
          if (
            refreshError.response.status === 404 &&
            data === "Access Token의 정보가 서버에 존재하지 않습니다."
          ) {
            //엑세스 토큰 만료(쿠키 없을 때) => 쿠키만료시간확인
            alert("로그인 정보가 없습니다.");
            window.location.replace("/login");
            return;
          }
        }
      }
    }

    if (response && status === 404) {
    }

    if (response && status === 419) {
      console.log(status, "419에러!");
      console.log(data);
      if (data === "Access Token 만료") {
        const originRequest = config;
        try {
          //리프레시 토큰 api
          const response = await postRefreshToken();
          //리프레시 토큰 요청이 성공할 때
          console.log(response);
          if (response.status === 201) {
            console.log(response.status);
            //응답이 {Authorization : Bearer 토큰}
            const newAccessToken = response.data.Authorization.split(" ")[1];
            console.log(newAccessToken, "newAccessTokens");
            //refreshToken 만료시간에 동일한 localStorage 만료시간??
            localStorage.setItem("refreshToken", response.data.Authorization);
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            //진행중이던 요청 이어서하기???
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originRequest);
            //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
          }
        } catch (refreshError) {
          console.log(refreshError); //어떤 키값이 있는지 // response가 없다 ...?
          console.log(refreshError.response.status);
          if (
            refreshError.response.status === 404 &&
            data === "Access Token의 정보가 서버에 존재하지 않습니다."
          ) {
            //엑세스 토큰 만료(쿠키 없을 때) => 쿠키만료시간확인
            alert("로그인 정보가 없습니다.");
            window.location.replace("/login");
            return;
          }
        }
      }
    }

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
