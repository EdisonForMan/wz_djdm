<template>
  <div class="Com_content Djdm">
    <div class="Com_map">
      <commonArcgis id="macroArcgis" ref="macroArcgis" />
    </div>
    <div class="Com_container" style="z-index: 10;">
      <div id="fy-rightChart">
        <rightChart />
      </div>
    </div>
    <CustomDocument
      ref="leftMenu"
      style="position: absolute;left: 10px;top: 20px;bottom: 20px;z-index: 100;"
    />
    <topDate />
  </div>
</template>

<script>
/**
 * 为避免传值紊乱,建议用ref直接传值或调用触发更新
 * [例] this.$parent.ref.macroArcgis.goLocation(item) 可以直接在<rightChart>跨模块调用(从列表模块到父模块,再到地图模块)
 * 使用场景:
 * 1.点击勾选左侧,右侧列表Object[]的替换
 * 2.点击列表<rightChart>,地图<commonArcgis>定位并显示内容
 */
import commonArcgis from "./Arcgis/Arcgis.vue";
import rightChart from "./rightChart/rightChart.vue";
import topDate from "./components/topDate";
import CustomDocument from "./CustomDocument/CustomDocument.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Djdm",
  components: {
    CustomDocument,
    commonArcgis,
    rightChart, // 右侧图表
    topDate //顶部数据
  },
  computed: {
    ...mapState({
      xmBuildSiteList: state => state.xmBuildSiteList,
      fwLayer: state => state.fwLayer,
      xsqList: state => state.xsqList,
      streetList: state => state.streetList,
      sqList: state => state.sqList,
      fjList: state => state.fjList
    })
  },
  /**
   * fetch data && store data pool
   */
  async created() {
    !this.xmBuildSiteList.length && (await this.fetchXmBuildSiteList());
    !this.fwLayer.length && (await this.fetchFwList());
    !this.xsqList.length && (await this.fetchXsqList());
    !this.streetList.length && (await this.fetchStreetList());
    !this.sqList.length && (await this.fetchSqList());
    !this.fjList.length && (await this.fetchFjList());
    this.updateDataDone();
  },
  mounted() {
    this.eventRegister();
  },
  methods: {
    ...mapActions([
      "fetchXmBuildSiteList",
      "fetchXsqList",
      "fetchStreetList",
      "fetchSqList",
      "fetchFwList",
      "fetchFjList"
    ]),
    ...mapMutations(["updateDataDone"]),
    eventRegister() {
      this.$hub.$on("topDocumentClick", val => {
        this.shallActive = val;
      });
    }
  }
};
</script>
 <style scoped lang="less">
@import url("./Djdm.less");
</style>