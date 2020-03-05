<template>
  <div class="yqChart">
    <el-select size="small" v-model="selectVal" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :style="{color:item.color}"
      ></el-option>
    </el-select>
    <div id="gqx-chart"></div>
  </div>
</template>

<script>
import { SERIES, chart_y_option, chart1 } from "./chart_y_option";
import { chart_ywz_option } from "./chart_ywz_option";
export default {
  data() {
    return {
      options: [
        {
          value: 0,
          label: "乐清市产能恢复率",
          color: "#4876FF"
        },
        {
          value: 1,
          label: "温州市二产产能恢复率",
          color: "#4876FF"
        },
        // {
        //   value: 2,
        //   label: "温州各地员工到岗率图",
        //   color: "#4876FF"
        // }
      ],
      selectVal: 0
    };
  },
  watch: {
    selectVal(n, o) {
      this.doChartData();
    }
  },
  mounted() {
    this.chartRegister();
    this.doChartData();
  },
  methods: {
    chartRegister() {
      this.chart_t = this.$echarts.init(document.getElementById("gqx-chart"));
    },
    doChartData() {
      let chart_y_option_clone;
      if (this.selectVal == 0) {
        const data = this.$util.clone(chart1);
        //  顶部
        chart_y_option_clone = this.chart_Y_fixed();
        chart_y_option_clone.legend.data = Object.keys(data).filter(
          item => !["name"].includes(item)
        );
        chart_y_option_clone.xAxis.data = data.name;
        chart_y_option_clone.series = Object.keys(data)
          .filter(item => !["name"].includes(item))
          .map(item => {
            const series = this.chart_Y_SERIES_fixed();
            series.name = item;
            series.data = data[item];
            return series;
          });
      }
      if (this.selectVal == 1) {
        chart_y_option_clone = this.$util.clone(chart_ywz_option);
      }
      if (this.selectVal == 3) {
        _obj_ = {
          a: { ydyg: 0, ydygs: 0 }
        };
      }

      this.doChartOption({
        t: chart_y_option_clone
      });
    },
    doChartOption({ t }) {
      t && this.chart_t.setOption(t, true);
    },
    chart_Y_fixed() {
      return this.$util.clone(chart_y_option);
    },
    chart_Y_SERIES_fixed() {
      return this.$util.clone(SERIES);
    }
  }
};
</script>

<style lang="less" scoped>
.yqChart {
  flex: 1;
  display: flex;
  flex-direction: column;
  #gqx-chart {
    flex-grow: 1;
    min-height: 0;
    width: 100%;
    flex: 1;
  }
}
</style>