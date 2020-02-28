import { xmBuildSiteURL, yqStreetURL, yqXSQURL, yqSQURL, yqFWURL, yqFJURL } from "./config/index";
import { loadModules } from "esri-loader";
//  筛选排除的字段
const BANNED_PARAMS = [
    "OBJECTID",
    "Shape",
    "Shape_Area", "SHAPE_Area",
    "Shape_Leng", "SHAPE_Length",
    "Shape_Length",
    "x",
    "y",
    "type", "dz1", "zyy", "wt", "bz", "复工率颜色",
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
    return new Promise((resolve, reject) => {

        if (context.map.findLayerById(id)) {
            //  存在图层,设置visible
            context.map.findLayerById(id).visible = true;
            context.map.findLayerById(`${id}Img`).visible = true;
            resolve(true);
        } else {
            //  不存在图层,生成图层
            loadModules(["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"]).then(([FeatureLayer, MapImageLayer]) => {
                //  image
                const imageURL = url.replace(/\/[0-9]$/, "");
                const endParam = url.match(/\/[0-9]$/);
                const optionImg = {
                    url: imageURL,
                    id: `${id}Img`,
                }
                endParam.length && (optionImg.sublayers = [{ id: endParam[0].replace(/\//i, "") }]);
                const imgLayer = new MapImageLayer(optionImg);
                context.map.add(imgLayer, shallTop ? 9 : 1)
                //  feature
                const option = { url, id, opacity: 0 }
                id != "xsqLayer" && (option.popupTemplate = {
                    content: `<div class="yqPopFrame">${_html_}</div>`
                })
                const layer = new FeatureLayer(option);
                context.map.add(layer, shallTop ? 10 : 2)
                context.legend.layerInfos.push({ layer });
                resolve(true);
            })
        }
    })
}
/**
 * 重点项目
 * @param {*} context 
 */
export const doPointLayer = (context) => {
    doMassFeatureLayer(context, { url: xmBuildSiteURL, id: "PointLayer" })
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
 * 房建项目
 * @param {*} context 
 */
export const doYqFJLayer = (context) => {
    doMassFeatureLayer(context, { url: yqFJURL, id: "fjLayer" })
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
    if (context.map.findLayerById(id)) {
        context.map.findLayerById(`${id}Img`).visible = false
        context.map.findLayerById(id).visible = false;
    }
}