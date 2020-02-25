import { SERVER, xmBuildSiteURL, yqStreetURL, yqXSQURL, yqSQURL, buildSiteIdentify, yqIdentify } from "./config/index";
import { loadModules } from "esri-loader";

/**
 * FeatureLayer
 * @param {*} context 
 * @param {*} item 
 */
const doMassFeatureLayer = (context, { url, id, renderer }) => {
    removeLayer(context, id); return new Promise((resolve, reject) => {
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
    removeLayer(context, id);
    return new Promise((resolve, reject) => {
        loadModules(
            ["esri/layers/FeatureLayer"]
        ).then(([FeatureLayer]) => {
            const option = { url, id, opacity: 0.8 }
            const img = new FeatureLayer(option);
            context.map.add(img, 1)
            resolve(true);
        })
    })
}

/**
 * 街道网格
 * @param {*} context 
 */
export const doYqStreetLayer = (context) => {
    doMassImageLayer(context, { url: yqStreetURL, id: "streetLayer" })
}
/**
 * 县市区网格
 * @param {*} context 
 */
export const doYqXSQLayer = (context) => {
    doMassImageLayer(context, { url: yqXSQURL, id: "xsqLayer" })
}
/**
 * 社区网格
 * @param {*} context 
 */
export const doYqXqLayer = (context) => {
    doMassImageLayer(context, { url: yqSQURL, id: "sqLayer" })
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
 * 优先级 企业点 > 村社 > 街道
 * @param {*} mapPoint 
 * @param {*} activeTabsPane 
 * @param {*} view 
 * @param {*} fn 
 */
export const fetchPoint = (tabsMenuData, mapPoint, view, fn) => {
    const _clone_ = obj => JSON.parse(JSON.stringify(obj));
    loadModules(
        ["esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters"]
    ).then(async ([IdentifyTask, IdentifyParameters]) => {
        const identifyResult = [, , ,];
        //  企业点
        if (tabsMenuData[0].check) {
            const identifyTask = new IdentifyTask(buildSiteIdentify);
            const params = new IdentifyParameters();
            params.layerIds = [0]
            params.tolerance = 5;
            params.geometry = mapPoint;
            params.mapExtent = view.extent;
            params.returnGeometry = true;
            const { results } = await identifyTask.execute(params);
            identifyResult[0] = results.length ? { ..._clone_(results[0].feature), type: 'point' } : undefined;
        }
        //  街道面 && 社区面
        if (tabsMenuData[2].check || tabsMenuData[3].check) {
            const identifyTask = new IdentifyTask(yqIdentify);
            const params = new IdentifyParameters();
            params.layerIds = [1, 2]
            params.tolerance = 5;
            params.geometry = mapPoint;
            params.mapExtent = view.extent;
            params.returnGeometry = true;
            params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            const { results } = await identifyTask.execute(params);
            results.length && results.map(({ feature, layerName }) => {
                const obj = { ..._clone_(feature), type: "polygon" };
                tabsMenuData[2].check && layerName == 'jd' && !identifyResult[2] && (identifyResult[2] = obj)
                tabsMenuData[3].check && layerName == 'cs' && !identifyResult[1] && (identifyResult[1] = obj)
            })
        }
        const result = identifyResult.filter(item => item);
        result.length && fn && fn(result[0]);
    });
}

/**
 * removeLayer
 * @param {*} context 
 * @param {*} id 
 */
export const removeLayer = (context, id) => {
    context.map.findLayerById(id) && context.map.remove(context.map.findLayerById(id));
}