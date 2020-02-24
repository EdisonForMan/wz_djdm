<template>
  <div class="topDateDiv">
    <ul>
      <li v-for="(item,index) in TOP_DATA" :key="index">
        <p>{{item.t}}</p>
        <h3 :style="`color:${item.c}`">{{item.v}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => {
    return { TOP_DATA: [] };
  },
  mounted() {
    this.eventRegister();
    this.doTopData();
  },
  methods: {
    eventRegister() {
      this.$hub.$on("topDocumentClick", val => {
        this.force = val ? "djdm" : "xm";
        this.$nextTick(() => {
          this.doTopData();
        });
      });
    },
    doTopData() {
      const topData = [
        { t: "规上工业企业", v: 1359, c: "#FF835F" },
        { t: "规上工业企业复工数", v: 1236, c: "#54FFA6" }
      ];
      this.TOP_DATA = topData;
    }
  }
};
</script>

<style lang="less" scoped>
.topDateDiv {
  position: absolute;
  top: 120px;
  width: 100%;
}
.topDateDiv ul li {
  width: 170px;
  margin: auto;
  display: inline-block;
  background-color: #1b45a7;
  border: 1px solid #07e2e8;
  margin-left: 20px;
  padding: 8px 5px;
  color: #07e2e8;
  i {
    font-style: normal;
    font-size: 12px;
    color: #fff;
  }
  p {
    font-size: 18px;
    background: linear-gradient(
      180deg,
      rgba(54, 220, 255, 1) 0%,
      rgba(140, 234, 255, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: PingFangSC-Medium, PingFang SC;
    margin-bottom: 7px;
  }
  h3 {
    font-size: 20px;
  }
}
</style>