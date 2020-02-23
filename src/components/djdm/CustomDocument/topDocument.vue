<template>
  <div class="topDocument">
    <div
      class="topDocument-inner"
      :class="[active == 0 ? 'current-active' : '']"
      @click="topDocumentClick(0)"
    >疫情风险图</div>
    <div
      class="topDocument-inner"
      :class="[active == 1 ? 'current-active' : '']"
      @click="topDocumentClick(1)"
    >复工风险图</div>
    <div
      class="topDocument-inner"
      :class="[active == 2 ? 'current-active' : '']"
      @click="topDocumentClick(2)"
    >企业复工图</div>
  </div>
</template>
<script>
export default {
  name: "topDocument",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    topDocumentClick(val) {
      this.active = val;
      this.$hub.$emit("topDocumentClick", val);
    }
  }
};
</script>
<style scoped>
.topDocument {
  position: absolute;
  top: 80px;
  left: 50%;
  z-index: 1001;
  transform: translateX(-50%);
  overflow: hidden;
}
.topDocument-inner {
  float: left;
  width: 87px;
  height: 30px;
  background: url(./img/top_bg.png) 0 0 no-repeat;
  background-size: 100% 100%;
  line-height: 30px;
  font-size: 16px;
  margin-right: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
.current-active {
  color: #ffd068;
}
</style>