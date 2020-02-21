/**
 * http api interface url config
 * get env by domain
 * update by eds 2019/8/20
 */
import Vue from "vue";

/**
 * 环境配置获取
 * [dev]      本地  自动登录admin
 * [prod]     生产  需token严重
 * [outside]  对外  自动登录游客
 */
window.env =
    location.host.includes("localhost") || location.host.includes("192.168.0.200") ?
        "prod" :
        "prod";
Vue.prototype.$env = window.env;
/**
 * 是否需要登录
 * 1.需要登录    直接通过js登录获取token 用于本地调试、对外用户 无需跳转重登
 * 2.不需要登录  通过外部登录的session获取token 若失效需跳转重登
 */
window.shallLogin =
    location.host.includes("localhost") ||
    location.host.includes("lysb.lucheng.gov.cn");
//  此console不删
console.log(`[env]${window.env}`, `[shallLogin]${window.shallLogin}`);

//  开发环境配置
const CONFIG_DEV = {
    ARCGIS_API_URL: "http://192.168.0.200:9003/s/lc/libs/arcgis_js_v412_api/arcgis_js_api/library/4.12/dojo/dojo.js",
    LOCAL_DOMAIN: "http://192.168.0.100",
    LOCAL_HOST: "http://192.168.0.100/server/rest/services",
    FORWARD_HOST: "http://192.168.0.123:6080/arcgis/rest/services",
    OTHER_HOST: "https://services.wzmap.gov.cn/server/rest/services",
    SERVER_HOST: "http://192.168.0.200:9003/s/lc",
    API_HOST: "http://192.168.0.200:9003",
    LOGIN_HOST: "http://192.168.0.200:9003"
};
//  生产环境配置
const CONFIG_PROVIDE = {
    ARCGIS_API_URL: "http://172.20.89.68:5001/lc/libs/arcgis_js_v412_api/arcgis_js_api/library/4.12/dojo/dojo.js",
    LOCAL_DOMAIN: "https://server.lcmap.com",
    LOCAL_HOST: "http://172.20.89.59/server/rest/services",
    FORWARD_HOST: "http://172.20.89.59/server/rest/services",
    OTHER_HOST: "https://services.wzmap.gov.cn/server/rest/services",
    SERVER_HOST: "http://172.20.89.88:5001/s/lc",
    API_HOST: "http://172.20.89.88:5001",
    LOGIN_HOST: "http://172.20.89.88:5001"
};
const TO_CONFIG =
    Vue.prototype.$env == "dev" ?
        CONFIG_DEV :
        CONFIG_PROVIDE;
