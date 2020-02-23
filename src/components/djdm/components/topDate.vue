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
        { t: "规上企业数", v: 0, c: "#FF835F" },
        { t: "规上企业复工数", v: 0, c: "#54FFA6" }
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
  width: 140px;
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