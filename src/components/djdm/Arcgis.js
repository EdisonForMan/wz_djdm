import {
  SERVER,
  xmBuildSiteURL,
  xmBuildColorURL,
  ssBuildColorURL,
  djdmBuildSiteURL,
  buildSiteIdentify,
  sjBuildColorURL,
  djdmBuildColorURL
} from "./config/index";
import { loadModules } from "esri-loader";
const _URIS_ = {
  xm: [xmBuildSiteURL, "XMSZD", "SFYFG", "是"],
  qyhf: [djdmBuildSiteURL, "xmszd", "sffg", "是"],
  xxjd: [djdmBuildSiteURL, "STATE", "sffg", "是"],
  hyfl: [djdmBuildSiteURL, "constype2", "sffg", "是"]
};

//  筛选排除的字段
const BANNED_PARAMS = [
  "ID",
  "OBJECTID",
  "CODE_ID",
  "PROJECT_CODE",
  "ORIG_FID",
  "CODE_ID_1",
  "OBJECTID_1",
  "code_id_1"
];
/**
 * FeatureLayer
 * @param {*} context
 * @param {*} item
 */
const doMassFeatureLayer = (
  context,
  { url, id, definitionExpression = "1=1", renderer,fieldAliases }
) => {
  const _html_ = Object.keys(fieldAliases).filter(item => !BANNED_PARAMS.includes(item)).map(key => {
    return `<div><span>${fieldAliases[key]}</span><span>{${key}}</span></div>`
}).join("");

console.log("模板",_html_)
  context.map.findLayerById(id) &&
    context.map.remove(context.map.findLayerById(id));
  return new Promise((resolve, reject) => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const option = { url, id, definitionExpression };
      option.popupTemplate ={
        content: `<div class="djdmFrame">${_html_}</div>`
      }
      renderer && (option.renderer = renderer);
      const feature = new FeatureLayer(option);
      context.map.add(feature, 4);
      //添加图例
      context.legend.layerInfos.push({ layer:feature });
    });
  });
};
/**
 * FeatureLayer
 * @param {*} context
 * @param {*} item
 */
const doMassImageLayer = (context, { url, id }) => {
  context.map.findLayerById(id) &&
    context.map.remove(context.map.findLayerById(id));
  return new Promise((resolve, reject) => {
    loadModules(["esri/layers/MapImageLayer"]).then(([MapImageLayer]) => {
      const option = { url, id, opacity: 0.8 };
      const img = new MapImageLayer(option);
      context.map.add(img, 1);
      resolve(true);
    });
  });
};

/**
 * 亿元以上项目复工强度
 * @param {*} context
 */
export const doXmColorLayer = context => {
  doMassImageLayer(context, { url: xmBuildColorURL, id: "colorLayer" });
};
/**
 * 市重点项目复工强度
 * @param {*} context
 */
export const doSzColorLayer = context => {
  doMassImageLayer(context, { url: ssBuildColorURL, id: "colorLayer" });
};

/**
 * 省重点项目复工强度
 * @param {*} context
 */
export const doProvColorLayer = context => {
  doMassImageLayer(context, { url: sjBuildColorURL, id: "colorLayer" });
};

/**
 * 大建大美项目复工强度
 * @param {*} context
 */
export const doDjdmColorLayer = context => {
  doMassImageLayer(context, { url: djdmBuildColorURL, id: "colorLayer" });
};

/**
 * 重点项目工地点
 * @param {*} context
 */
export const doPointLayer = (context,fieldAliases) => {
  console.log("在Arcgis 中fieldAliases",fieldAliases)

  const activeTabsPane = context.$parent.$refs.leftMenu.activeTabsPane;
  const menu = context.$parent.$refs.leftMenu.tabsMenuData[activeTabsPane];
  const config = _URIS_[activeTabsPane];
  const keys = [
    ...new Set(
      menu.map(({ name, check }) => {
        return check ? `'${name}'` : "";
      })
    )
  ]
    .filter(s => s.trim())
    .join(",");
  const definitionExpression = menu.length
    ? `${config[1]} in (${keys})`
    : "1=1";
  const renderer = {
    type: "unique-value",
    field: config[2],
    valueExpression: `When($feature['${config[2]}'] == '${config[3]}', 'done' , 'other')`,
    uniqueValueInfos: [
      {
        value: "done",
        symbol: {
          type: "picture-marker",
          url: `${SERVER}/icon/yes.png`,
          width: 20,
          height: 20
        }
      },
      {
        value: "other",
        symbol: {
          type: "picture-marker",
          url: `${SERVER}/icon/no.png`,
          width: 20,
          height: 20
        }
      }
    ]
  };
  doMassFeatureLayer(context, {
    url: config[0],
    id: "PointLayer",
    definitionExpression,
    renderer,
    fieldAliases
  });
};

/**
 * 点击获取
 * @param {*} mapPoint
 * @param {*} activeTabsPane
 * @param {*} view
 * @param {*} fn
 */
export const fetchPoint = (mapPoint, activeTabsPane, view, fn) => {
  loadModules([
    "esri/tasks/IdentifyTask",
    "esri/tasks/support/IdentifyParameters"
  ]).then(async ([IdentifyTask, IdentifyParameters]) => {
    const identifyTask = new IdentifyTask(buildSiteIdentify);
    const params = new IdentifyParameters();
    params.layerIds = [activeTabsPane == "xm" ? 0 : 2];
    params.tolerance = 5;
    params.geometry = mapPoint;
    params.mapExtent = view.extent;
    params.returnGeometry = true;
    const { results } = await identifyTask.execute(params);
    results.length && fn && fn(results[0].feature);
  });
};

//view pop

export const doArcgisPopup = ({ view }, { attributes,  geometry }, fieldAliases) => {
  const _html_ = Object.keys(fieldAliases).filter(item => !BANNED_PARAMS.includes(item)).map(key => {
      return `<div><span>${fieldAliases[key]}:</span><span>${attributes[key]}</span></div>`
  }).join("");
  view.popup.open({
      content: `<div class="djdmFrame">${_html_}</div>`,
      location: geometry 
  });
}