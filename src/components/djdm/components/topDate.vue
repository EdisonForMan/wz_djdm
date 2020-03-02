<template>
  <div class="topDateDiv">
    <ul>
      <li v-for="(item,index) in TOP_DATA" :key="index">
        <p>{{item.t}}</p>
        <h3 :style="`color:${item.c}`" v-if="index==0">已建成{{item.v}}</h3>
        <h3 :style="`color:${item.c}`" v-if="index==0">未建成{{item.v1}}</h3>
        <h3 :style="`color:${item.c}`" v-else>{{item.v}}</h3>

      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => {
    return { TOP_DATA: [], force: "xm" };
  },
  computed: {
    ...mapState({
      buildDataList: state => state.buildDataList
    })
  },
  watch: {
    buildDataList(n, o) {
      this.doTopData();
    }
  },
  mounted() {
    this.eventRegister();
    this.doTopData();
    console.log("topDate",this.buildDataList)
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
      if (this.force == "xm") {
        const topData = [
          { t: "项目数", v: 0, c: "#FF835F" },
          { t: "复工数", v: 0, c: "#54FFA6" }
        ];
        this.buildDataList
          // .filter(item => item.attributes.qy)
          .filter(item => item.attributes.id == "1")
          .map(({ attributes }) => {
            const { yyysxms, yyysfgs } = attributes;
            topData[0].v += yyysxms ? parseInt(yyysxms) : 0;
            topData[1].v += yyysxms ? parseInt(yyysfgs) : 0;
          });
        this.TOP_DATA = topData;
      } else {
        const topData = [
          { t: "项目总数", v: 0,v1:0, c: "#FF835F" },
          { t: "已复工项目数", v: 0, c: "#54FFA6" },
          { t: "总复工人数", v: 0, c: "#BD70FF" },
          { t: "已复工人数", v: 0, c: "#FF4D7A" }
        ];
        this.buildDataList
          // .filter(item => item.attributes.qy)
          .filter(item => item.attributes.id == "1")
          .map(({ attributes }) => {
            const { djdmxms, djdmfgs, zrs, fgrs,djdmfgl} = attributes;
            topData[0].v += djdmxms ? parseInt(djdmxms) : 0 ;
            topData[0].v1 += djdmfgl? parseInt(djdmfgl) : 0 ;
            topData[1].v += djdmfgs ? parseInt(djdmfgs) : 0;
            topData[2].v += zrs ? parseInt(zrs) : 0;
            topData[3].v += fgrs ? parseInt(fgrs) : 0;
          });
        this.TOP_DATA = topData;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.topDateDiv {
  position: absolute;
  top: 50px;
  width: 100%;
}
.topDateDiv ul li {
  width: 120px;
  margin: auto;
  display: inline-block;
  background-color: #1b45a7;
  border: 1px solid #07e2e8;
  margin-left: 20px;
  padding: 15px 10px;
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