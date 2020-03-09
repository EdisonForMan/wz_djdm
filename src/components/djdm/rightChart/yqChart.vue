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
import { chart_y_option } from "./yqChartOption/chart_y_option";
import { chart_ywz_option } from "./yqChartOption/chart_ywz_option";
import { chart_dgl_option } from "./yqChartOption/chart_dgl_option";
import { chart_fgl_option } from "./yqChartOption/chart_fgl_option";

export default {
  data() {
    return {
      options: [
        {
          value: 0,
          label: "复工率",
          color: "#4876FF"
        },
        {
          value: 1,
          label: "产能恢复率",
          color: "#4876FF"
        },
        {
          value: 2,
          label: "二产产能恢复率",
          color: "#4876FF"
        },
        {
          value: 3,
          label: "员工到岗率",
          color: "#4876FF"
        }
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
      const options = [
        chart_fgl_option,
        chart_y_option,
        chart_ywz_option,
        chart_dgl_option
      ];
      let chart_option;
      chart_option = this.$util.clone(options[this.selectVal]);

      this.doChartOption({
        t: chart_option
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