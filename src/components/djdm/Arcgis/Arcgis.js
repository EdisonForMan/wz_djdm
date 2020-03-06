import {
  xmBuildSiteURL,
  yqStreetURL,
  yqXSQURL,
  yqSQURL,
  yqFWURL,
  yqFJURL
} from "../config/index";
import { loadModules } from "esri-loader";
import { BANNED_PARAMS, BANNED_PARAMS_COMPANY } from "./banned";
/**
 * FeatureLayer
 * @param {*} context
 * @param {*} item
 */
const doMassFeatureLayer = (context, { url, id }, shallTop = true) => {
  const { fieldAliases } = context.xmFieldAliases.filter(
    item => item.id == id
  )[0];
  const _html_ = Object.keys(fieldAliases)
    .filter(
      item =>
        !BANNED_PARAMS.includes(item) && !BANNED_PARAMS_COMPANY.includes(item)
    )
    .map(key => {
      return `<div><span>${fieldAliases[key]}</span><span>{${key ||
        ""}}</span></div>`;
    })
    .join("");
  return new Promise((resolve, reject) => {
    if (context.map.findLayerById(id)) {
      //  存在图层,设置visible
      context.map.findLayerById(id).visible = true;
      context.map.findLayerById(`${id}Img`).visible = true;
      resolve(true);
    } else {
      //  不存在图层,生成图层
      loadModules([
        "esri/layers/FeatureLayer",
        "esri/layers/MapImageLayer"
      ]).then(([FeatureLayer, MapImageLayer]) => {
        //  image
        const imageURL = url.replace(/\/[0-9]$/, "");
        const endParam = url.match(/\/[0-9]$/);
        const optionImg = {
          url: imageURL,
          id: `${id}Img`
        };
        endParam.length &&
          (optionImg.sublayers = [{ id: endParam[0].replace(/\//i, "") }]);
        const imgLayer = new MapImageLayer(optionImg);
        context.map.add(imgLayer, shallTop ? 9 : 1);
        //  feature
        const option = { url, id, opacity: 0, labelsVisible: false };
        id != "xsqLayer" &&
          (option.popupTemplate = {
            content: `<div class="yqPopFrame">${_html_}</div>`
          });
        const layer = new FeatureLayer(option);
        context.map.add(layer, shallTop ? 10 : 2);
        context.legend.layerInfos.push({ layer });
        resolve(true);
      });
    }
  });
};
/**
 * basic server graphic
 * @param {*} context
 * @param {*} param1 配置信息
 * @param {*} sub 图层
 */
const doBasicLayer = (context, { url, id }, sub = []) => {
  loadModules(["esri/layers/MapImageLayer"]).then(([MapImageLayer]) => {
    const option = { url, id };
    sub &&
      sub.length &&
      (option.sublayers = sub.map(id => {
        return { id };
      }));
    const basicLayer = new MapImageLayer(option);
    context.map.add(basicLayer, 2);
  });
};
/**
 * 重点项目
 * @param {*} context
 */
export const doPointLayer = context => {
  doMassFeatureLayer(context, { url: xmBuildSiteURL, id: "PointLayer" });
};
/**
 * 服务业
 * @param {*} context
 */
export const doYqFWLayer = context => {
  doMassFeatureLayer(context, { url: yqFWURL, id: "fwLayer" });
};
/**
 * 房建项目
 * @param {*} context
 */
export const doYqFJLayer = context => {
  doMassFeatureLayer(context, { url: yqFJURL, id: "fjLayer" });
};
/**
 * 街道网格
 * @param {*} context
 */
export const doYqStreetLayer = context => {
  doMassFeatureLayer(context, { url: yqStreetURL, id: "streetLayer" }, false);
};
/**
 * 县市区网格\蒙黑
 * @param {*} context
 */
export const doYqXSQLayer = context => {
  doBasicLayer(context, { url: yqXSQURL, id: "xsqLayer" }, [3, 0]);
};
/**
 * 社区网格
 * @param {*} context
 */
export const doYqXqLayer = context => {
  doMassFeatureLayer(context, { url: yqSQURL, id: "sqLayer" }, false);
};

/**
 * 手动弹框
 * @param {*} view
 * @param {*} obj
 * @param {*} fieldAliases 枚举
 */
export const doArcgisPopup = (
  { view, $util },
  { attributes, type, geometry },
  fieldAliases
) => {
  const _html_ = Object.keys(fieldAliases)
    .filter(
      item =>
        !BANNED_PARAMS.includes(item) && !BANNED_PARAMS_COMPANY.includes(item)
    )
    .map(key => {
      return `<div><span>${fieldAliases[key]}</span><span>${attributes[key] ||
        ""}</span></div>`;
    })
    .join("");
  view.popup.open({
    content: `<div class="yqPopFrame">${_html_}</div>`,
    location:
      type == "point" ? geometry : $util.getPolygonCenter(geometry.rings)
  });
};

/**
 * 坐标偏移
 * @param {*} param0
 * @param {*} param1
 */
export const doLocation = (geometry, [ax = 0, ay = 0]) => {
  return { ...geometry, x: x + ax, y: y + ay };
};

/**
 * removeLayer
 * @param {*} context
 * @param {*} id
 */
export const removeLayer = (context, id) => {
  if (context.map.findLayerById(id)) {
    context.map.findLayerById(`${id}Img`).visible = false;
    context.map.findLayerById(id).visible = false;
  }
};
