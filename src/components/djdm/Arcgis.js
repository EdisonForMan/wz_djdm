import { SERVER, xmBuildSiteURL, yqStreetURL, ssBuildColorURL, djdmBuildSiteURL, buildSiteIdentify } from "./config/index";
import { loadModules } from "esri-loader";
const _URIS_ = {
    xm: [xmBuildSiteURL, "XMSZD", "SFYFG", "是"],
    qyhf: [djdmBuildSiteURL, "xmszd", "sffg", "是"],
    xxjd: [djdmBuildSiteURL, "STATE", "sffg", "是"],
    hyfl: [djdmBuildSiteURL, "constype2", "sffg", "是"]
}
/**
 * FeatureLayer
 * @param {*} context 
 * @param {*} item 
 */
const doMassFeatureLayer = (context, { url, id, renderer }) => {
    context.map.findLayerById(id) && context.map.remove(context.map.findLayerById(id));
    return new Promise((resolve, reject) => {
        loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
            //  地址用老金发的，彤彤发的叠不出来，但数据是彤彤的服务拿的
            const option = { url: "http://172.20.89.87:6080/arcgis/rest/services/yueqing/yqgsqy/MapServer/0", id }
            const feature = new FeatureLayer(option);
            context.map.add(feature, 4)
            resolve(true);
        })
    })
}
/**
 * FeatureLayer
 * @param {*} context 
 * @param {*} item 
 */
const doMassImageLayer = (context, { url, id }) => {
    context.map.findLayerById(id) && context.map.remove(context.map.findLayerById(id));
    return new Promise((resolve, reject) => {
        loadModules(
            ["esri/layers/MapImageLayer"]
        ).then(([MapImageLayer]) => {
            const option = { url, id, opacity: 0.8 }
            const img = new MapImageLayer(option);
            context.map.add(img, 1)
            resolve(true);
        })
    })
}

/**
 * 亿元以上项目五色图
 * @param {*} context 
 */
export const doYqStreetLayer = (context) => {
    doMassImageLayer(context, { url: yqStreetURL, id: "colorLayer" })
}
/**
 * 省市重点项目五色图
 * @param {*} context 
 */
export const doSzColorLayer = (context) => {
    doMassImageLayer(context, { url: ssBuildColorURL, id: "colorLayer" })
}

/**
 * 重点项目工地点
 * @param {*} context 
 */
export const doPointLayer = (context) => {
    doMassFeatureLayer(context, { url: xmBuildSiteURL, id: "PointLayer" })
}

/**
 * 点击获取
 * @param {*} mapPoint 
 * @param {*} activeTabsPane 
 * @param {*} view 
 * @param {*} fn 
 */
export const fetchPoint = (mapPoint, view, fn) => {
    loadModules(
        ["esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters"]
    ).then(async ([IdentifyTask, IdentifyParameters]) => {
        const identifyTask = new IdentifyTask("http://172.20.89.87:6080/arcgis/rest/services/yueqing/yqgsqy/MapServer");
        const params = new IdentifyParameters();
        params.layerIds = [0]
        params.tolerance = 5;
        params.geometry = mapPoint;
        params.mapExtent = view.extent;
        params.returnGeometry = true;
        const { results } = await identifyTask.execute(params);
        results.length && fn && fn(results[0].feature)
    });
}