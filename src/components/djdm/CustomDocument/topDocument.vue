<template>
  <div class="topDocument">
    <div
      class="topDocument-inner"
      :class="[active == 2 ? 'current-active' : '']"
      @click="topDocumentClick(2)"
    >企业复工复产</div>
    <div
      class="topDocument-inner"
      :class="[active == 0 ? 'current-active' : '']"
      @click="topDocumentClick(0)"
    >疫情图复产图</div>
  </div>
</template>
<script>
export default {
  name: "topDocument",
  data() {
    return {
      active: 2
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
  top: 82px;
  left: 50%;
  z-index: 1001;
  transform: translateX(-50%);
  overflow: hidden;
}
.topDocument-inner {
  float: left;
  width: 140px;
  height: 44px;
  background: url(./img/top_bg.png) 0 0 no-repeat;
  background-size: 100% 100%;
  line-height: 44px;
  font-size: 18px;
  margin-right: 20px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
.topDocument-inner:last-child {
  margin-right: 0px !important;
}
.current-active {
  color: #ffd068;
}
</style>