<template>
  <div class="Map">
    <div :id="id" class="arcgisMap"></div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { OPTION, spatialReference, IMAGELAYER } from "@/components/common/Tmap";
import { doXmLayer } from "./Arcgis.js";

export default {
  name: "DjdmArcgis",
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
    await this.createMap();
    this.eventRegister();
    /** default xm */
    doXmLayer(this);
  },
  methods: {
    eventRegister() {
      this.$hub.$on("document-checkbox", val => {
        doXmLayer(this);
      });
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
          that.view.on("click", evt => {
            console.log(evt);
          });
          that.view.on("mouse-wheel", evt => {});
          resolve(true);
        });
      });
    },
    goloaction() {
      const that = this;
      that.view.goTo({
        center: [x, y]
      });
      that.view.popup = {
        title: "",
        content: ``,
        location: [x, y]
      };
      that.view.popup.visible = true;
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
          const feature = new _layers_(option);
          that.map.add(feature, 4);
          resolve(true);
        });
      });
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
        that.sketchViewModel.on("create", event => {});
      });
    },
    // 多边形查询
    doSpaceQuery() {
      this.cleanQuery();
      this.sketchViewModel.create("polygon");
    },
    // 圆形查询
    doCircleQuery() {
      this.cleanQuery();
      this.sketchViewModel.create("polyline");
    },
    // 清除空间查询图层
    cleanQuery() {
      this.map.findLayerById("spaceLayer").removeAll();
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