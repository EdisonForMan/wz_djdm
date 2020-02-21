<template>
  <div id="bltjDiv">
    <h3>
      - 温州市病例统计 -
      <select id="select" @change="bqSelect($event)">
        <option value="qzbl">确诊病例</option>
        <option value="mj">密切接触者</option>
        <option value="gld_list">集中隔离者</option>
        <option value="gld">疫点</option>
      </select>
    </h3>
    <div id="bqtjChart"></div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {};
  },
  methods: {
    getItem({ id }, label) {
      if (~["疫情分布", "疫情统计"].indexOf(label) && id !== "ytyg") {
        const _id_ = id.replace(/m_/g, "");
        this.dataAge = this.dataHash[_id_];
        document.getElementById("select").value = _id_;
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.zqzb();
      }
    },
    //灾情占比
    zqzb() {
      const chart = this.$echarts.init(document.getElementById("bqtjChart"));
      chart.setOption({
        grid: {
          left: "8%",
          right: "5%",
          top: "14%"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          show: true,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 15,
            color: "#FFF",
            formatter: function(val) {
              return val.split("").join("\n");
            }
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          data: this.dataAge
            .sort((a, b) => b.value - a.value)
            .map(item => item.name)
        },
        yAxis: {
          type: "value",
          name: "",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#FFF"
                }
              }
            },
            barWidth: "45%",
            yAxisIndex: 0,
            data: this.dataAge
          }
        ]
      });
    },
    // 确诊趋势
    qzqs() {
      const chart = this.$echarts.init(document.getElementById("bqtjChart"));
      chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          show: true,
          icon: "roundRect",
          bottom: "2%",
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        color: ["#0080ff", "#4cd5ce"],
        grid: {
          left: "3%",
          right: "6%",
          top: "10%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dataName,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          },
          axisTick: false,
          axisLine: {
            lineStyle: {
              color: "#9fdbfd",
              width: 2
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            onZero: false,
            lineStyle: {
              width: 2,
              color: "#9fdbfd"
            }
          },
          axisTick: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#17035a"
            }
          }
        },
        series: [
          {
            name: "温州市确诊人员增长趋势(例)",
            type: "line",
            smooth: true,
            //  symbol: "none", //去掉折线点
            itemStyle: {
              normal: {
                color: "rgba(14, 255, 216)",
                lineStyle: {
                  width: 2,
                  type: "solid",
                  color: "#1ff4fa"
                },
                label: { show: true, color: "#fff" }
              }
            },
            symbolSize: 5,
            areaStyle: {
              normal: {}
            },
            data: this.dataQS
          },
          {
            name: "鹿城确诊人员增长趋势(例)",
            type: "line",
            smooth: true,
            //  symbol: "none", //去掉折线点
            itemStyle: {
              normal: {
                color: "rgba(254,77,105)", //背景色
                lineStyle: {
                  width: 2,
                  type: "solid",
                  color: "rgb(254,77,105)"
                },
                label: { show: true, color: "#fff" }
              }
            },
            symbolSize: 5,
            areaStyle: {
              normal: {}
            },
            data: this.dataLC
          }
        ]
      });
    },
    bqSelect: function(event) {
      console.log(event);
      if (event.target.value != "zzqs") {
        this.dataAge = this.dataHash[event.target.value];
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.zqzb();
      } else {
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.qzqs();
      }
    }
  },
  created() {
    const {
      dataAge,
      YTdataAge,
      dataName,
      dataQS,
      dataLC,
      ysblDate,
      jzglDate,
      glryDate,
      mqzDate,
      jjglDate,
      hbhlDate
    } = this.$window.nCov_luchengChart;
    this.dataAge = dataAge;
    this.YTdataAge = YTdataAge;
    this.dataName = dataName;
    this.dataQS = dataQS;
    this.dataLC = dataLC;

    this.dataHash = {
      qzbl: dataAge,
      zzbl: ysblDate,
      gld: jzglDate,
      gld_list: glryDate,
      mj: mqzDate,
      jjgl: jjglDate,
      hbhw: hbhlDate
    };
  },
  mounted() {
    this.zqzb();
  }
};
</script>

<style>
#fy-rightDiv #bltjDiv {
  width: 100%;
  height: 34%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
}

#fy-rightDiv #bltjDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}

#fy-rightDiv #bltjDiv #ylzyChart {
  width: 100%;
  height: 60%;
}

#fy-rightDiv #bltjDiv h3 select {
  background-color: #0c7cd2;
  border: none;
  color: #fff;
  padding: 7px 7px;
  margin-left: 5px;
}

#fy-rightDiv #bltjDiv #bqtjChart {
  width: 100%;
  height: 85%;
}
</style>