import { SERVER, xmBuildSiteURL, yqStreetURL, yqXSQURL, yqSQURL, yqFWURL, buildSiteIdentify, yqIdentify, yqFWIdentify } from "./config/index";
import { loadModules } from "esri-loader";
//  筛选排除的字段
const BANNED_PARAMS = [
    "OBJECTID",
    "Shape",
    "Shape_Area",
    "Shape_Leng",
    "Shape_Length",
    "x",
    "y",
    "type"
];
const EXTRA_HASH = {
    ysq_snfg_green_cnt: "市内员工-绿码(人)",
    ysq_snfg_yellow_cnt: "市内员工-黄码(人)",
    ysq_snfg_red_cnt: "市内员工-红码(人)",
    ysq_swfg_green_cnt: "市外员工-绿码(人)",
    ysq_swfg_yellow_cnt: "市外员工-黄码(人)",
    ysq_swfg_red_cnt: "市外员工-红码(人)",
    ysq_ygqs_green_cnt: "员工亲属-绿码(人)",
    ysq_ygqs_yellow_cnt: "员工亲属-黄码(人)",
    ysq_ygqs_red_cnt: "员工亲属-红码(人)"
};
/**
 * FeatureLayer
 * @param {*} context 
 * @param {*} item 
 */
const doMassFeatureLayer = (context, { url, id }, shallTop = true) => {
    const { fieldAliases } = context.xmFieldAliases.filter(item => item.id == id)[0];
    const _html_ = Object.keys(fieldAliases).filter(item => !BANNED_PARAMS.includes(item)).map(key => {
        return `<div><span>${EXTRA_HASH[fieldAliases[key]] || fieldAliases[key]}</span><span>{${key}}</span></div>`
    }).join("");
    removeLayer(context, id); return new Promise((resolve, reject) => {
        loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
            const option = { url, id, opacity: shallTop ? 1 : 0.8 }
            option.popupTemplate = {
                content: `<div class="yqPopFrame">${_html_}</div>`
            }
            const feature = new FeatureLayer(option);
            context.map.add(feature, shallTop ? 4 : 1)
            resolve(true);
        })
    })
}

/**
 * 街道网格
 * @param {*} context 
 */
export const doYqStreetLayer = (context) => {
    doMassFeatureLayer(context, { url: yqStreetURL, id: "streetLayer" }, false)
}
/**
 * 县市区网格
 * @param {*} context 
 */
export const doYqXSQLayer = (context) => {
    doMassFeatureLayer(context, { url: yqXSQURL, id: "xsqLayer" }, false)
}
/**
 * 社区网格
 * @param {*} context 
 */
export const doYqXqLayer = (context) => {
    doMassFeatureLayer(context, { url: yqSQURL, id: "sqLayer" }, false)
}
/**
 * 服务业
 * @param {*} context 
 */
export const doYqFWLayer = (context) => {
    doMassFeatureLayer(context, { url: yqFWURL, id: "fwLayer" })
}

/**
 * 重点项目工地点
 * @param {*} context 
 */
export const doPointLayer = (context) => {
    doMassFeatureLayer(context, { url: xmBuildSiteURL, id: "PointLayer" })
}

/**
 * 手动弹框
 * @param {*} view 
 * @param {*} obj 
 * @param {*} fieldAliases 枚举
 */
export const doArcgisPopup = ({ view, $util }, { attributes, type, geometry }, fieldAliases) => {
    const _html_ = Object.keys(fieldAliases).filter(item => !BANNED_PARAMS.includes(item)).map(key => {
        return `<div><span>${EXTRA_HASH[fieldAliases[key]] || fieldAliases[key]}</span><span>${attributes[key]}</span></div>`
    }).join("");
    view.popup.open({
        content: `<div class="yqPopFrame">${_html_}</div>`,
        location: type == "point" ? geometry : $util.getPolygonCenter(geometry.rings)
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