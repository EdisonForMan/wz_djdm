/* eslint-disable */
import { getDefaultAxios } from "@/api/index.js";

/**
 * 修改信息,设置空间化字段located为true
 * @param {*} table
 * @param {*} key
 * @param {*} isNan
 * @param {*} val
 */
export async function updateLocatedTrue(table, key, isNan, val) {
  const axios = getDefaultAxios();
  console.log(`set [${table}] isspace`);
  return await axios.post("/etl/sql_all", {
    res: "testsql_all",
    sql: `UPDATE ${table} SET isspace = 1 WHERE ${key} = ${
      isNan ? val : `'${val}'`
    }`
  });
}
/**
 * 获取信息
 * @param {*} _option 额外配置
 * @param {*} hash    业务表
 */
async function fetchDataStores({ where, table, cols }) {
  const axios = getDefaultAxios();
  const option = {
    module: "dwbean",
    action: "001",
    count: 1,
    res: "testsql_all",
    ds: {
      buffers: [],
      tables: [
        {
          alias: "a",
          orm: "",
          name: table
        }
      ],
      cols,
      module: "testsql_all",
      where
    }
  };
  return await axios.post("/dw/ds", option);
}

export default fetchDataStores;
