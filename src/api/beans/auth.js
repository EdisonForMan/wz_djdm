import { getDefaultAxios } from "../index.js";
import { WRT_config } from "@/components/common/Tmap";
const { serverCompatible, login } = WRT_config;
/**
 * 自主登录接口
 * 使用低权限账号保证对外界面可以访问2.0后台数据接口
 * @param {*} params
 * @param {*} axios
 */
export async function auth_token(username = "admin", axios) {
  axios = axios || getDefaultAxios();
  const { data } = await axios.post("/au/token", {
    username,
    password: "123",
    noToken: true
  });
  //    对外招商token
  localStorage.setItem("auto@access_token", data[0].access_token);
}
/**
 * 用户信息获取
 * @param {*} params
 * @param {*} axios
 */
export async function auth_token_info(params, axios) {
  axios = axios || getDefaultAxios();
  let data = [{ au_username: null, group: [] }];
  try {
    const response = await axios.get("/au/token/info?res=testsql_all", {
      noToken: false
    });
    data = response.data;
  } catch (err) {
    console.log(`[unavailable acount] return to Login Page`);
    if (!window.shallLogin) {
      window.location = `${login || serverCompatible}/index.html`;
    }
  }
  return data;
}
/**
 * 用户验证接口
 * @param {*} username  用户名
 * @param {*} password  现密码
 */
export async function auth_verify(username, password) {
  const axios = getDefaultAxios();
  try {
    const { data } = await axios.post("/au/token", {
      username,
      password,
      noToken: true
    });
    return data.length && data[0].au_username == username;
  } catch (err) {
    console.log(err);
    return false;
  }
}
/**
 * 用户验证接口
 * @param {*} password  新密码
 * @param {*} au_userid  userid
 */
export async function passport_update(password, au_userid) {
  const axios = getDefaultAxios();
  const { data } = await axios.put(`/au/users/${au_userid}/psd/change`, {
    new_psd: password,
    noToken: false
  });
  return true;
}
//新增数据
export async function addDataStores(table, params, axios) {
  axios = axios || getDefaultAxios();
  return await axios.post("/dw/datastores/" + table, params);
}

//修改数据
export async function updateDataStores(table, params, axios) {
  axios = axios || getDefaultAxios();
  return await axios.post("/dw/datastores/" + table, params);
}

//查询数据
export async function getDataStores(params, axios) {
  axios = axios || getDefaultAxios();
  return await axios.post("/dw/datastores", params);
}
