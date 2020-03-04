import {
  SERVER,
  xmBuildSiteURL,
  xmBuildColorURL,
  ssBuildColorURL,
  djdmBuildSiteURL,
  buildSiteIdentify,
  sjBuildColorURL,
  djdmBuildColorURL
} from "./config/index";
import { loadModules } from "esri-loader";
const _URIS_ = {
  xm: [xmBuildSiteURL, "XMSZD", "SFYFG", "是"],
  qyhf: [djdmBuildSiteURL, "xmszd", "sffg", "是"],
  xxjd: [djdmBuildSiteURL, "STATE", "sffg", "是"],
  hyfl: [djdmBuildSiteURL, "constype2", "sffg", "是"]
};

//  筛选排除的字段
const BANNED_PARAMS = [
  "ID",
  "OBJECTID",
  "CODE_ID",
  "PROJECT_CODE",
  "ORIG_FID",
  "CODE_ID_1",
  "OBJECTID_1",
  "code_id_1"
];

// 选取字段
// div
const ziduan1 = ["NAME"];
// ul
const ziduan2 = ["FUNDTYPE", "CONSTYPE", "CONSTYPE2", "STATE", "XMSZD"];
// ul
const ziduan3 = [
  "XZJD",
  "CONSYEARB2",
  "CONSYEARE2",
  "TOTALAMOUNT",
  "PREVAMOUNT"
];
// ul
const ziduan4 = ["NEXTAMOUNT", "YEARSUM", "YEARREMAIN", "ZR_DEPT"];
// ul
const ziduan5 = ["SS_DEPT", "ZHB_DEPT"];
// div
const ziduan6 = ["CONTENTGM"];
// div header ul
const ziduan7 = ["FGZRS", "YFGRS"];

/*
模板
*/
function djdmUlDemplate(fieldAliases, strArr, attributes) {
  if (!attributes) {
    let htmlStr = Object.keys(fieldAliases)
      .filter(item => strArr.includes(item))
      .map(key => {
        return `<li><span>${fieldAliases[key]}</span><span>{${key}}</span></li>`;
      })
      .join("");
    return `<ul>${htmlStr}</ul>`;
  } else {
    let htmlStr = Object.keys(fieldAliases)
      .filter(item => strArr.includes(item))
      .map(key => {
        return `<li><span>${fieldAliases[key]}</span><span>{${attributes[key]}}</span></li>`;
      })
      .join("");
    return `<ul>${htmlStr}</ul>`;
  }
}

function djdmDivTemlate(fieldAliases, strArr, className, attributes) {
  if (!attributes) {
    let htmlStr = Object.keys(fieldAliases)
      .filter(item => strArr.includes(item))
      .map(key => {
        return `<div class="${className}">{${key}} || ${fieldAliases[key]}</div> `;
      })
      .join("");
    return htmlStr;
  } else {
    let htmlStr = Object.keys(fieldAliases)
      .filter(item => strArr.includes(item))
      .map(key => {
        return `<div class="${className}">{${attributes[key]}} || ${fieldAliases[key]}</div> `;
      })
      .join("");
    return htmlStr;
  }
}

function djdmDivSpanTemlate(fieldAliases, strArr, attributes) {
  if (!attributes) {
    let htmlStr = Object.keys(fieldAliases)
      .filter(item => strArr.includes(item))
      .map(key => {
        return `  
        <li>
        ${fieldAliases[key]}:
          <span>{${key}} || ${fieldAliases[key]}</span> 人
        </li>`;
      })
      .join("");
    const htmlStr1 = `<div class="worker">
    <header>复工信息</header>`;
    const htmlStr2 = `</div>`;
    return ` ${htmlStr1}<ul>${htmlStr}</ul>${htmlStr2}`;
  } else {
    let htmlStr = Object.keys(fieldAliases)
      .filter(item => strArr.includes(item))
      .map(key => {
        return `  
        <li>
        ${fieldAliases[key]}:
          <span>{${attributes[key]}} || ${fieldAliases[key]}</span> 人
        </li>`;
      })
      .join("");
    const htmlStr1 = `<div class="worker">
    <header>复工信息</header>`;
    const htmlStr2 = `</div>`;
    return ` ${htmlStr1}<ul>${htmlStr}</ul>${htmlStr2}`;
  }
}

/**
 * FeatureLayer
 * @param {*} context
 * @param {*} item
 */
