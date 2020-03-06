<template>
  <div class="topDateDiv">
    <ul>
      <li v-for="(item,index) in TOP_DATA" :key="index">
        <p>
          {{item.t}}
          <i :style="`color:${item.c[0]}`">{{dataDone ? item.v[0] : "-"}}</i>家
        </p>
        <h3 :style="`color:${item.c[1]}`">
          <i>产能恢复率</i>
          {{item.v[1]}}
          <i>%</i>
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
      fwLayer: state => state.fwLayer,
      dataDone: state => state.dataDone
    })
  },
  mounted() {
    this.eventRegister();
    this.doTopData();
  },
  watch: {
    dataDone(n) {
      n && this.doTopData();
    }
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
        { t: "规上工业企业", v: [0, 56.14], c: ["#FF283A", "#FFC659"] },
        { t: "限上服务业企业", v: [0, 70.62], c: ["#F6E31B", "#1EFF95"] }
      ];
      this.xmBuildSiteList.map(({ attributes }) => {
        const { cnfhqk } = attributes;
        topData[0].v[0] += 1;
      });
      this.fwLayer.map(({ attributes }) => {
        const { ydygs } = attributes;
        topData[1].v[0] += 1;
      });
      this.TOP_DATA = topData;
    }
  }
};
</script>

<style lang="less" scoped>
@fontbg: linear-gradient(180deg, #36dcff 0%, #8ceaff 100%);
.topDateDiv {
  position: absolute;
  top: 140px;
  width: 100%;
}
.topDateDiv ul li:first-child {
  margin-left: 0px;
}
.topDateDiv ul li {
  width: 230px;
  margin: auto;
  display: inline-block;
  background-color: #1b45a7;
  border: 1px solid #07e2e8;
  margin-left: 20px;
  padding: 8px 0px;
  color: #07e2e8;
  i {
    font-style: normal;
    font-size: 16px;
    color: #fff;
  }
  p {
    font-size: 18px;
    background: @fontbg;
    -webkit-background-clip: text;
    // display: inline-block;
    padding-bottom: 8px;
    border-bottom: 1px solid #07e2e8;
    font-family: PingFangSC-Medium, PingFang SC;
    margin-bottom: 7px;
    font-weight: bold;
    i {
      font-size: 18px;
    }
  }
  h3 {
    font-size: 22px;
    display: inline;
    i {
      font-style: normal;
      font-size: 18px;
      color: #36dcff;
      font-weight: bold;
    }
  }
}
</style>