<template>
  <div class="Com_content Djdm">
    <div class="Com_map" v-if="shallActive == 2">
      <commonArcgis id="macroArcgis" ref="macroArcgis" />
    </div>
    <div class="Com_container" style="z-index: 10;" v-if="shallActive == 2">
      <div id="fy-rightDiv">
        <rightDiv />
      </div>
    </div>
    <topDocument />
    <CustomDocument
      v-if="shallActive == 2"
      ref="leftMenu"
      style="position: absolute;left: 10px;top: 20px;bottom: 20px;z-index: 100;"
    />
    <xzDate v-if="false" />
    <bottomBtn v-if="false" />
    <topDate v-if="shallActive == 2" />
    <yqImg v-if="shallActive == 0" />
  </div>
</template>

<script>
/**
 * 为避免传值紊乱,建议用ref直接传值或调用触发更新
 * [例] this.$parent.ref.macroArcgis.goLocation(item) 可以直接在<RightDiv>跨模块调用(从列表模块到父模块,再到地图模块)
 * 使用场景:
 * 1.点击勾选左侧,右侧列表Object[]的替换
 * 2.点击列表<RightDiv>,地图<commonArcgis>定位并显示内容
 */
import yqImg from "./components/yqImg";
import commonArcgis from "./Arcgis.vue";
import bottomBtn from "./components/bottomBtn";
import rightDiv from "./rightDiv/rightDiv.vue";
import topDate from "./components/topDate";
import xzDate from "./components/xz";
import CustomDocument from "./CustomDocument/CustomDocument.vue";
import topDocument from "./CustomDocument/topDocument.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "Djdm",
  data() {
    return { shallActive: 0 };
  },
  components: {
    yqImg,
    topDocument,
    CustomDocument,
    commonArcgis,
    rightDiv, // 右侧图表
    bottomBtn, //底部按钮
    topDate, //顶部数据
    xzDate //详情须知
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
  mounted() {
    !this.xmBuildSiteList.length && this.fetchXmBuildSiteList();
    !this.fwLayer.length && this.fetchFwList();
    !this.xsqList.length && this.fetchXsqList();
    !this.streetList.length && this.fetchStreetList();
    !this.sqList.length && this.fetchSqList();
    !this.fjList.length && this.fetchSqList();
    this.eventRegister();
  },
  methods: {
    ...mapActions([
      "fetchXmBuildSiteList",
      "fetchXsqList",
      "fetchStreetList",
      "fetchSqList",
      "fetchFwList",
      "fetchSqList"
    ]),
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