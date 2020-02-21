<template>
  <div class="Com_content Macroscopic">
    <div class="Com_map">
      <commonArcgis id="macroArcgis" ref="macroArcgis" :leftOptions="leftOptions" />
    </div>
    <div class="Com_container" style="z-index: 10;" v-show="false">
      <div :class="`leftside animated ${icon_show_left?`slideOutLeft`:`slideInLeft`}  `">
        <leftMultiSelect :leftOptions="leftOptions" ref="leftOptions" />
        <span @click="()=>{icon_show_left=!icon_show_left}" class="hidden_button"></span>
      </div>
      <div id="fy-rightDiv">
        <bqtj ref="bqtj" />
        <wjw></wjw>
        <qstu></qstu>
        <ylzy v-if="false"/>
        <sbDate ref="table"v-if="false"/>
      </div>
    </div>
    <topDocument></topDocument>
    <CustomDocument style="position: absolute;left: 10px;top: 20px;bottom: 20px;z-index: 100;"></CustomDocument>
    <xzDate />
    <bottomBtn />
    <topDate />
    <popOpen />
    <!-- //弹出框 -->
    <sbxq ref="sbxq" v-show="xqShow" />
    <listxq ref="listxq" v-show="listShow" />
    <mjChart ref="mjChart" />
    <streetFrame ref="cpFrame" />
    <queryForm ref="queryForm" />
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
import leftMultiSelect from "@/components/common/selectRadioFrame/leftMultiSelect";
import bottomBtn from "./bottomBtn";

//  chartTable
import bqtj from "./rightDiv/bqtj";
import wjw from "./rightDiv/wjw";
import ylzy from "./rightDiv/ylzy";
import qstu from "./rightDiv/qstu";
import sbDate from "./rightDiv/sbDate";
import sbxq from "./sbxq";
import topDate from "./topDate";
import xzDate from "./xzDate";
import listxq from "./listxq";
import popOpen from "./popOpen";
import mjChart from "./frame/mjChart";
import streetFrame from "./frame/streetFrame";
import queryForm from "./queryForm";
import { leftOptions } from "./config/enums";
import CustomDocument from './CustomDocument/CustomDocument.vue';
import topDocument from './CustomDocument/topDocument.vue';
export default {
  name: "macroscopic",
  data() {
    return {
      icon_show_left: false,
      leftOptions,
      xqShow: false,
      listShow: false
    };
  },
  components: {
    topDocument,
    CustomDocument,
    commonArcgis,
    leftMultiSelect,
    bqtj, // 病例统计
    wjw, // 卫健委
    sbDate, //上报动态数据
    sbxq, //上报详情
    qstu, // 趋势图统计
    ylzy, //医疗资源状况
    bottomBtn, //底部按钮
    topDate, //顶部数据
    xzDate, //详情须知
    popOpen, //弹出详情框
    mjChart, //密接列表、图表
    streetFrame, //街道疫情
    listxq, //点击列表的详情框
    queryForm //空间查询结果
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
 <style scoped lang="less">
@import url("./Macroscopic.less");
</style>