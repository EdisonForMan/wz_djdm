import { getDefaultAxios } from "../index.js";
/**
 * 自主登录接口
 * 使用低权限账号保证对外界面可以访问2.0后台数据接口
 * @param {*} params
 * @param {*} axios
 */
export async function auth_token(username = "游客", axios) {
  axios = axios || getDefaultAxios();
  const { data } = await axios.post("/au/token", {
    username,
    password: "123",
    noToken: true,
    res: "testsql_all"
  });
  //    对外招商token
  localStorage.setItem("auto@access_token", data[0].access_token);
}
