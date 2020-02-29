import {
  SERVER,
  xmBuildSiteURL,
  xmBuildColorURL,
  ssBuildColorURL,
  djdmBuildSiteURL,
  buildSiteIdentify,
  sjBuildColorURL
} from "./config/index";
import { loadModules } from "esri-loader";
const _URIS_ = {
  xm: [xmBuildSiteURL, "XMSZD", "SFYFG", "是"],
  qyhf: [djdmBuildSiteURL, "xmszd", "sffg", "是"],
  xxjd: [djdmBuildSiteURL, "STATE", "sffg", "是"],
  hyfl: [djdmBuildSiteURL, "constype2", "sffg", "是"]
};
/**
 * FeatureLayer
 * @param {*} context
 * @param {*} item
 */
const doMassFeatureLayer = (
  context,
  { url, id, definitionExpression = "1=1", renderer }
) => {
  context.map.findLayerById(id) &&
    context.map.remove(context.map.findLayerById(id));
  return new Promise((resolve, reject) => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const option = { url, id, definitionExpression };
      renderer && (option.renderer = renderer);
      const feature = new FeatureLayer(option);
      context.map.add(feature, 4);
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
 * 重点项目工地点
 * @param {*} context
 */
export const doPointLayer = context => {
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
    renderer
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
