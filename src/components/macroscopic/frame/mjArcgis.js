import { tipHash, Hash } from "../config/hash.js";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
const server = "http://172.20.89.68:5001/s";

export const mjChartUpdate = (context, name) => {
    const nameFix = name.slice(0, 1) + "*" + name.slice(2);
    loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
    ).then(async ([QueryTask, Query]) => {
        const queryTask = new QueryTask({
            url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/5`
        });
        const query = new Query();
        query.outFields = ["*"];
        query.returnGeometry = true;
        query.where = `Patient like '%${name}%' or Patient like '%${nameFix}'`;
        const { fields, features } = await queryTask.execute(query);
        const fieldAliases = {};
        fields.map(item => {
            fieldAliases[item.name] = item.alias;
        });
        const list = features.map(item => {
            item.fieldAliases = fieldAliases;
            return item;
        });
        context.$parent.$refs.mjChart.list = [...list];
        context.$parent.$refs.mjChart.title = [name];
        context.$parent.$refs.queryForm.list = [];
    });
};
export const addQZLinkFeature = (context, name) => {
    context.map &&
        context.map.findLayerById("mj_link") &&
        context.map.remove(context.map.findLayerById("mj_link"));
    const nameFix = name.slice(0, 1) + "*" + name.slice(2);
    const that = context;
    loadModules(["esri/layers/FeatureLayer"], OPTION).then(
        ([FeatureLayer]) => {
            const id = "mj_link";
            const option = {
                url:
                    "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/5",
                id: "mj_link",
                outFields: "*"
            };
            if (tipHash["mj"] && Hash[tipHash["mj"]]) {
                const _hash_ = Hash[tipHash["mj"]];
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
            option.definitionExpression = `Patient like '%${name}%' or Patient like '%${nameFix}'`;
            option.renderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                    type: "picture-marker",
                    url: `${server}/icon/other/密接.png`,
                    width: "30px",
                    height: "32px"
                }
            };
            const feature = new FeatureLayer(option);
            that.map.add(feature);
        }
    );
};