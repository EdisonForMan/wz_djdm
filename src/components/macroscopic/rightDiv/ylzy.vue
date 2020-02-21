<template>
  <div id="ylzyDiv">
    <h3>
      <a
        v-on:click="popShowFun(1)"
        style="font-size: 14px;color: #fff;cursor: pointer;position: absolute;left: 10px;"
      >隔离人员详情</a>
      - 各街镇集中隔离点空闲房间数 -
      <a
        v-on:click="popShowFun(2)"
        style="font-size: 14px;color: #fff;cursor: pointer;position: absolute;right: 10px;"
      >隔离点详情</a>
    </h3>
    <div class="ylzySelect" style="display:none">
      <select name id>
        <option value>鹿城区</option>
        <option value>龙湾区</option>
        <option value>瓯海区</option>
        <option value>乐清市</option>
        <option value>洞头区</option>
        <option value>苍南县</option>
        <option value>龙港市</option>
        <option value>永嘉县</option>
        <option value>文成县</option>
        <option value>平阳县</option>
      </select>
      <select name id>
        <option value>集中隔离点</option>
        <option value>发热门诊机构</option>
      </select>
      <select name id>
        <option value>空闲房间数</option>
        <option value>总房间数</option>
        <!-- <option value>疫苗及其他药物</option> -->
      </select>
    </div>
    <div id="ylzyChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import util from "../util";

export default {
  data() {
    return {};
  },
  methods: {
    mapPh() {
      const chart = this.$echarts.init(document.getElementById("ylzyChart"));
      chart.setOption({
        grid: {
          left: "3%",
          right: "7%",
          top: "3%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{b0}: {c0}"
        },
        legend: {
          icon: "roundRect",
          bottom: "0%",
          textStyle: {
            color: "#fff"
          },
          data: ["已用房间数", "总房间数"]
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: {
          type: "category",
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#64c4e4"
            }
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          data: this.phname
        },
        series: [
          {
            type: "bar",
            name: "总房间数",
            barGap: "-100%",
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff"
              }
            },
            legendHoverLink: false,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#7E47FF"
              },
              emphasis: {
                color: "#7E47FF"
              }
            },
            data: this.sumData
          },
          {
            type: "bar",
            name: "已用房间数",
            barGap: "-100%",
            stack: "2",
            legendHoverLink: false,
            barWidth: 10,
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#fff"
              }
            },
            itemStyle: {
              normal: {
                color: "#FD5916"
              },
              emphasis: {
                color: "#FD5916"
              }
            },
            data: this.usedData
          }
        ]
      });
      chart.on("click", function(params) {
        alert(params.name); //点击事件在这里，这里写方法
      });
    },
    popShowFun(type) {
      //执行
      util.$emit("popshow", type);
    }
  },
  mounted() {
    this.mapPh(); //调用地图边上的柱状图
  },
  created() {
    const { phname, sumData, usedData } = this.$window.nCov_luchengChart;
    this.phname = phname;
    this.sumData = sumData;
    this.usedData = usedData;
  }
};
</script>

<style>
#fy-rightDiv #ylzyDiv {
  width: 100%;
  height: 30%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
}
#fy-rightDiv #ylzyDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#fy-rightDiv #ylzyDiv #ylzyChart {
  width: 100%;
  height: 83%;
}
#fy-rightDiv .ylzySelect {
  width: 100%;
  height: 35px;
  margin-top: 15px;
}
#fy-rightDiv .ylzySelect select {
  background-color: #0c7cd2;
  border: none;
  color: #fff;
  padding: 7px 7px;
  margin-left: 5px;
}
</style>