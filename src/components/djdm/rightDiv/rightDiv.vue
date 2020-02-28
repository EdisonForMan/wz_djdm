<template>
  <div class="right-div">
    <div class="gqx">
      <div class="right-div-title">
        <span class="right-div-title-inner">{{force=="xm"?"各县市区":options[selectVal].label}}</span>
        <el-select size="mini"
                   popper-class="rightSelect"
                   v-model="selectVal"
                   placeholder="请选择"
                   v-if="force == 'xm'?false:true">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </div>
      <div id="gqx-chart"></div>
    </div>
    <div class="yjfw">
      <div class="right-div-title">
        <span class="right-div-title-inner">{{force=="xm"?"省市重点建设项目":"回温人员户籍省份统计"}}</span>
      </div>
      <div id="yjfw-chart" />
    </div>
    <div class="wlfg">
      <div class="right-div-title">
        <span class="right-div-title-inner">{{force=="xm"?"亿元以上建设项目":"外来人口复工区县分布"}}</span>
      </div>
      <div id="wlfg-chart" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import chart_t_option from "./chart_t_option";
import chart_m_option from "./chart_m_option";
import chart_b_option from "./chart_b_option";
import { sszdJson, yyysJson } from "./chart_xm_json";
export default {
  data() {
    return {
      //  无用,先放着
      chart_t: undefined,
      chart_t_data: {},
      chart_m: undefined,
      chart_m_data: {},
      chart_b: undefined,
      chart_b_data: {},
      force: "xm",
      options: [
        {
          value: 0,
          label: "总复工情况"
        },
        {
          value: 1,
          label: "安置房项目复工情况"
        },
        {
          value: 2,
          label: "上亿项目复工情况"
        }
      ],
      selectVal: 0
    };
  },
  computed: {
    ...mapState({
      buildDataList: state => state.buildDataList,
      backToWzList: state => state.backToWzList
    }),
    chartVisibility() {
      return this.force == "xm" ? "hidden" : "visible";
    }
  },
  watch: {
    buildDataList(n, o) {
      this.doChartData();
    },
    backToWzList(n, o) {
      this.doChartExtra();
    },
    //监听切换
    selectVal(n, o) {
      this.doChartData();
    }
  },
  mounted() {
    this.eventRegister();
    this.chartRegister();
    if (this.buildDataList.length) {
      this.doChartData();
      this.doChartExtra();
    }
  },
  methods: {
    eventRegister() {
      this.$hub.$on("topDocumentClick", val => {
        this.force = val ? "djdm" : "xm";
        this.$nextTick(() => {
          this.chartRegister();
          this.doChartData();
          this.doChartExtra();
        });
      });
    },
    chartRegister() {
      this.chart_t = this.$echarts.init(document.getElementById("gqx-chart"));
      this.chart_m = this.$echarts.init(document.getElementById("yjfw-chart"));
      this.chart_b = this.$echarts.init(document.getElementById("wlfg-chart"));
    },
    doChartExtra() {
      if (this.force == "xm") return;
      const _data_ = this.backToWzList
        .map(({ attributes }) => {
          return { ...attributes };
        })
        .filter(item => item.djdmryhj);
      const chart_m_option_clone = this.$util.clone(chart_m_option);
      chart_m_option_clone.xAxis.data = _data_.map(item => item.djdmryhj);
      chart_m_option_clone.series[0].data = _data_.map(item => item.djdmrs);
      this.doChartOption({ m: chart_m_option_clone });
    },
    doChartData() {
      const _data_ = this.buildDataList
        .map(({ attributes }) => {
          return { ...attributes };
        })
        .filter(item => item.qy);
      if (this.force == "xm") {
        //  顶部
        const chart_t_arr = _data_
          .sort(this.$util.compare("yyysxms"))
          .reverse();
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
        //  中部
        const chart_m_option_clone = this.chart_T_fixed();
        chart_m_option_clone.xAxis[0].data = sszdJson.name;
        chart_m_option_clone.series[0].data = sszdJson.fg;
        chart_m_option_clone.series[1].data = sszdJson.xm.map((item, index) => {
          return item - sszdJson.fg[index];
        });
        chart_m_option_clone.series[1].label.formatter = param => {
          return sszdJson.xm[param.dataIndex];
        };
        //  下部
        const chart_b_option_clone = this.chart_T_fixed();
        chart_b_option_clone.xAxis[0].data = yyysJson.name;
        chart_b_option_clone.series[0].data = yyysJson.fg;
        chart_b_option_clone.series[1].data = yyysJson.xm.map((item, index) => {
          return item - yyysJson.fg[index];
        });
        chart_b_option_clone.series[1].label.formatter = param => {
          return yyysJson.xm[param.dataIndex];
        };
        this.doChartOption({
          t: chart_t_option_clone,
          m: chart_m_option_clone,
          b: chart_b_option_clone
        });
      } else {
        //  顶部
        //总复工情况
        let build_date = {};
        let build_date_num = [];
        let chart_t_arr = [];
        if (this.selectVal == 0) {
          // 拿到总项目的数据 djdmxms djdmfgs
          _data_.forEach(({ djdmxms, djdmfgs, qy }) => {
            build_date_num.push({
              djdmxms: djdmxms,
              djdmfgs: djdmfgs,
              qy: qy
            });
          });
          // console.log("build_date对象", build_date);
          // console.log("build_date_num数组", build_date_num);
          chart_t_arr = build_date_num
            .sort(this.$util.compare("djdmxms"))
            .reverse();
          console.log("chart_t_arr总复工的数据", chart_t_arr);
        }
        if (this.selectVal == 1) {
          // 拿到安置房的数据
          _data_.forEach(({ djdmazxms, djdmazfgs, qy }) => {
            build_date_num.push({
              djdmazxms: djdmazxms,
              djdmazfgs: djdmazfgs,
              qy: qy
            });
          });
          chart_t_arr = build_date_num
            .sort(this.$util.compare("djdmazxms"))
            .reverse();
          console.log("chart_t_arr安置房的数据", chart_t_arr);
        }
        if (this.selectVal == 2) {
          //拿到上亿元项目数据
          _data_.forEach(({ djdmyyxms, djdmyyfgs, qy }) => {
            build_date_num.push({
              djdmyyxms: djdmyyxms,
              djdmyyfgs: djdmyyfgs,
              qy: qy
            });
          });
          chart_t_arr = build_date_num
            .sort(this.$util.compare("djdmyyxms"))
            .reverse();
        }
        // 返回每个key数组
        const keyData = Object.keys(build_date_num[0]);
        const xmTotal = keyData[0];
        const fgTotal = keyData[1];
        const qy = keyData[2];

        const chart_t_option_clone = this.chart_T_fixed();
        chart_t_option_clone.xAxis[0].data = chart_t_arr.map(item =>
          item.qy.replace(/集聚区/g, "")
        );
        //复工
        chart_t_option_clone.series[0].data = chart_t_arr.map(
          item => item[fgTotal]
        );

        //未复工
        chart_t_option_clone.series[1].data = chart_t_arr.map(
          item => item[xmTotal] - item[fgTotal]
        );

        chart_t_option_clone.series[1].label.formatter = param => {
          return chart_t_arr[param.dataIndex].djdmxms;
        };

        //  下部
        //外来人口
        const chart_b_arr = _data_.map(({ wlrkfgqx, qy }) => {
          return { name: qy, value: wlrkfgqx ? parseInt(wlrkfgqx) : 0 };
        });
        const chart_b_option_clone = this.$util.clone(chart_b_option);
        chart_b_option_clone.series[0].data = chart_b_arr;
        this.doChartOption({
          t: chart_t_option_clone,
          b: chart_b_option_clone
        });
      }
    },
    doChartOption({ t, m, b }) {
      t && this.chart_t.setOption(t, true);
      m && this.chart_m.setOption(m, true);
      b && this.chart_b.setOption(b, true);
    },
    chart_T_fixed() {
      const t_itemStyle_0 = {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#FFB243" },
          { offset: 1, color: "#FFE64E" }
          // { offset: 0, color: "#7949FF" },
          // { offset: 1, color: "#938FFF" }
        ])
      };
      const t_itemStyle_1 = {
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          // { offset: 0, color: "#FFB243" },
          // { offset: 1, color: "#FFE64E" }
          { offset: 0, color: "#7949FF" },
          { offset: 1, color: "#938FFF" }
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
<style>
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
.right-div-title .el-select {
  margin-left: 20px !important;
}
.right-div-title .el-select .el-input input {
  color: #7bb7df !important;
  background: #01195a !important;
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