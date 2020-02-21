import { SERVER, xmBuildSiteURL, djdmBuildSiteURL } from "./config/index";
import { loadModules } from "esri-loader";

/**
 * 图层叠加
 * @param {*} context 
 * @param {*} item 
 */
const doMassLayer = (context, { url, id, definitionExpression = "1=1", renderer }) => {
    context.map.findLayerById(id) && context.map.remove(context.map.findLayerById(id));
    return new Promise((resolve, reject) => {
        loadModules(
            ["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"]
        ).then(([FeatureLayer, MapImageLayer]) => {
            const layer = FeatureLayer;
            const option = { url, id, definitionExpression }
            renderer && (option.renderer = renderer)
            const feature = new layer(option);
            context.map.add(feature, 3)
        })
    })
}

/**
 * 项目点
 * @param {*} context 
 */
export const doXmLayer = (context) => {
    const menu = context.$parent.$refs.leftMenu.tabsMenuData['xm'];
    const keys = [...new Set(context.$parent.$refs.leftMenu.tabsMenuData['xm'].map(({ name, check }) => {
        return check ? `'${name}'` : '';
    }))].filter(s => s.trim()).join(",");
    const definitionExpression = menu.length ? `GDD.XMSZD in (${keys})` : "1=1";
    const renderer = {
        type: "unique-value",
        field: "GDD.SFYFG",
        valueExpression: "When($feature['GDD.SFYFG'] == '是', 'done' , 'other')",
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
    doMassLayer(context, { url: xmBuildSiteURL, id: "xmLayer", definitionExpression, renderer })
}