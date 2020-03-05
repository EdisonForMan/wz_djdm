/* eslint-disable */
/**
 * Common function ,
 * add by eds 2019/7/6
 */

/**
 * arcgis portal token获取 支持包服务
 * @param {*} ajax $ajax对象
 * @param {*} url  arcgis portal url
 */
export default {
  fetchQuerys() {
    const querys = window.location.search.substring(1).split("&");
    const obj = {};
    querys.map(item => {
      const arr = item.split("=");
      if (arr.length == 2) {
        obj[arr[0]] = arr[1];
      }
    });
    return obj;
  },
  /**
   * token获取
   * @param
   */
  getGenerateToken: (ajax, GET_ARCGIS_TOKEN, fn) => {
    const tokenDeferred = ajax({
      type: "POST",
      url: GET_ARCGIS_TOKEN,
      data: {
        username: "portaladmin",
        password: "wzkcy123",
        client: "requestip",
        ip: "",
        referer: "",
        expiration: 60,
        f: "json"
      },
      dataType: "json"
    });
    tokenDeferred &&
      tokenDeferred.then(response => {
        if (response.code && response.code == 400) {
          fn(response.code);
        } else {
          fn(response);
        }
      });
  },
  /**
   * 获取cookie属性
   * @param {*} name
   */
  getCookie(name) {
    const teamStr = "MaX9493sw5w=";
    const sName = name + teamStr;
    var aCookie = document.cookie.replace(/\ /g, "").split(";");
    for (var i = 0; i < aCookie.length; i++) {
      var aCrumb = aCookie[i].split("=");
      if (sName == unescape(aCrumb[0])) return unescape(decodeURI(aCrumb[1]));
    }
    return "";
  },
  /**
   * 深拷贝
   * @param {*} obj
   */
  clone(data) {
    return deepClone(data);
  },
  /**
   * 按数组元素的属性
   * @param {*} propertyName
   */
  compare(propertyName) {
    return function(object1, object2) {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      if (value2 < value1) {
        return 1;
      } else if (value2 > value1) {
        return -1;
      } else {
        return 0;
      }
    };
  },
  /**
   * 设置本地存储
   * @param {*} key
   * @param {*} val
   * @param {*} isJson
   */
  setStorage(key, val, isJson = true) {
    window.localStorage.setItem(key, isJson ? JSON.stringify(val) : val);
  },
  /**
   * 获取本地存储
   * @param {*} val
   * @param {*} isJson
   */
  getStorage(val, isJson = true) {
    const localVal = window.localStorage.getItem(val);
    return isJson ? JSON.parse(localVal) : localVal;
  },
  /**
   *
   * @param {*} val
   * @param {*} isJson
   */
  removeStorage(key) {
    window.localStorage.removeItem(key);
  },
  getPolygonCenter(rings) {
    let x_ = 0,
      y_ = 0;
    rings[0].map(item => {
      x_ += item[0];
      y_ += item[1];
    });
    return { x: x_ / rings[0].length, y: y_ / rings[0].length };
  },
  /**
   * 时间戳转时间
   * @param {*} timestamp
   */
  timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return Y + M + D;
  },
  /**
   * 转数字
   * @param {*} val
   */
  toParseInt(val) {
    const num = parseInt(val);
    return val ? (num ? num : 0) : 0;
  }
};

function deepClone(data) {
  if (!data || !(data instanceof Object) || typeof data == "function") {
    return data || undefined;
  }
  var constructor = data.constructor;
  var result = new constructor();
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      result[key] = deepClone(data[key]);
    }
  }
  return result;
}
