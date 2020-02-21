/* eslint-disable */
import { getDefaultAxios, getArcgisAxios } from "@/api/index.js";
/**
 * 更新\插入空间信息
 * @param {*} sql SQL语句
 */
export async function updateDataStores(sql) {
  const axios = getDefaultAxios();
  console.log("[sql]", sql);
  return await axios.post("/etl/sql_all", {
    sql
  });
}
/**
 * 获取空间信息
 * @param {*} param0 
 */
export async function fetchArcgisServer({ where = "1=1", url }) {
  const axios = getArcgisAxios();
  return await axios.get(`${url}/query`, {
    params: {
      f: "json",
      outFields: "*",
      spatialRel: "esriSpatialRelIntersects",
      where,
      relationParameter: (+new Date()).toString()
    }
  });
}
