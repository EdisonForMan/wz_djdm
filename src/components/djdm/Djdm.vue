<template>
  <div class="Com_content Djdm">
    <div class="Com_map">
      <commonArcgis id="macroArcgis" ref="macroArcgis" />
    </div>
    <div class="Com_container" style="z-index: 10;">
      <div id="fy-rightDiv">
        <bqtj ref="bqtj" />
        <wjw />
        <qstu />
      </div>
    </div>
    <topDocument />
    <CustomDocument
      ref="leftMenu"
      style="position: absolute;left: 10px;top: 20px;bottom: 20px;z-index: 100;"
    />
    <xzDate />
    <bottomBtn />
    <topDate />
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
import commonArcgis from "./Arcgis";
import bottomBtn from "./components/bottomBtn";
import bqtj from "./rightDiv/bqtj";
import wjw from "./rightDiv/wjw";
import qstu from "./rightDiv/qstu";
import topDate from "./components/topDate";
import xzDate from "./components/xz";
import CustomDocument from "./CustomDocument/CustomDocument.vue";
import topDocument from "./CustomDocument/topDocument.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "Djdm",
  data() {
    return {};
  },
  components: {
    topDocument,
    CustomDocument,
    commonArcgis,
    bqtj, // 病例统计
    wjw, // 卫健委
    qstu, // 趋势图统计
    bottomBtn, //底部按钮
    topDate, //顶部数据
    xzDate //详情须知
  },
  computed: {
    ...mapState({
      xmBuildSiteList: state => state.xmBuildSiteList,
      djdmBuildSiteList: state => state.djdmBuildSiteList
    })
  },
  /**
   * fetch data && store data pool
   */
  mounted() {
    !this.xmBuildSiteList.length && this.fetchXmBuildSiteList();
    !this.djdmBuildSiteList.length && this.fetchDjdmBuildSiteList();
  },
  methods: {
    ...mapActions(["fetchXmBuildSiteList", "fetchDjdmBuildSiteList"])
  }
};
</script>
 <style scoped lang="less">
@import url("./Djdm.less");
</style>