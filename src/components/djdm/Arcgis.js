import { SERVER, xmBuildSiteURL, xmBuildColorURL, djdmBuildSiteURL } from "./config/index";
import { loadModules } from "esri-loader";
const _URIS_ = {
    xm: [xmBuildSiteURL, "GDD.XMSZD", "GDD.SFYFG", "是"],
    qyhf: [djdmBuildSiteURL, "djdm_xm.xmszd", "djdm_xm.sffg", "是"],
    xxjd: [djdmBuildSiteURL, "xm_point.STATE", "djdm_xm.sffg", "是"],
    hyfl: [djdmBuildSiteURL, "djdm_xm.constype2", "djdm_xm.sffg", "是"]
}
/**
 * FeatureLayer
 * @param {*} context 
 * @param {*} item 
 */
const doMassFeatureLayer = (context, { url, id, definitionExpression = "1=1", renderer }) => {
    context.map.findLayerById(id) && context.map.remove(context.map.findLayerById(id));
    return new Promise((resolve, reject) => {
        loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
            const option = { url, id, definitionExpression }
            renderer && (option.renderer = renderer)
            const feature = new FeatureLayer(option);
            context.map.add(feature, 3)
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
            const option = { url, id }
            const img = new MapImageLayer(option);
            context.map.add(img, 2)
        })
    })
}

/**
 * 重点项目五色图
 * @param {*} context 
 */
export const doXmColorLayer = (context) => {
    doMassImageLayer(context, { url: xmBuildColorURL, id: "xmColorLayer" })
}

/**
 * 重点项目工地点
 * @param {*} context 
 */
export const doPointLayer = (context) => {
    const activeTabsPane = context.$parent.$refs.leftMenu.activeTabsPane;
    const menu = context.$parent.$refs.leftMenu.tabsMenuData[activeTabsPane];
    const config = _URIS_[activeTabsPane];
    const keys = [...new Set(menu.map(({ name, check }) => {
        return check ? `'${name}'` : '';
    }))].filter(s => s.trim()).join(",");
    const definitionExpression = menu.length ? `${config[1]} in (${keys})` : "1=1";
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
    }
    doMassFeatureLayer(context, { url: config[0], id: "PointLayer", definitionExpression, renderer })
}