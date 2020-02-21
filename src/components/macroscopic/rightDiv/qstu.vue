<template>
  <div id="qstuDiv">
    <div id="qstuChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {};
  },
  methods: {
    drawQuShi () {
      const chart = this.$echarts.init(document.getElementById("qstuChart"));
      chart.setOption({
          title: {
            text: '温州市病例统计',
            left: '2%',
            top: '2%',
            textStyle: {
              color: '#23c9f3',
              fontSize: 19
            }
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {
              data: ['累计趋势(例)', '新增趋势(例)'],
              textStyle: {
                  color: '#fff',
                  fontSize: 14,
                  itemGap: 15
              },
              top: '4%',
              right: '2%',
              icon: 'roundRect'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '4%',
              containLabel: true
          },
          xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisTick: {
                  show: false
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                  fontSize: 11,
                  fontWeight: 'bold',
                  margin: 10,
                  color: '#fff'
              },
              data: window.SHI_QU_DATA.qushiData.xz.date
          }],
          yAxis: [{
              type: 'value',
              max: 600,
              axisTick: {
                  inside: true,
                  lineStyle: {
                      color: '#3DEFFF'
                  } 
              },
              axisLine: {
                  lineStyle: {
                      color: '#3DEFFF'
                  }  
              },
              axisLabel: {
                  fontSize: 11,
                  fontWeight: 'bold'
              },
              splitLine: {
                  show: false
              },
              splitArea: {
                  show: true,
                  areaStyle: {
                      color: ['rgba(22,80,195,.1)','rgba(9,42,135,.1)']
                  }
              }
          }],
          series: [{
                  name: '累计趋势(例)',
                  type: 'line',
                  areaStyle: {
                      opacity: 0.8
                  },
                  color: '#00DAFF',
                  data: window.SHI_QU_DATA.qushiData.lj.value
              },
              {
                  name: '新增趋势(例)',
                  type: 'line',
                  areaStyle: {
                      opacity: 0.8
                  },
                  color: '#EE3B36',
                  data: window.SHI_QU_DATA.qushiData.xz.value
              }
          ]
      });
    }
  },
  mounted() {
    this.drawQuShi();
  }
};
</script>

<style>
#fy-rightDiv #qstuDiv {
  width: 100%;
  /*height: 34%;*/
  height: 30%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
}
#fy-rightDiv #qstuDiv #qstuChart {
  width: 100%;
  height: 100%;
}
</style>