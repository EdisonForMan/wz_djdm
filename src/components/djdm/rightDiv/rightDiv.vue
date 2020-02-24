<template>
  <div class="right-div">
    <div class="gqx">
      <div class="right-div-title">
        <span class="right-div-title-inner">各乡镇街道功能区复工情况</span>
      </div>
      <el-select size="small" v-model="selectVal" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div id="gqx-chart"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import chart_t_option from "./chart_t_option";
import chart_m_option from "./chart_m_option";
export default {
  data() {
    return {
      options: [
        {
          value: 0,
          label: "功能区复工情况"
        },
        {
          value: 1,
          label: "到岗率分析"
        }
      ],
      selectVal: 0
    };
  },
  computed: {
    ...mapState({
      xmBuildSiteList: state => state.xmBuildSiteList
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
    this.eventRegister();
    this.chartRegister();
    if (this.xmBuildSiteList.length) {
      this.doChartData();
    }
  },
  methods: {
    eventRegister() {},
    chartRegister() {
      this.chart_t = this.$echarts.init(document.getElementById("gqx-chart"));
    },
    doChartData() {
      const _obj_ = {};
      const _data_ = this.xmBuildSiteList.map(({ attributes }) => {
        const { zj, cnfhqk, ydyg, ydygs } = attributes;
        !_obj_[zj] && (_obj_[zj] = { ydyg: 0, ydygs: 0 });
        if (this.selectVal) {
          _obj_[zj].ydyg += ydyg && ydyg != "NULL" ? parseInt(ydyg) : 0;
          _obj_[zj].ydygs += ydygs && ydygs != "NULL" ? parseInt(ydygs) : 0;
        } else {
          _obj_[zj].ydyg += 1;
          _obj_[zj].ydygs += cnfhqk && parseInt(cnfhqk) > 0 ? 1 : 0;
        }
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
        return data[param.dataIndex].ydyg;
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
      const json = this.$util.clone(
        this.selectVal ? chart_m_option : chart_t_option
      );
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
  height: 100%;
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
.el-select{
  margin-top: 10px;
}
</style>