//  环境变量 配置信息获取
const {
    ARCGIS_API_URL,
    LOCAL_DOMAIN,
    LOCAL_HOST,
    FORWARD_HOST,
    OTHER_HOST,
    SERVER_HOST,
    API_HOST,
    LOGIN_HOST
} = TO_CONFIG;
//  api/apibean config
export const WRT_config = {
    server: SERVER_HOST,
    serverCompatible: API_HOST,
    etag: "+mOUb1hDtJA=",
    token: "",
    login: LOGIN_HOST
};
//  ARCGIS FOR JS库本地地址
export const OPTION = {
    url: ARCGIS_API_URL,
    dojoConfig: {
        parseOnLoad: true,
        packages: [{
            location: `${SERVER_HOST}/libs/plugin`,
            name: "plugin"
        },
            {
                name: "src",
                location: location.pathname.replace(/\/[^/]+$/, "") + "../src"
            }
        ]
    }
};
//  getToken
export const GET_ARCGIS_TOKEN = `${LOCAL_DOMAIN}/arcgis/sharing/rest/generateToken`;
/******** 2019/10/16 new config ********/
//  招商资源    [0.招商项目点 1.鹿城全景 2.数字产业园 3.招商地块面]
export const ZSZY = `${FORWARD_HOST}/lcjjdt/zszy/MapServer`;
//  招商总述    []
export const ZSZS = `${FORWARD_HOST}/lcjjdt/zszs/MapServer`;
//  亩均论英雄  [0.工业评价点 1.街镇标注 2.街镇亩均税收]
export const MJLYX = `${FORWARD_HOST}/lcjjdt/mjlyx/MapServer`;
//  地块画像    [0.已征待拆 1.可供地块 2.控规-已征待拆 3.控规-可供地块]
export const DKHX = `${FORWARD_HOST}/lcjjdt/dkhx/MapServer`;
//  楼宇画像    [0.房屋面底面 1.三维楼宇(featurelayer拉高度) 2.楼宇房屋2.5d]
export const LYHX = `${FORWARD_HOST}/lcjjdt/lyhx/MapServer`;
//  经济特色    [0.产业平台 1.重点项目 2.重点楼宇 3.专业市场 4.招商地块 5.百强企业]
export const JJTS = `${FORWARD_HOST}/lcjjdt/jjts/MapServer`;
//  产业布局    [0.八大平台 1.一廊 2.三轴 3.产业板块 4.行业点]
export const CYBJ = `${FORWARD_HOST}/lcjjdt/cybj/MapServer`;
//  五个一批    [0.规划一批 1.建设一批 2.招商一批 3.集聚一批 4.培育一批 5.重点楼宇]
export const LYZS = `${FORWARD_HOST}/lcjjdt/lyzs/MapServer`;
//  区划蒙白    [0.区划线 1.外围蒙白 2.切块蒙白 3.街道标注]
export const QHMB = `${FORWARD_HOST}/lcjjdt/qhmb/MapServer`;
//  优质企业    [0.功勋企业]
export const YZQY = `${FORWARD_HOST}/lcjjdt/yzqy/MapServer`;
//  鹿城公房    [0.公房点 1.公房面]
export const LCGF = `${FORWARD_HOST}/lcjjdt/gongfang/MapServer`;
//  鹿城旅遊    [0.AAA級风景区 1.其他景点 2.AAA级景区村庄 3.民宿客栈 4.星级旅行社 5.星级酒店]
export const LVYOU = `${FORWARD_HOST}/lcjjdt/lvyou/MapServer`;
// 鹿城区疫情
export const LCYQ = `http://172.20.89.7:6082/arcgis/rest/services/weijian/fangkong/MapServer`;
// 乡镇街道
export const XZJD = `http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/xzjd/MapServer`;
/******** ********/
//  底图
// export const IMAGELAYER =
//   window.env == "outside"
//     ? `${OTHER_HOST}/Hosted/DSJ/VectorTileServer`
//     : `${LOCAL_HOST}/Hosted/kfq_WGS84/VectorTileServer`;
export const IMAGELAYER =
    window.env == "outside" ?
        `${OTHER_HOST}/Hosted/JYB/VectorTileServer` :
        `${LOCAL_HOST}/Hosted/TDT_SLDT/VectorTileServer`;
export const IMAGELAYERDSJ =
    window.env == "outside" ?
        `${OTHER_HOST}/Hosted/DSJ/VectorTileServer` :
        `${LOCAL_HOST}/Hosted/kfq_WGS84/VectorTileServer`;

// mapbox底图
export const MAPBOXLAYER = `${FORWARD_HOST}/${
    window.env == "dev" ? `DT1022` : `lcjjdt/LCDT1115`
}/MapServer`;
//  三维-白模房屋面
export const BUILD_POLYGON = `${FORWARD_HOST}/lcjjdt/fwm1021/MapServer`;
//  三维-亿元楼
export const FINEMODEL = `${LOCAL_HOST}/Hosted/zdly30_0924/SceneServer`;
export const FINEMODEL_FEATURE = `${LOCAL_HOST}/Hosted/zdly30_0924/FeatureServer/0`;
//  三维-精细三维
export const NICEMODEL = `${LOCAL_HOST}/Hosted/danan84fc/SceneServer`;
//  三维-光柱
export const LIGHTBAR = `${LOCAL_HOST}/Hosted/guangzhu30_0929/SceneServer`;
export const LIGHTBAR_RFEATURE = `${LOCAL_HOST}/Hosted/guangzhu30_0929/FeatureServer/0`;
//  天地图三维模型
export const BUILD_TDT = `http://services.wzmap.gov.cn/server/rest/services/Hosted/RES_PY_dark_0421/SceneServer`;
//  天地图-大数据
export const TDTDSJ =
    window.env == "outside" ?
        `${OTHER_HOST}/Hosted/DSJ/VectorTileServer` :
        `${LOCAL_HOST}/Hosted/kfq_WGS84/VectorTileServer`;
