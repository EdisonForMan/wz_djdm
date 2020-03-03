<template>
  <div class="Map">
    <div :id="id" class="arcgisMap"></div>
    <transition name="fade">
      <djdmFrame ref="djdm" v-show="doFrame" />
    </transition>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { OPTION, spatialReference, IMAGELAYER } from "@/components/common/Tmap";
import {
  doPointLayer,
  doXmColorLayer,
  doSzColorLayer,
  doProvColorLayer,
  doDjdmColorLayer,
  fetchPoint,
  doArcgisPopup,
  doXmLegendLayer,
  doSzLegendLayer,
  doProvLegendLayer,
  doDjdmLegendLayer
} from "./Arcgis.js";
import djdmFrame from "./components/djdmFrame.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "DjdmArcgis",
  data() {
    return {
      doFrame: false
    };
  },
  components: { djdmFrame },
  props: ["id"],
  created() {},
  async mounted() {
    await this.createMap();
    this.eventRegister();
    /** default xm */
    await doXmColorLayer(this);
    await doXmLegendLayer(this);
    // await doSzLegendLayer()
    // await doProvLegendLayer()
    // await doDjdmLegendLayer()
    doPointLayer(this, this.xmfieldAliases);
    this.upadteLegend();
  },
  computed: {
    ...mapState({
      xmfieldAliases: state => state.xmfieldAliases,
      djdmfieldAliases: state => state.djdmfieldAliases
    })
  },
  methods: {
    eventRegister() {
      //  顶部点击、左侧菜单点击,刷新点
      this.$hub.$on("document-checkbox", val => {
        doPointLayer(this);
      });
      this.$hub.$on("topDocumentClick", val => {
        doPointLayer(this);
      });
      this.$hub.$on("tabsPane-click", val => {
        doPointLayer(this);
      });
      //  点击工地
      this.$hub.$on("menu-item-click", ({ attributes, geometry }) => {
        this.goloaction(geometry);
        console.log("点击工地", geometry);
        console.log("点击工地this", this);

        doArcgisPopup(this, { attributes, geometry }, this.xmfieldAliases);
        // this.doFrame = true;
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
              that.legend = new Legend({
        view: that.view,
      });

          that.map.add(layer);
          that.view.ui.add(that.legend, "bottom-right");
          that.view.on("click", evt => {});
          that.view.on("mouse-wheel", ({ deltaY }) => {
            that.map.findLayerById("PointLayer").visible =
              that.view.zoom + (deltaY < 0 ? 1 : -1) < 11 ? false : true;
          });
          resolve(true);
        });
      });
    },
    goloaction({ x, y }) {
      this.view.goTo({ center: [x, y], zoom: 16 });
    },
    switchColorLayer(val) {
      // val ? doXmColorLayer(this) : doSzColorLayer(this);
      console.log("val", val);
      if (val == 0) {
        doSzColorLayer(this);
      }
      if (val == 1) {
        doXmColorLayer(this);
      }
      if (val == 2) {
        doProvColorLayer(this);
      }
      if (val == 3) {
        doDjdmColorLayer(this);
      }
    },
    //修改图例
    upadteLegend() {
      let legend_row = document.querySelectorAll(".esri-legend__layer-row")[0];
      console.log(legend_row);
    }
  }
};
</script>
 <style  lang="less">
.esri-legend__symbol>div{
  opacity: 1 !important;
}

.esri-ui .esri-ui-bottom-right .esri-legend__service-label,
.esri-ui .esri-ui-bottom-left .esri-legend__service-label {
  display: block !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.Map {
  width: 100%;
  height: 100%;
  .arcgisMap {
    width: 100%;
    height: 100%;
  }
}

.Map .esri-ui .esri-ui-bottom-right {
  right: 400px !important;
  bottom: 50px !important;
}
</style>