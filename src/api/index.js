/**
 * [api]标准接口处理
 * token = sessionStorage.getItem('access_token')
 * lng = sessionStorage.getItem('access_lng')
 */

import axios from "axios";
import { WRT_config } from "@/components/common/Tmap";

let defaultAxios = null;

export function getDefaultAxios() {
  if (!defaultAxios) {
    defaultAxios = getAxiosInstance();
  }
  return defaultAxios;
}

/**
 * 获取Axios实例对象
 * [timeout] 30,000 ms超时
 */
function getAxiosInstance() {
  const instance = axios.create();
  // instance.defaults.baseURL =
  //   window.env == "dev" ? "/api" : `${WRT_config.serverCompatible}/api`;
  instance.defaults.baseURL = `${WRT_config.serverCompatible}/api`;
  instance.defaults.headers.post["Content-Type"] = "multipart/form-data";
  instance.interceptors.request.use(
    config => {
      if (config.method === "post") {
        if (typeof config.data === "object" && !config.data.etag) {
          config.data.etag = WRT_config.etag;
        }
      }
      if (config.method === "get") {
        if (typeof config.params === "object" && !config.params.etag) {
          config.params.etag = WRT_config.etag;
        }
      }
      /**
       * token添加
       * env = dev || outside  => outside@token_access
       * env = prod  => token_access
       */
      if (config.data && config.data.noToken) {
      } else {
        const token = window.shallLogin
          ? localStorage.getItem("auto@access_token")
          : localStorage.getItem("access_token");
        if (token) {
          config.headers["Authorization"] = token;
        } else if (config.headers["Authorization"]) {
          delete config.headers["Authorization"];
        }
      }
      return config;
    },
    err => {
      // 请求超时!
      return Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    data => {
      if (data.errors) {
        // 处理错误？？
      }
      return data.data;
    },
    err => {
      //==============  错误处理  ====================
      if (err && err.response) {
        if (err.response.data && err.response.data.errors) {
          err.message = err.response.data.errors[0].title;
        }
        if (err.response.status) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误(400)";
              break;
            case 401:
              err.message = "未授权，请重新登录(401)";
              console.log(`[unavailable acount] return to Login Page`);
              if (!window.shallLogin) {
                window.location = `${WRT_config.login ||
                  WRT_config.serverCompatible}/index.html`;
              }
              break;
            case 403:
              err.message = "拒绝访问(403)";
              break;
            case 404:
              err.message = "请求出错(404)";
              break;
            case 408:
              err.message = "请求超时(408)";
              break;
            case 500:
              err.message = "服务器错误(500)";
              break;
            case 501:
              err.message = "服务未实现(501)";
              break;
            case 502:
              err.message = "网络错误(502)";
              break;
            case 503:
              err.message = "服务不可用(503)";
              break;
            case 504:
              err.message = "网络超时(504)";
              break;
            case 505:
              err.message = "HTTP版本不受支持(505)";
              break;
            default:
              err.message = `连接出错(${err.response.status})!`;
          }
        }
      } else {
        err.message = "连接服务器失败!";
      }
      // hint(err)
      return Promise.reject(err);
    }
  );
  return instance;
}

export default getAxiosInstance;
