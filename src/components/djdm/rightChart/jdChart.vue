<template>
  <div class="jdChart">
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
import { mapState } from "vuex";
import chart_t_option from "./jdChartOption/chart_t_option";
import chart_m_option from "./jdChartOption/chart_m_option";
import chart_pie_option from "./jdChartOption/chart_pie_option";
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
          label: "二产产能恢复率",
          color: "#4876FF"
        },
        {
          value: 2,
          label: "三产产能恢复率",
          color: "#4876FF"
        },
        {
          value: 3,
          label: "工业企业员工到岗率",
          color: "#4876FF"
        }
      ],
      selectVal: 0
    };
  },
  computed: {
    ...mapState({
      xmBuildSiteList: state => state.xmBuildSiteList,
      streetList: state => state.streetList
    })
  },
  watch: {
    xmBuildSiteList(n, o) {
      this.doChartData();
    },
    selectVal(n, o) {
      this.doChartData();
    }
  },
  mounted() {
    this.chartRegister();
    if (this.xmBuildSiteList.length) {
      this.doChartData();
    }
  },
  methods: {
    chartRegister() {
      this.chart_t = this.$echarts.init(document.getElementById("gqx-chart"));
    },
    doChartData() {
      const _obj_ = {};
      //  复工率
      if (this.selectVal != 3) {
        let legendTitle;
        if (this.selectVal == 0) {
          legendTitle = "复工率";
          const _data_ = this.streetList.map(({ attributes }) => {
            const { ssjd, dlfgl } = attributes;
            _obj_[ssjd] = this.$util.toParseInt(dlfgl);
          });
        }
        //  二产产能恢复率
        if (this.selectVal == 1) {
          legendTitle = "二产产能恢复率";
          const _data_ = this.streetList.map(({ attributes }) => {
            const { ssjd, cnhfl2 } = attributes;
            _obj_[ssjd] = this.$util.toParseInt(cnhfl2);
          });
        }
        //  三产产能恢复率
        if (this.selectVal == 2) {
          legendTitle = "三产产能恢复率";
          const _data_ = this.streetList.map(({ attributes }) => {
            const { ssjd, cnhfl3 } = attributes;
            _obj_[ssjd] = this.$util.toParseInt(cnhfl3);
          });
        }
        const data = Object.keys(_obj_).map(item => {
          return { zj: item, value: _obj_[item] };
        });
        const chart_t_arr = data.sort(this.$util.compare("value")).reverse();
        const chart_t_option_clone = this.chart_T_fixed();
        chart_t_option_clone.legend.data = [{ name: legendTitle }];
        chart_t_option_clone.yAxis[0].data = data.map(item => item.zj);
        chart_t_option_clone.series[0].name = legendTitle;
        chart_t_option_clone.series[0].data = data.map(item => item.value);
        this.doChartOption({
          t: chart_t_option_clone
        });
      }
      //  工业企业员工到岗率
      else if (this.selectVal == 3) {
        const _data_ = this.xmBuildSiteList.map(({ attributes }) => {
          const { zj, ydyg, ydygs } = attributes;
          !_obj_[zj] && (_obj_[zj] = { ydyg: 0, ydygs: 0 });
          _obj_[zj].ydyg += this.$util.toParseInt(ydyg);
          _obj_[zj].ydygs += this.$util.toParseInt(ydygs);
        });
        const data = Object.keys(_obj_).map(item => {
          return { zj: item, ..._obj_[item] };
        });
        //  顶部
        const chart_t_arr = data.sort(this.$util.compare("ydyg")).reverse();
        const chart_t_option_clone = this.chart_T_fixed();
        chart_t_option_clone.yAxis[0].data = data.map(item => item.zj);
        chart_t_option_clone.series[0].data = data.map(item => item.ydygs);
        chart_t_option_clone.series[1].data = data.map(
          item => item.ydyg - item.ydygs
        );
        chart_t_option_clone.series[1].label.formatter = param => {
          return (
            data[param.dataIndex].ydyg +
            "人/" +
            (
              (data[param.dataIndex].ydygs / data[param.dataIndex].ydyg) *
              100
            ).toFixed(2) +
            "%"
          );
        };
        this.doChartOption({
          t: chart_t_option_clone
        });
      }
    },
    doChartOption({ t }) {
      t && this.chart_t.setOption(t, true);
    },
    chart_T_fixed() {
      const t_itemStyle_1 = {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#DA414F" },
          { offset: 1, color: "#FF7783" }
        ])
      };
      const t_itemStyle_0 = {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#FF8146" },
          { offset: 1, color: "#FFD699" }
        ])
      };
      const json = this.$util.clone(
        this.selectVal != 3 ? chart_t_option : chart_m_option
      );
      json.series[0].itemStyle = t_itemStyle_0;
      json.series[1] && (json.series[1].itemStyle = t_itemStyle_1);
      return json;
    }
  }
};
</script>

<style lang="less" scoped>
.jdChart {
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