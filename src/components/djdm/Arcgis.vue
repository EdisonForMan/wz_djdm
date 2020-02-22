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
  fetchPoint
} from "./Arcgis.js";
import djdmFrame from "./components/djdmFrame.vue";

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
    doPointLayer(this);
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
      this.$hub.$on("menu-item-click", ({ geometry }) => {
        this.goloaction(geometry);
        this.doFrame = true;
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
            fetchPoint(
              evt.mapPoint,
              that.$parent.$refs.leftMenu.activeTabsPane,
              that.view,
              obj => {
                this.$hub.$emit("menu-item-click", obj);
              }
            );
          });
          that.view.on("mouse-wheel", evt => {});
          resolve(true);
        });
      });
    },
    goloaction({ x, y }) {
      this.view.goTo({ center: [x, y], zoom: 16 });
    },
    switchColorLayer(val) {
      val ? doXmColorLayer(this) : doSzColorLayer(this);
    }
  }
};
</script>
 <style scoped lang="less">
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
</style>