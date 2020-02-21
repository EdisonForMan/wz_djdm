<template>
<div class="relation">
  <head>
    <span>{{title}} - 密切接触者</span>
    <span id="close" @click="close()">x</span>
  </head>
  <div>
    <div class="list">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>关系</th>
            <th>性别</th>
            <th>地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{++index}}.</td>
            <td>{{item.attributes.NAME.slice(0,1)}}**</td>
            <td>{{item.attributes.Relation}}</td>
            <td>{{item.attributes.Sex}}</td>
            <td>{{item.attributes.Address_Department}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: "relation",
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
      // console.log(item.geometry);
      // item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    close() {
      this.$parent.relationShow = false;
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
  }
};
</script>

<style lang="less" scoped>
.relation {
  position: absolute;
  width: 600px;
  height: 300px;
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
    padding: 0px 5px;
    font-size: 18px;
    cursor: pointer;
  }
  > div {
    flex: 1;

    .list {
      height: 258px;
      overflow: auto;
      // text-align: left;

      table {
        border: 1px solid #ccc;
        width: 96%;
        margin: 0% 2%;

        th,
        td {
          border-bottom: 1px solid #ccc;
          padding: 10px 5px;
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