<template>
  <div class="right-div">
    <div class="gqx">
      <div class="right-div-title">
        <span class="right-div-title-inner">{{force=="xm"?"各县市区":options[selectVal].label}}</span>
        <el-select
          size="mini"
          popper-class="rightSelect"
          v-model="selectVal"
          placeholder="请选择"
          v-if="force == 'xm'?false:true"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div id="gqx-chart"></div>
    </div>
    <div class="yjfw">
      <div class="right-div-title">
        <span class="right-div-title-inner">{{force=="xm"?"省市重点建设项目":fgoptions[selectfgVal].label}}</span>
        <el-select
          size="mini"
          popper-class="rightSelect"
          v-model="selectfgVal"
          placeholder="请选择"
          v-if="force == 'xm'?false:true"
        >
          <el-option
            v-for="item in fgoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div id="yjfw-chart" />
    </div>
    <div class="wlfg">
      <div class="right-div-title">
        <span
          class="right-div-title-inner"
        >{{force=="xm"?"亿元以上建设项目":backwzoptions[selectbackVal].label}}</span>
        <el-select
          size="mini"
          popper-class="rightSelect"
          v-model="selectbackVal"
          placeholder="请选择"
          v-if="force == 'xm'?false:true"
        >
          <el-option
            v-for="item in backwzoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      chart_ren: undefined,
      chart_ren_data: {},
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
      backwzoptions: [
        {
          value: 0,
          label: "外来人口复工区县"
        },
        {
          value: 1,
          label: "回温人员户籍统计"
        }
      ],
      fgoptions: [
        {
          value: 0,
          label: "总复工人员情况"
        },
        {
          value: 1,
          label: "安置房项目人员复工情况"
        },
        {
          value: 2,
          label: "上亿项目人员复工情况"
        }
      ],

      selectVal: 0,
      selectfgVal: 0,
      selectbackVal: 0
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
      this.doChartData();
    },
    //总复工项目监听切换
    selectVal(n, o) {
      this.doChartData();
    },
    //总复工人员切换
    selectfgVal(n, o) {
      this.doChartData();
    },
    //回温人员切换
    selectbackVal(n, o) {
      this.doChartData();
    }
  },
  mounted() {
    this.eventRegister();
    this.chartRegister();
    if (this.buildDataList.length) {
      this.doChartData();
      // this.doChartExtra();
    }
  },
  methods: {
    eventRegister() {
      this.$hub.$on("topDocumentClick", val => {
        this.force = val ? "djdm" : "xm";
        this.$nextTick(() => {
          this.chartRegister();
          this.doChartData();
          // this.doChartExtra();
        });
      });
    },
    chartRegister() {
      this.chart_t = this.$echarts.init(document.getElementById("gqx-chart"));
      this.chart_m = this.$echarts.init(document.getElementById("yjfw-chart"));
      this.chart_b = this.$echarts.init(document.getElementById("wlfg-chart"));
    },
    // doChartExtra() {
    //   if (this.force == "xm") return;
    //   const _data_ = this.backToWzList
    //     .map(({ attributes }) => {
    //       return { ...attributes };
    //     })
    //     .filter(item => item.djdmryhj);
    //   const chart_b_option_clone = this.$util.clone(chart_m_option);
    //   chart_b_option_clone.xAxis.data = _data_.map(item => item.djdmryhj);
    //   chart_b_option_clone.series[0].data = _data_.map(item => item.djdmrs);
    //   this.doChartOption({ b: chart_b_option_clone });
    // },
    doChartData() {
      const _data_ = this.buildDataList
        .map(({ attributes }) => {
          return { ...attributes };
        })
        .filter(item => item.qy);
      if (!_data_.length) return;
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
        // console.log("大建大美数据_data_", _data_);
        // 拿到总项目的数据 djdmxms djdmfgs
        if (this.selectVal == 0) {
          _data_.forEach(({ djdmxms, djdmfgs, qy, id }) => {
            build_date_num.push({
              djdmxms: djdmxms,
              djdmfgs: djdmfgs,
              qy: qy,
              id: id
            });
          });
          chart_t_arr = build_date_num.sort(this.$util.compare("id"));
        }
        // 拿到安置房的数据
        if (this.selectVal == 1) {
          _data_.forEach(({ djdmazxms, djdmazfgs, qy, id }) => {
            build_date_num.push({
              djdmazxms: djdmazxms,
              djdmazfgs: djdmazfgs,
              qy: qy,
              id: id
            });
          });
          chart_t_arr = build_date_num.sort(this.$util.compare("id"));
        }
        //拿到上亿元项目数据
        if (this.selectVal == 2) {
          _data_.forEach(({ djdmyyxms, djdmyyfgs, qy, id }) => {
            build_date_num.push({
              djdmyyxms: djdmyyxms,
              djdmyyfgs: djdmyyfgs,
              qy: qy,
              id: id
            });
          });
          chart_t_arr = build_date_num.sort(this.$util.compare("id"));
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
          return chart_t_arr[param.dataIndex][xmTotal];
        };

        //中部 复工人员统计
        // zrs: "13272"  总项目复工
        // fgrs: "11272"
        // djdmazzfgrs: null 安置房
        // djdmazyfgrs: null
        // djdmyyzfgrs: null 上亿项目的
        // djdmyyyfgrs: null

        let build_data_people = [];
        let char_ren_arr = [];

        //总项目复工人员
        if (this.selectfgVal == 0) {
          _data_.forEach(({ zrs, fgrs, qy, id }) => {
            build_data_people.push({
              zrs: zrs,
              fgrs: fgrs,
              qy: qy,
              id: id
            });
          });
          char_ren_arr = build_data_people.sort(this.$util.compare("id"));
        }
        //安置房复工人员
        if (this.selectfgVal == 1) {
          _data_.forEach(({ djdmazzfgrs, djdmazyfgrs, qy, id }) => {
            build_data_people.push({
              djdmazzfgrs: djdmazzfgrs,
              djdmazyfgrs: djdmazyfgrs,
              qy: qy,
              id: id
            });
          });
          char_ren_arr = build_data_people.sort(this.$util.compare("id"));
        }
        //上亿项目复工人员
        if (this.selectfgVal == 2) {
          _data_.forEach(({ djdmyyzfgrs, djdmyyyfgrs, qy, id }) => {
            build_data_people.push({
              djdmyyzfgrs: djdmyyzfgrs,
              djdmyyyfgrs: djdmyyyfgrs,
              qy: qy,
              id: id
            });
          });
          char_ren_arr = build_data_people.sort(this.$util.compare("id"));
        }

        // 返回人员每个key数组
        const PeopleKey = Object.keys(build_data_people[0]);
        const zfgPeople = PeopleKey[0];
        const fgPeople = PeopleKey[1];
        const fgqy = PeopleKey[2];

        const chart_m_option_clone = this.chart_T_fixed();
        // console.log("char_ren_arr", char_ren_arr);
        chart_m_option_clone.legend.data = ["未复工人数", "已复工人数"];
        chart_m_option_clone.series[0].name = "已复工人数";
        chart_m_option_clone.series[1].name = "未复工人数";
        chart_m_option_clone.title.text = "单位:     人";

        chart_m_option_clone.xAxis[0].data = char_ren_arr.map(
          item => item.qy.replace(/集聚区/g, "")
          // console.log(" item.qy.sdgsg", item)
        );
        //复工
        chart_m_option_clone.series[0].data = char_ren_arr.map(
          item => item[fgPeople]
        );

        //未复工
        chart_m_option_clone.series[1].data = char_ren_arr.map(
          item => item[zfgPeople] - item[fgPeople]
        );

        chart_m_option_clone.series[1].label.formatter = param => {
          return char_ren_arr[param.dataIndex][zfgPeople];
        };

        //  下部 温州外来人口统计
        let chart_b_arr = [];
        const chart_b_option_clone = this.$util.clone(
          this.selectbackVal ? chart_m_option : chart_b_option
        );
        if (this.selectbackVal == 0) {
          let chart_b_arr = _data_.map(({ wlrkfgqx, qy }) => {
            return { name: qy, value: wlrkfgqx ? parseInt(wlrkfgqx) : 0 };
          });
          chart_b_option_clone.series[0].data = chart_b_arr;
        }
        if (this.selectbackVal == 1) {
          chart_b_arr = this.backToWzList
            .map(({ attributes }) => {
              return { ...attributes };
            })
            .filter(item => item.djdmryhj);
          console.log("回温人员", chart_b_arr);
          // djdmrs
          chart_b_arr = chart_b_arr.sort(this.$util.compare("djdmrs"));
          chart_b_option_clone.xAxis.data = chart_b_arr.map(
            item => item.djdmryhj
          );
          chart_b_option_clone.series[0].data = chart_b_arr.map(
            item => item.djdmrs
          );
        }

        this.doChartOption({
          t: chart_t_option_clone,
          m: chart_m_option_clone,
          b: chart_b_option_clone
        });
      }
    },
    doChartOption({ t, m, b }) {
      t && this.chart_t.setOption(t, true);
      m && this.chart_m.setOption(m, true);
      b && this.chart_b.setOption(b, true);
    },
    chart_T_fixed(option) {
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
  position: absolute;
  right: 16px;
  /* margin-left: 20px !important; */
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