//  天地图-行政区划
export const TDTXZQH = `${OTHER_HOST}/Hosted/XZQH/VectorTileServer`;
//  天地图-绿化园林
export const TDTYL = `${OTHER_HOST}/Hosted/YL/VectorTileServer`;
//  天地图-休闲旅游
export const TDTNYLY = `${OTHER_HOST}/Hosted/NYLY/VectorTileServer`;
//  天地图-建成区
export const TDDJCQ = `${OTHER_HOST}/Hosted/JCQ/VectorTileServer`;
//  天地图-矢量
export const TDTSL =
    "http://srv.zjditu.cn/ZJEMAP_2D/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=3dmap&STYLE=default&TILEMATRIXSET=custom_3dmap&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=image%2Fpng";
//  天地图-招商-影像图2018
export const TDTIMAGE2018 = `http://srv.zjditu.cn/ZJDOM_2D/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=3dmap&STYLE=default&TILEMATRIXSET=custom_3dmap&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=image%2Fpng`;
//  天地图-招商-影像图2017
export const TDTIMAGE2017 = `${OTHER_HOST}/TDT/YX2017/MapServer`;
//  天地图-招商-影像图2012
export const TDTIMAGE2012 = `${OTHER_HOST}/TDT/YX_2012/MapServer`;
//  天地图-招商-影像图2010
export const TDTIMAGE2010 = `${OTHER_HOST}/TDT/YX_2010/MapServer`;
//  天地图-招商-影像图2005
export const TDTIMAGE2005 = `${OTHER_HOST}/TDT/YX_2005/MapServer`;
//  天地图-招商-影像图2000
export const TDTIMAGE2000 =
    "http://www.wzmap.gov.cn/proxy.jsp?https://ditu.zj.cn/services/wmts/imgmap_ls1998-2003?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=3dmap&STYLE=default&TILEMATRIXSET=custom_3dmap&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=image%2Fpng";
//  天地图-招商-影像图70年代
export const TDTIMAGE70 =
    "http://www.wzmap.gov.cn/proxy.jsp?https://ditu.zj.cn/services/wmts/imgmap_70s?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=3dmap&STYLE=default&TILEMATRIXSET=custom_3dmap&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=image%2Fpng";
//  天地图-招商-影像图60年代
export const TDTIMAGE60 =
    "http://www.wzmap.gov.cn/proxy.jsp?https://ditu.zj.cn/services/wmts/imgmap_60s?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=3dmap&STYLE=default&TILEMATRIXSET=custom_3dmap&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=image%2Fpng";
//  天地图-招商-简约地图
export const TDTJY =
    window.env == "outside" ?
        `${OTHER_HOST}/Hosted/JYB/VectorTileServer` :
        `${FORWARD_HOST}/Hosted/TDT_SLDT/VectorTileServer`;

//  天地图-25维
export const TDT25D =
    "http://183.245.65.187/iserver/services/3dmap/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=3dmap&STYLE=default&TILEMATRIXSET=custom_3dmap&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=image%2Fpng";
//  招商-规划服务
export const CANVASS = `${FORWARD_HOST}/lcjjdt/zhaoshang/MapServer`;
//  招商-总述-外部地图
export const CANVASSMAP =
    "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer";
