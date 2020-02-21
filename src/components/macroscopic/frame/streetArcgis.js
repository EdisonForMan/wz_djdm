import { tipHash, Hash } from "../config/hash.js";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
const server = "http://172.20.89.68:5001/s";
const qzblUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/0";
const zzblUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/1";
const mjUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/5";

export const linkCPFeatures = async (context, _Country) => {
    const Country = _Country.replace("街道", "").replace("镇", "");
    await addLinkFeature(context, Country, "qzbl", "确诊病例", qzblUrl);
    await addLinkFeature(context, Country, "zzbl", "疑似病例", zzblUrl)
    await addLinkFeature(context, Country, "mj", "密接", mjUrl)

    const qzbl = await frameUpdate(Country, qzblUrl);
    const zzbl = await frameUpdate(Country, zzblUrl)
    const mj = await frameUpdate(Country, mjUrl)
    const frameData = { qzbl, zzbl, mj };
    context.$parent.$refs.cpFrame.obj = frameData;
    context.$parent.$refs.cpFrame.title = _Country;
}

/**
 * 获取接到面
 * @param {*} Country 
 */
const getGeometry = (Country) => {

}

/**
 * 服务叠加
 * @param {*} context 
 * @param {*} Country 
 * @param {*} id 
 * @param {*} icon 
 * @param {*} url 
 */
const addLinkFeature = (context, Country, id, icon, url) => {
    return new Promise((resolve, reject) => {
        const _id = "cp_" + id;
        context.map &&
            context.map.findLayerById(_id) &&
            context.map.remove(context.map.findLayerById(_id));
        const that = context;
        loadModules(["esri/layers/FeatureLayer"], OPTION).then(
            ([FeatureLayer]) => {
                const option = {
                    url,
                    id: _id,
                    outFields: "*"
                };
                if (tipHash[id] && Hash[tipHash[id]]) {
                    const _hash_ = Hash[tipHash[id]];
                    option.popupTemplate = {
                        content: `<table class="esri-widget__table" summary="属性和值列表"><tbody>
            ${_hash_
                                .map(k => {
                                    return `<tr>
                    <th class="esri-feature__field-header">${k.label}</th>
                    <td class="esri-feature__field-data">{${k.fieldName}}</td>
                  </tr>`;
                                })
                                .join("")}
          </tbody></table>`
                    };
                }
                option.definitionExpression = `Country like '%${Country}%'`;
                option.renderer = {
                    type: "simple",
                    symbol: {
                        type: "picture-marker",
                        url: `${server}/icon/other/${icon}.png`,
                        width: "30px",
                        height: "32px"
                    }
                };
                const feature = new FeatureLayer(option);
                that.map.add(feature);
                resolve(true);
            }
        );
    });
};

/**
 * 面板更新
 * @param {*} Country
 * @param {*} url
 */
const frameUpdate = (Country, url) => {
    return new Promise((resolve, reject) => {

        loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
            OPTION
        ).then(async ([QueryTask, Query]) => {
            const queryTask = new QueryTask({ url });
            const query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.where = `Country like '%${Country}%'`;
            const { fields, features } = await queryTask.execute(query);
            const fieldAliases = {};
            fields.map(item => {
                fieldAliases[item.name] = item.alias;
            });
            const list = features.map(item => {
                item.fieldAliases = fieldAliases;
                return item;
            });
            resolve(list);
        });
    });
};