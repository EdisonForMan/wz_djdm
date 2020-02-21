import { tipHash, Hash } from "../config/hash.js";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
const server = "http://172.20.89.68:5001/s";
const xqUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/crowded/MapServer/1"
const qzblUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/0";
const zzblUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/1";
const mjUrl = "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/5";

export const linkXQFeatures = async (context, Country) => {
    const geometry = await getGeometry(Country);
    const qzbl = await addLinkFeature(context, geometry, "qzbl", "确诊病例", qzblUrl);
    const zzbl = await addLinkFeature(context, geometry, "zzbl", "疑似病例", zzblUrl)
    const mj = await addLinkFeature(context, geometry, "mj", "密接", mjUrl)
    const frameData = { qzbl, zzbl, mj };
    context.$parent.$refs.cpFrame.obj = frameData;
    context.$parent.$refs.cpFrame.title = Country;
}

/**
 * 获取面
 * @param {*} Country 
 */
const getGeometry = (Country) => {
    return new Promise((resolve, reject) => {
        loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
            OPTION
        ).then(async ([QueryTask, Query]) => {
            const queryTask = new QueryTask({ url: xqUrl });
            const query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.where = `name like '%${Country}%'`;
            const { features } = await queryTask.execute(query);
            resolve(features.length ? features[0].geometry : false);
        });
    });
}

/**
 * 服务叠加
 * @param {*} context 
 * @param {*} geometry
 * @param {*} id 
 * @param {*} icon 
 * @param {*} url 
 */
const addLinkFeature = (context, geometry, id, icon, url) => {
    console.log(geometry)
    return new Promise((resolve, reject) => {
        const _id = "cp_" + id;
        context.map &&
            context.map.findLayerById(_id) &&
            context.map.remove(context.map.findLayerById(_id));
        loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/layers/GraphicsLayer", "esri/Graphic"],
            OPTION
        ).then(async ([QueryTask, Query, GraphicsLayer, Graphic]) => {
            const feature = new GraphicsLayer({
                id: _id
            });
            const queryTask = new QueryTask({ url });
            const query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.geometry = geometry;
            const { fields, features } = await queryTask.execute(query);
            const fieldAliases = {};
            fields.map(item => {
                fieldAliases[item.name] = item.alias;
            });
            const list = features.map(item => {
                item.fieldAliases = fieldAliases;
                var graphic = new Graphic({
                    geometry: item.geometry,
                    symbol: {
                        type: "picture-marker",
                        url: `${server}/icon/other/${icon}.png`,
                        width: "30px",
                        height: "32px"
                    }
                });
                feature.graphics.add(graphic);
                return item;
            });
            context.map.add(feature);
            resolve(list);
        });
    });
};