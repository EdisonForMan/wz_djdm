/**
 * [api.base]
 */
import { getDefaultAxios } from "@/api/index.js";
const res = "testsql_lc";
async function fetch(ds = {}) {
  const axios = getDefaultAxios();
  return await axios.post("/api/dw/ds", { res, ds });
}

export default fetch;