const doMassFeatureLayer = (
  context,
  { url, id, definitionExpression = "1=1", renderer, fieldAliases }
) => {
  // console.log("fieldAliases", fieldAliases);
  let _html_ = "";
  _html_ += djdmDivTemlate(fieldAliases, ziduan1, "name", null);
  _html_ += djdmUlDemplate(fieldAliases, ziduan2, null);
  console.log("字段2",_html_)
  _html_ += djdmUlDemplate(fieldAliases, ziduan3, null);
  _html_ += djdmUlDemplate(fieldAliases, ziduan4, null);
  _html_ += djdmUlDemplate(fieldAliases, ziduan5, null);
  _html_ += djdmDivTemlate(fieldAliases, ziduan6, "scroll", null);
  _html_ += djdmDivSpanTemlate(fieldAliases, ziduan7, null);

  context.map.findLayerById(id) &&
    context.map.remove(context.map.findLayerById(id));

  return new Promise((resolve, reject) => {
    loadModules(["esri/layers/FeatureLayer", "esri/widgets/Legend"]).then(
      ([FeatureLayer, Legend]) => {
        const option = { url, id, definitionExpression };
        option.popupTemplate = {
          content: `<div class="djdmPopFrame"><div class="basic"><div>${_html_}</div></div></div>`
        };
        renderer && (option.renderer = renderer);
        const feature = new FeatureLayer(option);
        context.map.add(feature, 4);
        context.legend.layerInfos.push({
          layer: feature,
          title: "复工/未复工",
          id: "复工点"
        });
        if (context.view.zoom == 10) {
          context.map.findLayerById("PointLayer").visible = false;
        }
      }
    );
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
      const option = { url, id, opacity: 1 };
      const img = new MapImageLayer(option);
      context.map.add(img, 1);
      resolve(true);
    });
  });
};

//创建图例图层

const doMassLegendLayer = (context, { url, id }) => {
  context.map.findLayerById(id) &&
    context.map.remove(context.map.findLayerById(id));
  return new Promise((resolve, reject) => {
    loadModules(["esri/layers/FeatureLayer", "esri/widgets/Legend"]).then(
      ([FeatureLayer, Legend]) => {
        const option = { url, id, opacity: 0, labelsVisible: true };
        const legendfeature = new FeatureLayer(option);
        context.map.add(legendfeature, 5);
        context.legend.layerInfos.push({
          layer: legendfeature,
          title: "复工强度",
          id: "复工图例"
        });
        resolve(true);
      }
    );
  });
};

/**亿元以上项目复工强度图例图层
 * @param {*} context
 */
export const doXmLegendLayer = context => {
  doMassLegendLayer(context, {
    url: xmBuildColorURL + "/1",
    id: "legendfeatLayer"
  });
};

/**市重点项目复工强度复工强度图例图层
 * @param {*} context
 */
export const doSzLegendLayer = context => {
  doMassLegendLayer(context, { url: ssBuildColorURL, id: "legendfeatLayer" });
};
/**
 * 省重点项目复工强度图例图层
 * @param {*} context
 */
export const doProvLegendLayer = context => {
  doMassLegendLayer(context, { url: sjBuildColorURL, id: "legendfeatLayer" });
};

/**
 * 大建大美项目复工强度度图例图层
 * @param {*} context
 */
export const doDjdmLegendLayer = context => {
  doMassLegendLayer(context, { url: djdmBuildColorURL, id: "legendfeatLayer" });
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
 * 大建大美项目复工强度
 * @param {*} context
 */
export const doDjdmColorLayer = context => {
  doMassImageLayer(context, { url: djdmBuildColorURL, id: "colorLayer" });
};

/**
 * 重点项目工地点
 * @param {*} context
 */
export const doPointLayer = (context, fieldAliases) => {
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
    valueExpression: `When($feature['${config[2]}'] == '${config[3]}', '已复工' , '未复工')`,
    uniqueValueInfos: [
      {
        value: "已复工",
        symbol: {
          type: "picture-marker",
          url: `${SERVER}/icon/yes.png`,
          width: 20,
          height: 20
        }
      },
      {
        value: "未复工",
        symbol: {
          type: "picture-marker",
          url: `${SERVER}/icon/no.png`,
          width: 20,
          height: 20
        }
      }
    ]
  };
  console.log("fieldAliases",fieldAliases)
  doMassFeatureLayer(context, {
    url: config[0],
    id: "PointLayer",
    definitionExpression,
    renderer,
    fieldAliases
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

//view pop

export const doArcgisPopup = (
  { view },
  { attributes, geometry },
  fieldAliases
) => {
  let _html_ = "";
  _html_ += djdmDivTemlate(fieldAliases, ziduan1, "name", attributes);
  _html_ += djdmUlDemplate(fieldAliases, ziduan2, attributes);
  _html_ += djdmUlDemplate(fieldAliases, ziduan3, attributes);
  _html_ += djdmUlDemplate(fieldAliases, ziduan4, attributes);
  _html_ += djdmUlDemplate(fieldAliases, ziduan5, attributes);
  _html_ += djdmDivTemlate(fieldAliases, ziduan6, "scroll", attributes);
  _html_ += djdmDivSpanTemlate(fieldAliases, ziduan7, attributes);

  view.popup.open({
    content: `<div class="djdmPopFrame"><div class="basic"><div>${_html_}</div></div></div>`,
    location: geometry
  });
};
