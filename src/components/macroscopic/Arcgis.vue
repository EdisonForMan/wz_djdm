<template>
  <div class="Map">
    <div :id="id" class="arcgisMap"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { addQZLinkFeature, mjChartUpdate } from "./frame/mjArcgis";
import { linkCPFeatures } from "./frame/streetArcgis";
import {
  // linkXQFeatures,
  // linkXQ_ENTERFeatures,
  xqDetail
} from "./frame/xqArcgis";
import { loadModules } from "esri-loader";
import {
  OPTION,
  spatialReference,
  QHMB,
  CYBJ,
  IMAGELAYER,
  LCYQ,
  XZJD,
  TDTIMAGE2017,
  TDTDSJ
} from "@/components/common/Tmap";
import { tipHash, Hash } from "./config/hash.js";
const server = "http://172.20.89.68:5001/s";

export default {
  name: "MacroscopicArcgis",
  data() {
    return {};
  },
  components: {},
  props: {
    id: String,
    leftOptions: Array
  },
  created() {},
  async mounted() {
    const that = this;
    /**init map**/
    await this.createMap();
    // await this.addQh();
    /* await this.addmbk();*/
    // await this.addChanyePlate();
    // await this.addHeat();
    this.$props.leftOptions &&
      this.$props.leftOptions.map(_item => {
        _item.children.map(item => {
          item.id && that.doFun(item);
        });
      });
    this.jQueryBind();
    this.spaceQuery();
    this.polygonQuery();
    //  判断是否隐藏
    setTimeout(() => {
      this.vectorFix(this);
    }, 0);
  },
  watch: {
    leftOptions: {
      handler(newVal, val) {
        const that = this;
        if (!that.map) return;
        newVal.map(_item => {
          _item.children.map(item => {
            item.id && that.doFun(item);
          });
        });
        this.zoomFix(this);
      },
      deep: true
    }
  },
  methods: {
    /**
     * 数、组勾选触发图层寻找
     * @param {Object} item 单个元素
     */
    doFun(item) {
      // const shallYT = this.$parent.$refs.leftOptions.shallYT;
      // const _id_ = (shallYT ? "yt_" : "") + item.id;
      const shallYT = this.$parent.$refs.leftOptions.tabIndex == 1;
      const _id_ = item.id;
      if (item.check) {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = true)
          : this.addFeatures(item, item.id);
        this.map && this.map.findLayerById(item.id + "_img")
          ? (this.map.findLayerById(item.id + "_img").visible = true)
          : null;
        this.map && this.map.findLayerById("fangkong")
          ? (this.map.findLayerById("fangkong").visible = false)
          : null;
      } else {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = false)
          : null;
        this.map && this.map.findLayerById("yt_" + item.id)
          ? (this.map.findLayerById("yt_" + item.id).visible = false)
          : null;
        this.map && this.map.findLayerById(item.id + "_img")
          ? (this.map.findLayerById(item.id + "_img").visible = false)
          : null;
        if (item.id == "qzbl") {
          this.map &&
            this.map.findLayerById("mj_link") &&
            this.map.remove(this.map.findLayerById("mj_link"));
        }
        if (item.id == "chanyePlate") {
          ["cp_qzbl", "cp_zzbl", "cp_mj"].map(_id_ => {
            this.map &&
              this.map.findLayerById(_id_) &&
              this.map.remove(this.map.findLayerById(_id_));
          });
        }
        if (item.id == "xq") {
          ["xq_qzbl", "xq_zzbl", "xq_mj"].map(_id_ => {
            this.map &&
              this.map.findLayerById(_id_) &&
              this.map.remove(this.map.findLayerById(_id_));
          });
        }
      }
    },
    /**
     * 初始化地图对象,带上底图
     * @param {Function} fn 回调函数
     */
    createMap(fn) {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/widgets/Legend",
            "esri/layers/VectorTileLayer",
            "esri/layers/TileLayer"
          ],
          OPTION
        ).then(([Map, MapView, Legend, VectorTileLayer]) => {
          // map加载底图
          that.map = new Map({
            spatialReference
          });
          //设置地图容器
          that.view = new MapView({
            container: that.$props.id,
            spatialReference,
            map: that.map,
            zoom: 10,
            center: [120.67819448808013, 28.039695289562555]
          });
          const layer = new VectorTileLayer({
            id: "vectorLayer",
            url: IMAGELAYER
          });
          that.map.add(layer);
          that.legend = new Legend({
            view: that.view
          });
          that.map.on("click", function(evt) {});
          that.view.on("mouse-wheel", evt => {
            that.zoomFix(that, evt);
          });
          resolve(true);
        });
      });
    },
    zoomFix(context, evt) {
      const zoom = parseInt(
        context.view.zoom + (evt ? (evt.deltaY > 0 ? -1 : 1) : 0)
      );
      const shallPoint = zoom >= 16 ? true : false;
      const shallPlate = zoom >= 12 ? true : false;
      let shallVector = true;
      ["m_qzbl", "m_mj", "m_gld_list", "m_gld"].map(item => {
        const tree = context.$util.clone(context.$parent.leftOptions);
        if (
          tree.reverse()[0].children.filter(k => {
            return k.id == item && k.check;
          }).length
        ) {
          shallVector = shallPlate;
          context.map.findLayerById(item)
            ? context.$parent.$refs.leftOptions.tabIndex == 2
              ? (context.map.findLayerById(item).visible = shallPoint)
              : (context.map.findLayerById(item).visible = true)
            : undefined;
        }
      });
      context.map.findLayerById("vectorLayer").visible = shallVector;
    },
    vectorFix(context) {
      const shallPlate = context.view.zoom >= 12 ? true : false;
      context.map.findLayerById("vectorLayer")
        ? context.$parent.$refs.leftOptions.tabIndex == 2
          ? (context.map.findLayerById("vectorLayer").visible = shallPlate)
          : (context.map.findLayerById("vectorLayer").visible = true)
        : undefined;
    },
    jQueryBind() {
      const context = this;
      //  密切接触者详情
      $("body").on("click", ".mj_btn", function() {
        const val = $(this).attr("data-val");
        addQZLinkFeature(context, val);
        mjChartUpdate(context, val);
      });
      //  街道疫情分布
      // $("body").on("click", ".cp_btn", function() {
      //   const val = $(this).attr("data-val");
      //   linkCPFeatures(context, val);
      // });
      //  小区疫情分布
      // $("body").on("click", ".xq_btn", function() {
      //   const val = $(this).attr("data-val");
      //   linkXQFeatures(context, val);
      // });
      //  小区卡口分布
      // $("body").on("click", ".xq_enter_btn", function() {
      //   const val = $(this).attr("data-val");
      //   linkXQ_ENTERFeatures(context, val);
      // });
    },
    ybclick() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const fangkong = new MapImageLayer({
              url: LCYQ,
              id: "fangkong",
              sublayers: [{ id: 4 }, { id: 3 }, { id: 2 }]
            });
            that.map.add(fangkong, 5);
            resolve(true);
          }
        );
      });
    },
    goloaction({
      id,
      attributes,
      geometry,
      fieldAliases,
      highWayList,
      qzblList,
      mjList
    }) {
      const that = this;
      let x = geometry.x,
        y = geometry.y;
      if (geometry.rings) {
        let x_ = 0,
          y_ = 0;
        geometry.rings[0].map(item => {
          x_ += item[0];
          y_ += item[1];
        });
        x = x_ / geometry.rings[0].length;
        y = y_ / geometry.rings[0].length;
      }
      that.view.goTo({
        center: [x, y]
      });
      that.view.popup = {
        title: "",
        content: `${
          id == "xq"
            ? xqDetail(false, attributes)
            : `<table class="esri-widget__table" summary="属性和值列表"><tbody>
            ${Object.keys(attributes)
              .filter(k => {
                return (
                  [
                    "OBJECTID",
                    "FEATUREGUID",
                    "Bid",
                    "Question",
                    "question",
                    "yy"
                  ].indexOf(k) < 0
                );
              })
              .map(k => {
                return `<tr>
                  <th class="esri-feature__field-header">${fieldAliases[k] ||
                    k}</th>
                  <td class="esri-feature__field-data">${attributes[k] ||
                    ""}</td>
                </tr>`;
              })
              .join("")}
          </tbody></table>`
        }
          ${
            id == "qzbl"
              ? `<div class="bottomBtn mj_btn" data-val="${attributes.Name}">密切接触者分布</div>`
              : ``
          }
          ${
            id == "chanyePlate"
              ? `<div class="bottomBtn cp_btn" data-val="${attributes.名称}">疫情信息分布</div>`
              : ``
          }
          ${
            id == "xq"
              ? `<div class="bottomBtn xq_btn" data-val="${attributes.name}">疫情信息分布</div>`
              : ``
          }
          ${
            // 街镇病例额外添加
            qzblList
              ? qzblList
                  .map(item => {
                    return `<div><p>${
                      item.attributes.Name
                    }</p><table class="esri-widget__table" summary="值班表"><tbody>
            ${Object.keys(item.attributes)
              .filter(k => {
                return ["Bid", "OBJECTID", "Name"].indexOf(k) < 0;
              })
              .map(k => {
                return `<tr>
                  <th class="esri-feature__field-header">${item.fieldAliases[
                    k
                  ] || k}</th>
                  <td class="esri-feature__field-data">${item.attributes[k] ||
                    "无"}</td>
                </tr>`;
              })
              .join("")}
            </tbody></table></div>`;
                  })
                  .join("")
              : ``
          }
          ${
            // 高速值班表额外添加
            highWayList
              ? highWayList
                  .map(item => {
                    return `<div><p>${
                      item.attributes.Time
                    }</p><table class="esri-widget__table" summary="值班表"><tbody>
            ${Object.keys(item.attributes)
              .filter(k => {
                return ["Bid", "OBJECTID", "Time", "Expressway"].indexOf(k) < 0;
              })
              .map(k => {
                return `<tr>
                  <th class="esri-feature__field-header">${item.fieldAliases[
                    k
                  ] || k}</th>
                  <td class="esri-feature__field-data">${item.attributes[k] ||
                    "无"}</td>
                </tr>`;
              })
              .join("")}
            </tbody></table></div>`;
                  })
                  .join("")
              : ``
          }
          `,
        location: [x, y]
      };
      that.view.popup.visible = true;
    },
    //产业板块
    addChanyePlate() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const chanyePlate = new MapImageLayer({
              url: XZJD,
              id: "chanyePlate",
              opacity: 0.7
            });
            //  优先级置顶
            that.map.add(chanyePlate, 2);
            that.legend.layerInfos.push({
              layer: chanyePlate
            });
            resolve(true);
          }
        );
      });
    },
    removeLayer() {
      this.map.findLayerById("m_qzbl_img").visible = !this.map.findLayerById(
        "m_qzbl_img"
      ).visible;
    },
    yxt() {
      const that = this;
      if (this.map.findLayerById("dsj")) {
        this.map.findLayerById("dsj").visible = false;
      }
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = !this.map.findLayerById("img")
          .visible;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/TileLayer"], OPTION).then(([TileLayer]) => {
            const imgLayer = new TileLayer({
              url: TDTIMAGE2017,
              id: "img"
            });
            //  优先级置顶
            that.map.add(imgLayer, 1);
            resolve(true);
          });
        });
      }
    },
    slt() {
      if (this.map.findLayerById("dsj")) {
        this.map.findLayerById("dsj").visible = false;
      }
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = false;
      }
    },
    ygt() {
      const that = this;
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = false;
      }
      if (this.map.findLayerById("dsj")) {
        this.map.findLayerById("dsj").visible = !this.map.findLayerById("dsj")
          .visible;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/VectorTileLayer"], OPTION).then(
            ([VectorTileLayer]) => {
              const vecLayer = new VectorTileLayer({
                url: TDTDSJ,
                id: "dsj"
              });
              //  优先级置顶
              that.map.add(vecLayer, 1);
              resolve(true);
            }
          );
        });
      }
    },
    addFeatures(item, _id_) {
      // console.log(item);
      const id = _id_.replace(/yt_/g, "").replace(/m_/g, "");
      const that = this;
      const { url } = item;
      const shallYT = this.$parent.$refs.leftOptions.tabIndex == 1;
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"],
          OPTION
        ).then(([FeatureLayer, MapImageLayer]) => {
          const option = { url, id: _id_, outFields: "*" };
          if (tipHash[id] && Hash[tipHash[id]]) {
            const _hash_ = Hash[tipHash[id]];
            option.popupTemplate = {
              content: `${
                id == "xq"
                  ? xqDetail(true)
                  : `<table class="esri-widget__table" summary="属性和值列表"><tbody>
            ${_hash_
              .map(k => {
                return `<tr>
                    <th class="esri-feature__field-header">${k.label}</th>
                    <td class="esri-feature__field-data">{${k.fieldName}}</td>
                  </tr>`;
              })
              .join("")}
          </tbody></table>`
              }
          ${
            id == "qzbl"
              ? `<div class="bottomBtn mj_btn" data-val="{Name}">密切接触者分布</div>`
              : ``
          }
          ${
            id == "chanyePlate"
              ? `<div class="bottomBtn cp_btn" data-val="{名称}">相关信息分布</div>`
              : ``
          }
          ${
            id == "xq"
              ? `<div class="bottomBtn xq_btn" data-val="{name}">相关信息分布</div>`
              : ``
          }`
            };
          }
          const _layers_ = item.isImg ? MapImageLayer : FeatureLayer;
          if (item.sublayers) {
            if (item.isImg) {
              option.sublayers = [{ id: item.sublayers }];
            } else {
              option.url = option.url + "/" + item.sublayers;
            }
          }
          if (item.definitionExpression || shallYT) {
            const d = [];
            item.definitionExpression && d.push(item.definitionExpression);
            shallYT && item.ytd && d.push(item.ytd);
            if (item.isImg) {
              d.length &&
                (option.sublayers[0].definitionExpression = d.join(" and "));
            } else {
              d.length && (option.definitionExpression = d.join(" and "));
            }
          }
          item.icon &&
            (option.renderer = {
              type: "simple", // autocasts as new SimpleRenderer()
              symbol: {
                type: "picture-marker",
                url: `${server}/icon/other/${item.icon}.png`,
                width: "30px",
                height: "32px"
              }
            });
          if (item.m_url) {
            const _IMG = new MapImageLayer({
              url: item.m_url,
              id: _id_ + "_img",
            });
            //  优先级置顶
            that.map.add(_IMG, 3);
          }
          const feature = new _layers_(option);
          if (~["m_qzbl", "m_mj", "m_gld_list", "m_gld"].indexOf(_id_)) {
            feature.visible = that.view.zoom >= 16 ? true : false;
          }
          that.map.add(feature, 4);
          resolve(true);
        });
      });
    },

    // 点击面查询
    polygonQuery() {
      const that = this;

      that.view.on("click", function(evt) {
        // console.log(evt);
        that.cleanQuery();
        if (
          (that.map.findLayerById("wg") &&
            that.map.findLayerById("wg").visible) ||
          (that.map.findLayerById("xq") && that.map.findLayerById("xq").visible)
        ) {
          that.view.hitTest(evt).then(function(response) {
            // console.log(response);

            const spaceGraphicsLayer = that.map.findLayerById("spaceLayer");

            const ds = response.results[0].graphic;

            that.queryAll(spaceGraphicsLayer, ds);
          });
        }
      });
    },

    //  查询
    IdentifyTaskFun({ mapPoint }, fn) {
      const that = this;
      loadModules(
        [
          "esri/tasks/IdentifyTask",
          "esri/tasks/support/IdentifyParameters",
          "esri/tasks/QueryTask",
          "esri/tasks/support/Query",
          "esri/layers/MapImageLayer"
        ],
        OPTION
      ).then(
        ([
          IdentifyTask,
          IdentifyParameters,
          QueryTask,
          Query,
          MapImageLayer
        ]) => {
          const url =
            "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/12";
          const identifyTask = new IdentifyTask(url);
          const params = new IdentifyParameters();
          params.tolerance = 10;
          // params.layerIds = [0, 4];
          // params.layerOption = "top";
          params.returnGeometry = true;
          params.geometry = mapPoint;
          params.mapExtent = that.view.extent;
          identifyTask.execute(params).then(res => {
            // console.log(res);
            // if (res.results.length > 0) {
            //   const queryTask = new QueryTask({
            //     url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/4`
            //   });
            //   const query = new Query();
            //   query.outFields = ["*"];
            //   console.log(res.results[0].feature.attributes["唯一码"]);
            //   query.where = `RelatingCodes like '%${res.results[0].feature.attributes["唯一码"]}%'`;
            //   query.returnGeometry = true;
            //   queryTask.execute(query).then(_res => {
            //     console.log(_res);
            //     const mbk = new MapImageLayer({
            //       url: QHMB,
            //       id: "mbk",
            //       sublayers: [{ id: 1 }]
            //     });
            //     that.map.add(mbk, 4);
            //   });
            // }
          });
        }
      );
    },
    //  监听热力图
    changeHeat(id, checked) {
      if (!this.map) return;
      if (id == "jjgl") {
        this.map && this.map.findLayerById("heat7")
          ? (this.map.findLayerById("heat7").visible = checked)
          : checked == false
          ? null
          : this.addHeat(7);
      } else if (id == "hbhw") {
        this.map && this.map.findLayerById("heat9")
          ? (this.map.findLayerById("heat9").visible = checked)
          : checked == false
          ? null
          : this.addHeat(9);
      }
    },
    // 添加热力图
    addHeat(sublayers) {
      const that = this;
      loadModules(
        ["esri/layers/FeatureLayer", "esri/renderers/HeatmapRenderer"],
        OPTION
      ).then(([FeatureLayer, HeatmapRenderer]) => {
        const heatmapRenderer = new HeatmapRenderer({
          blurRadius: 6,
          colorStops: [
            { ratio: 0, color: "rgba(0, 255, 0, 0)" },
            { ratio: 0.02, color: "rgb(34, 151, 143)" },
            { ratio: 0.04, color: "rgb(0, 255, 0)" },
            { ratio: 0.06, color: "rgb(50, 255, 0)" },
            { ratio: 0.08, color: "rgb(250, 255, 0)" },
            { ratio: 0.1, color: "rgb(255, 205, 0)" },
            { ratio: 0.12, color: "rgb(255, 150, 0)" },
            { ratio: 0.14, color: "rgb(255, 95, 0)" },
            { ratio: 0.16, color: "rgb(255, 40, 0)" },
            { ratio: 0.2, color: "rgb(255, 0, 0)" }
          ],
          maxPixelIntensity: 100,
          minPixelIntensity: 1
        });
        const heat = new FeatureLayer({
          url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/${sublayers}`,
          id: `heat${sublayers}`,
          renderer: heatmapRenderer,
          opacity: 0.7
        });
        that.map.add(heat, 4);
      });
    },
    // 移除热力图
    removeHeat() {
      const that = this;
      that.map &&
        that.map.findLayerById("heat7") &&
        that.map.remove(that.map.findLayerById("heat7"));
      that.map &&
        that.map.findLayerById("heat9") &&
        that.map.remove(that.map.findLayerById("heat9"));
    },
    // 空间查询
    spaceQuery() {
      const that = this;
      loadModules(
        [
          "esri/Graphic",
          "esri/widgets/Sketch/SketchViewModel",
          "esri/layers/GraphicsLayer",
          "esri/geometry/Circle",
          "esri/geometry/Point"
        ],
        OPTION
      ).then(([Graphic, SketchViewModel, GraphicsLayer, Circle, Point]) => {
        let spaceGraphicsLayer = that.map.findLayerById("spaceLayer");
        if (!spaceGraphicsLayer) {
          spaceGraphicsLayer = new GraphicsLayer({
            id: "spaceLayer"
          });
          that.map.add(spaceGraphicsLayer);
        }
        // 绘制多边形
        that.sketchViewModel = new SketchViewModel({
          updateOnGraphicClick: false,
          view: that.view,
          layer: spaceGraphicsLayer,
          polylineSymbol: {
            type: "simple-line",
            color: "#0000ff",
            width: "1",
            style: "dash"
          },
          polygonSymbol: {
            type: "simple-fill",
            color: "rgba(0, 0, 255, 0.2)",
            style: "solid",
            outline: {
              color: "white",
              width: 1
            }
          }
        });
        that.sketchViewModel.on("create", function(event) {
          if (
            event.tool == "polyline" &&
            event.graphic.geometry.paths[0].length == 3
          ) {
            event.graphic.geometry.paths[0].length = 2;
            that.sketchViewModel.complete();
            const p1 = event.graphic.geometry.paths[0][0];
            const p2 = event.graphic.geometry.paths[0][1];
            const circleCenter = new Point({
              x: p1[0],
              y: p1[1]
            });
            const circle = new Circle({
              center: circleCenter,
              radius:
                Math.sqrt(
                  Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)
                ) * 111000
            });
            const circleGraphic = new Graphic({
              geometry: circle,
              symbol: {
                type: "simple-fill",
                color: [0, 0, 255, 0.2],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            });
            spaceGraphicsLayer.add(circleGraphic);
            that.queryAll(spaceGraphicsLayer, circleGraphic);
          }
          if (event.tool == "polygon" && event.state === "complete") {
            that.queryAll(spaceGraphicsLayer, event.graphic);
          }
        });
      });
    },
    // 多边形查询
    doSpaceQuery() {
      this.cleanQuery();
      this.$parent.$refs.queryForm.list = [];
      this.sketchViewModel.create("polygon");
    },
    // 圆形查询
    doCircleQuery() {
      this.cleanQuery();
      this.$parent.$refs.queryForm.list = [];
      this.sketchViewModel.create("polyline");
    },
    // 清除空间查询图层
    cleanQuery() {
      this.map.findLayerById("spaceLayer").removeAll();
    },
    // 查询全部
    queryAll(spaceGraphicsLayer, graphic) {
      const that = this;
      that.$parent.$refs.queryForm.list = [];
      const queryHash = {
        确诊病例: [
          "确诊病例",
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/0"
        ],
        疑似病例: [
          "疑似病例",
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/1"
        ],
        集中隔离点: [
          "治愈",
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer/2"
        ],
        集中隔离点人员名单: [
          "治愈",
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer/5"
        ],
        密切接触者: [
          "密接",
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/5"
        ],
        居家隔离人员: [
          "死亡",
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/7"
        ],
        湖北回鹿人员信令: [
          "湖北回温",
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/9"
        ]
      };

      Object.entries(queryHash).map(item => {
        const type = item[0];
        const icon = item[1][0];
        const url = item[1][1];
        that.querySingle(type, url, icon, spaceGraphicsLayer, graphic);
      });
    },
    // 单独查询
    querySingle(type, url, icon, spaceGraphicsLayer, graphic) {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic"],
          OPTION
        ).then(([QueryTask, Query, Graphic]) => {
          const queryTask = new QueryTask({
            url: url
          });
          const query = new Query();
          query.outFields = ["*"];
          query.where = "1=1";
          query.extent = graphic.geometry.extent;
          query.geometry = graphic.geometry;
          query.returnGeometry = true;
          queryTask.execute(query).then(res => {
            const fieldAliases = {};
            res.fields.map(item => {
              fieldAliases[item.name] = item.alias;
            });
            res.features.length &&
              res.features.map(item => {
                const pointGraphic = new Graphic({
                  geometry: item.geometry,
                  symbol: {
                    type: "picture-marker",
                    url: `${server}/icon/other/${icon}.png`,
                    width: "30px",
                    height: "32px",
                    yoffset: 10
                  }
                });
                spaceGraphicsLayer.add(pointGraphic);
                item.fieldAliases = fieldAliases;
                return item;
              });

            if (res.features.length) {
              that.$parent.$refs.queryForm.list.push({
                type: type,
                value: [...res.features]
              });
            }

            resolve(true);
          });
        });
      });
    }
  }
};
</script>
 <style scoped lang="less">
.Map {
  width: 100%;
  height: 100%;
  .arcgisMap {
    width: 100%;
    height: 100%;
  }
}
</style>