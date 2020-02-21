/* eslint-disable */

/**
 * [api]标准接口处理
 * token = sessionStorage.getItem('auto@access_token')
 */
import Vue from "vue";
import axios from "axios";
import { WRT_config } from "@/components/common/Tmap";

let defaultAxios = null,
  arcgisAxios = null;

export function getDefaultAxios() {
  if (!defaultAxios) {
    defaultAxios = getAxiosInstance();
  }
  return defaultAxios;
}

export function getArcgisAxios() {
  if (!arcgisAxios) {
    arcgisAxios = getArcgisAxiosInstance();
  }
  return arcgisAxios;
}

/**
 * 获取Axios实例对象
 * [timeout] 30,000 ms超时
 */
function getAxiosInstance() {
  const instance = axios.create();
  instance.defaults.baseURL = `${WRT_config.serverCompatible}/api`;
  instance.defaults.headers.post["Content-Type"] = "multipart/form-data";
  instance.interceptors.request.use(
    config => {
      const option = config.data;
      if (config.method === "post") {
        config.data.etag = WRT_config.etag;
        config.data.res = option.res || "testsql_space";
      }
      if (config.method === "get") {
        config.params.etag = WRT_config.etag;
        config.params.res = option.res || "testsql_space";
      }
      const token = localStorage.getItem("auto@access_token");
      if (token && !config.url.includes("token")) {
        config.headers["Authorization"] = token;
      } else if (config.headers["Authorization"]) {
        delete config.headers["Authorization"];
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
        if (err.response.status) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误(400)";
              break;
            case 401:
              err.message = "未授权，请重新登录(401)";
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
        if (err.response.data && err.response.data.errors) {
          err.message = err.response.data.errors[0].title;
        }
      } else {
        err.message = "连接服务器失败!";
      }
      window._vue_ &&
        window._vue_.$bvToast.toast(err.message, {
          title: "错误",
          toaster: "b-toaster-top-left",
          autoHideDelay: 5000,
          appendToast: false
        });
      // hint(err)
      return Promise.reject(err);
    }
  );
  return instance;
}

function getArcgisAxiosInstance() {
  const instance = axios.create();
  instance.defaults.headers.get["Content-Type"] = "multipart/form-data";
  return instance;
}
