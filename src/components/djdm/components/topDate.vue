<template>
  <div class="topDateDiv">
    <ul>
      <li v-for="(item,index) in TOP_DATA"
          :key="index">
        <p>{{item.t}}</p>
        <h3 :style="`color:${item.c}`">
          {{item.v}}
          <i>家</i>
        </h3>
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
  computed: {
    ...mapState({
      xmBuildSiteList: state => state.xmBuildSiteList,
      fwLayer: state => state.fwLayer
    })
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
        { t: "规上工业企业", v: 0, c: "#FF283A" },
        { t: "规上工业企业复工数", v: 0, c: "#FFC659" },
        { t: "限上服务业企业", v: 0, c: "#F6E31B" },
        { t: "限上服务业企业复工数", v: 0, c: "#1EFF95" }
      ];
      this.xmBuildSiteList.map(({ attributes }) => {
        const { cnfhqk } = attributes;
        topData[0].v += 1;
        topData[1].v += cnfhqk && parseInt(cnfhqk) > 0 ? 1 : 0;
      });
      this.fwLayer.map(({ attributes }) => {
        const { ydygs } = attributes;
        topData[2].v += 1;
        topData[3].v += ydygs && parseInt(ydygs) > 0 ? 1 : 0;
      });
      this.TOP_DATA = topData;
    }
  }
};
// width: 170px;
// margin: auto;
// display: inline-block;
// background-color: #1b45a7;
// border: 1px solid #07e2e8;
// margin-left: 20px;
// padding: 8px 5px;
// color: #07e2e8;
</script>

<style lang="less" scoped>
@fontbg: linear-gradient(180deg, #36dcff 0%, #8ceaff 100%);
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
  padding: 8px 0px;
  color: #07e2e8;
  i {
    font-style: normal;
    font-size: 12px;
    color: #fff;
  }
  p {
    font-size: 16px;
    background: @fontbg;
    -webkit-background-clip: text;
    // display: inline-block;
    padding-bottom: 8px;
    border-bottom: 1px solid #07e2e8;
    -webkit-text-fill-color: transparent;
    font-family: PingFangSC-Medium, PingFang SC;
    margin-bottom: 7px;
    font-weight: bold;
  }
  h3 {
    font-size: 20px;
    display: inline;
    i {
      font-style: normal;
      font-size: 16px;
      color: #36dcff;
      font-weight: bold;
    }
  }
}
</style>