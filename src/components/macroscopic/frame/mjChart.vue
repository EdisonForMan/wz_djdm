<template>
<div class="mjChart" v-if="list.length">
  <head>
    <span>{{title}}-密切接触者</span>
    <span id="close" @click="()=>{list = []}">x</span>
  </head>
  <div>
    <div class="list">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="goLocation(item)">
          <span>{{++index}}.{{item.attributes.NAME.slice(0,1)}}**,{{item.attributes.Sex}},{{item.attributes.Address_Department}},{{item.attributes.Age}}</span>
        </li>
      </ul>
    </div>
    <div class="chart">
      <div id="cframe"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "mjChart",
  data() {
    return {
      title: "",
      list: [],
      chart: undefined
    };
  },
  mounted() {},
  methods: {
    goLocation(item) {
      console.log(item.geometry);
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    doChart(list) {
      this.chart = this.$echarts.init(document.getElementById("cframe"));
      const sObj = {};
      const sArr = [];
      list.map(({ attributes }) => {
        const { Country } = attributes;
        if (!Country) return false;
        if (!sObj[Country]) {
          sObj[Country] = { Country, count: 0 };
        }
        sObj[Country].count++;
      });
      for (let k in sObj) {
        sArr.push(sObj[k]);
      }
      const fixArr = sArr.sort(this.$util.compare("count")).reverse();
      this.chart.setOption({
        title: {
          text: "密切接触者街道分布",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: fixArr.map(item => {
            return item.Country;
          })
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: fixArr.map(item => {
              return item.count;
            }),
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#fff"
            }
          }
        ]
      });
    }
  },
  watch: {
    list(newV, oldV) {
      this.$nextTick(() => {
        newV.length && this.doChart(newV);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mjChart {
  position: absolute;
  width: 400px;
  height: 600px;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 20;
  top: 0;
  margin: auto;
  left: 360px;
  bottom: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  head {
    display: block;
    box-sizing: border-box;
    padding: 5px;
    height: 40px;
  }
  #close {
    float: right;
    padding: 5px;
    font-size: 17px;
    cursor: pointer;
  }
  > div {
    flex: 1;
    .list {
      height: 258px;
      overflow: auto;
      text-align: left;
      > ul {
        li {
          padding: 10px 0;
          background: #122960;
          text-align: left;
          padding-left: 15px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        li:nth-child(even) {
          background: #081942;
        }
      }
    }
    .list::-webkit-scrollbar {
      display: block;
      width: 6px;
      background-color: rgb(50, 95, 245);
      border-radius: 3px;
    }
    .list::-webkit-scrollbar-thumb {
      width: 6px;
      background-color: rgb(32, 28, 243);
      border-radius: 3px;
    }
    .chart {
      height: 300px;
      box-sizing: border-box;
      padding-top: 20px;
      #cframe {
        height: 100%;
      }
    }
  }
}
</style>