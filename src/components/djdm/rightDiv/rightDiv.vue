<template>
  <div class="right-div">
    <div class="gqx">
      <div class="right-div-title">
        <span class="right-div-title-inner">各县市区</span>
      </div>
      <div id="gqx-chart"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import chart_t_option from "./chart_t_option";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      buildDataList: state => state.buildDataList,
      backToWzList: state => state.backToWzList
    })
  },
  watch: {
    buildDataList(n, o) {
      this.doChartData();
    },
    backToWzList(n, o) {
      this.doChartExtra();
    }
  },
  mounted() {
    this.eventRegister();
    this.chartRegister();
    if (this.buildDataList.length) {
      this.doChartData();
    }
  },
  methods: {
    eventRegister() {},
    chartRegister() {
      this.chart_t = this.$echarts.init(document.getElementById("gqx-chart"));
    },
    doChartData() {
      const _data_ = this.buildDataList
        .map(({ attributes }) => {
          return { ...attributes };
        })
        .filter(item => item.qy);
      //  顶部
      const chart_t_arr = _data_.sort(this.$util.compare("yyysxms")).reverse();
      const chart_t_option_clone = this.chart_T_fixed();
      chart_t_option_clone.xAxis[0].data = chart_t_arr.map(item =>
        item.qy.replace(/集聚区/g, "")
      );
      chart_t_option_clone.series[0].data = chart_t_arr.map(
        item => item.yyysfgs
      );
      chart_t_option_clone.series[1].data = chart_t_arr.map(
        item => item.yyysxms - item.yyysfgs
      );
      chart_t_option_clone.series[1].label.formatter = param => {
        return chart_t_arr[param.dataIndex].yyysxms;
      };
      this.doChartOption({
        t: chart_t_option_clone
      });
    },
    doChartOption({ t }) {
      t && this.chart_t.setOption(t);
    },
    chart_T_fixed() {
      const t_itemStyle_0 = {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#DA414F" },
          { offset: 1, color: "#FF7783" }
        ])
      };
      const t_itemStyle_1 = {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#FF8146" },
          { offset: 1, color: "#FFD699" }
        ])
      };
      const json = this.$util.clone(chart_t_option);
      json.series[0].itemStyle = t_itemStyle_0;
      json.series[1].itemStyle = t_itemStyle_1;
      return json;
    }
  }
};
</script>
<style scoped>
.right-div {
  width: 100%;
  height: 100%;
  background: url(../img/rightDiv_bg.png) 0 0 no-repeat;
  background-size: 100% 100%;
  padding: 20px 26px;
  box-sizing: border-box;
}
.gqx {
  height: 40%;
}
.yjfw {
  height: 30%;
}
.wlfg {
  height: 30%;
}
.gqx,
.yjfw {
  border-bottom: 1px solid #86c9e1;
}
.gqx,
.yjfw,
.wlfg {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.right-div-title {
  width: 100%;
  text-align: left;
  padding: 15px 0;
}
.right-div-title::before {
  content: "";
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50% 50%;
  margin-right: 8px;
}
.right-div-title-inner {
  font-weight: 500;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  position: relative;
  z-index: 2;
}
.gqx .right-div-title {
  padding-top: 20px;
  padding-bottom: 0;
}
.right-div-title-inner::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.gqx .right-div-title::before {
  background-color: #e8943a;
}
.yjfw .right-div-title::before {
  background-color: #2ed887;
}
.wlfg .right-div-title::before {
  background-color: #31b2f6;
}
.gqx .right-div-title-inner::before {
  background: rgba(255, 185, 91, 0.3);
  filter: blur(9px);
}
.yjfw .right-div-title-inner::before {
  background: rgba(46, 216, 135, 0.3);
  filter: blur(9px);
}
.wlfg .right-div-title-inner::before {
  background: rgba(49, 178, 246, 0.3);
  filter: blur(9px);
}
#gqx-chart,
#yjfw-chart,
#wlfg-chart {
  flex-grow: 1;
  min-height: 0;
  width: 100%;
}
</style>