//  招商-总述-高速
export const CANVASSHIGHWAY = `${FORWARD_HOST}/lcjjdt/zsmap_road/MapServer`;
// 招商-全景
export const CANVASSQJ = `${FORWARD_HOST}/lcjjdt/vr/MapServer`;
//  楼宇-兴趣点1000米兴趣点1000米
export const BUILDAROUND = `${FORWARD_HOST}/lcjjdt/poi56b1000/MapServer`;
//  用地-用地出让
export const LANDSOLD = `${FORWARD_HOST}/lcjjdt/yongdichurang/MapServer`;
//  用地-总用地规划
export const ALLLANDREGULATORY = `${FORWARD_HOST}/lcjjdt/guihua/MapServer`;
//  用地-环保
export const LANDHB =
    "http://10.36.160.209:6080/arcgis/rest/services/DGHY/%E7%8E%AF%E4%BF%9D%E4%B8%8E%E4%BA%A7%E4%B8%9A%E5%B7%AE%E5%BC%82_%E5%B8%82%E8%BE%96%E5%8C%BA/MapServer";
//  用地-环境功能区
export const ENVAREA =
    "http://10.36.160.209:6080/arcgis/rest/services/DGHY/%E7%8E%AF%E5%A2%83%E5%8A%9F%E8%83%BD%E5%8C%BA_%E5%B8%82%E8%BE%96%E5%8C%BA/MapServer";
//  用地-土地利用现状
export const LANDUSED =
    "http://10.36.161.43:6080/arcgis/rest/services/DGFW/MapServer";
//  用地-三类空间
export const THREEROOM =
    "http://10.36.161.43:6080/arcgis/rest/services/WZDGCG/MapServer";
//  用地-空间管制
export const ROOMMANAGER =
    "http://10.36.161.43:6080/arcgis/rest/services/WZDGCG/MapServer";
//疫情-其他专科医院
export const OTHERHOSPITAL = "https://services.wzmap.gov.cn/server/rest/services/TDT/ZhuanTiSJ/MapServer";
//疫情-高速路口
export const HIGHROAD = "http://172.20.89.59/server/rest/services/lcjjdt/zszs/MapServer";
//疫情-网格
export const WANGGE = "http://218.75.25.52:6082/arcgis/rest/services/WZ_WeiFang/t_WeiFang_WG_TJ/MapServer";
//疫情-小区
export const XIAOQU = "http://10.36.245.203/server/rest/services/theme/D_HAZARDS_CROWDED/MapServer";
//疫情-专业市场
export const MARKET = "http://172.20.89.59/server/rest/services/lcjjdt/jjts/MapServer";
//  spatialReference
export const spatialReference = {
    wkid: 4326
};
//  天地图-2.5维配置
export const TDT25DCONFIG = `{"dpi":96,"rows":256,"cols":256,"compressionQuality":0,"origin":{"x":-180,"y":90},"spatialReference":{"wkid":4326},"lods":[{"level":0,"resolution":1.406249999978297,"scale":591658710.9},{"level":1,"resolution":0.7031249999891486,"scale":295829355.45},{"level":2,"resolution":0.3515624999945743,"scale":147914677.73},{"level":3,"resolution":0.1757812499972872,"scale":73957338.86},{"level":4,"resolution":0.0878906249986436,"scale":36978669.43},{"level":5,"resolution":0.0439453124993218,"scale":18489334.72},{"level":6,"resolution":0.0219726562496609,"scale":9244667.36},{"level":7,"resolution":0.0109863281248304,"scale":4622333.88},{"level":8,"resolution":0.0054931640624152,"scale":2311166.84},{"level":9,"resolution":0.0027465820312076,"scale":1155583.42},{"level":10,"resolution":0.0013732910156038,"scale":577791.71},{"level":11,"resolution":0.0006866455078019029,"scale":288895.85},{"level":12,"resolution":0.0003433227539009515,"scale":144447.93},{"level":13,"resolution":0.0001716613769504757,"scale":72223.96},{"level":14,"resolution":0.00008583068847523788,"scale":36111.98},{"level":15,"resolution":0.00004291534423761893,"scale":18055.99},{"level":16,"resolution":0.00002145767211880947,"scale":9028},{"level":17,"resolution":0.00001072883605940473,"scale":4514},{"level":18,"resolution":0.0000053644180297860626,"scale":2254.4677204803465},{"level":19,"resolution":0.0000026822090148930313,"scale":1127.2338602401733},{"level":20,"resolution":0.0000013411045074465156,"scale":563.6169301200866}]}`;