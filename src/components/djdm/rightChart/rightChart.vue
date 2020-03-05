<template>
  <div class="right-div animated" :class="[hideVisible?'slideOutRight':'slideInRight']">
    <div class="gqx">
      <el-tabs v-model="tabActive" class="my-tabs" @tab-click="tabsPaneClickHandler">
        <el-tab-pane label="街镇分析" name="jd" />
        <el-tab-pane label="全市分析" name="yq" />
      </el-tabs>
      <jdChart v-if="tabActive == 'jd'" />
      <yqChart v-if="tabActive == 'yq'" />
    </div>
    <span class="hide_button" @click="hideSide"></span>
  </div>
</template>

<script>
/* eslint-disable */
import jdChart from "./jdChart";
import yqChart from "./yqChart";
export default {
  data() {
    return {
      tabActive: "jd",
      hideVisible: false
    };
  },
  components: { jdChart, yqChart },
  methods: {
    tabsPaneClickHandler(val) {},
    hideSide() {
      this.hideVisible = !this.hideVisible;
      this.$hub.$emit("hide_click", this.hideVisible);
    }
  }
};
</script>
<style lang="less">
.right-div {
  width: 100%;
  height: 100%;
  background: url(../img/rightDiv_bg.png) 0 0 no-repeat;
  background-size: 100% 100%;
  padding: 30px 16px 20px 26px;
  box-sizing: border-box;
  .hide_button {
    transform: rotateY(180deg);
    position: absolute;
    top: 40%;
    right: 98%;
    height: 126px;
    width: 27px;
    background: url("../img/hide_button.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .gqx {
    height: 100%;
    border-bottom: 1px solid #86c9e1;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
.el-select {
  margin-top: 10px;
}
.my-tabs /deep/ .el-tabs__active-bar {
  height: 4px;
} /**.el-tabs__active-bar */
.my-tabs /deep/ .el-tabs__item {
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  padding: 0 10px !important;
  color: rgba(255, 255, 255, 0.8);
}
.my-tabs /deep/ .is-active {
  color: #409eff;
  font-weight: 700;
}
.my-tabs /deep/ .el-tabs__nav-wrap::after {
  height: 1px;
}
.my-tabs /deep/ .el-tabs__item.is-disabled {
  cursor: not-allowed !important;
}
</style>