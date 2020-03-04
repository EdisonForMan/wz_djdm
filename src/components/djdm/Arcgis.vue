<template>
  <div class="Map">
    <div :id="id" class="arcgisMap"></div>
    <img :src="tlimg" class="tlimg" v-if="false" />
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { OPTION, spatialReference, IMAGELAYER } from "@/components/common/Tmap";
import { mapState } from "vuex";
import {
  doPointLayer,
  doYqStreetLayer,
  doYqXSQLayer,
  doYqXqLayer,
  doYqFWLayer,
  doYqFJLayer,
  fetchPoint,
  doArcgisPopup,
  removeLayer
} from "./Arcgis.js";

export default {
  name: "DjdmArcgis",
  data() {
    return {
      doFrame: false,
      tlimg: require("./img/tl.png")
    };
  },
  props: ["id"],
  computed: {
    ...mapState({
      xmMenu: state => state.xmMenu,
      dataDone: state => state.dataDone
    }),
    xmFieldAliases() {
      return this.xmMenu.map(({ id, fieldAliases }) => {
        return { id, fieldAliases };
      });
    }
  },
  async mounted() {
    await this.createMap();
    this.eventRegister();
    this.dataDone && this.defaultLayers();
  },
  watch: {
    dataDone(n) {
      n && this.defaultLayers();
    }
  },
  methods: {
    /** once */
    defaultLayers() {
      /** default layer */
      doYqXSQLayer(this); //  县市区
      /** default selected layer */
      doYqStreetLayer(this); //  街镇
      doPointLayer(this); //  规上工业
    },
    eventRegister() {
      this.$hub.$on("document-checkbox", ({ check, id }) => {
        if (!id) return;
        const hash = {
          PointLayer: doPointLayer,
          sqLayer: doYqXqLayer,
          streetLayer: doYqStreetLayer,
          fwLayer: doYqFWLayer,
          fjLayer: doYqFJLayer
        };
        check && hash[id](this);
        !check && removeLayer(this, id);
      });
      this.$hub.$on("topDocumentClick", val => {
        doPointLayer(this);
      });
      this.$hub.$on("tabsPane-click", val => {
        doPointLayer(this);
      });
      //  点击工地
      this.$hub.$on("menu-item-click", ({ obj, fieldAliases }) => {
        const { type, geometry } = obj;
        type == "point"
          ? this.goPointLoaction(geometry)
          : this.goPolygonLocation(geometry);
        doArcgisPopup(this, obj, fieldAliases);
      });
      //  图例收缩
      this.$hub.$on("hide_click", val => {
        document.querySelector(".esri-ui-bottom-right").style.right = val
          ? 0
          : "410px";
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
            zoom: 12,
            center: [120.98066617591361, 28.116856434417986]
          });
          const layer = new VectorTileLayer({
            id: "vectorLayer",
            url: IMAGELAYER
          });
          that.map.add(layer);
          //  图例添加
          that.legend = new Legend({ view: that.view });
          that.view.ui.add(that.legend, "bottom-right");
          resolve(true);
        });
      });
    },
    goPointLoaction({ x, y }) {
      this.view.goTo({ center: [x, y] });
    },
    goPolygonLocation({ rings }) {
      const { x, y } = this.$util.getPolygonCenter(rings);
      this.view.goTo({
        center: [x, y]
      });
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
  .tlimg {
    position: absolute;
    bottom: 20px;
    right: 420px;
  }
}
</style>