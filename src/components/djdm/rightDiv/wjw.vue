<template>
  <div id="wjwDiv">
    <h3>
      - 温州市疫情防控管控力指数 -
      <select id="select" @change="bqSelect($event)">
        <option value="fbl">二代及以上病例 图一</option>
        <option value="mzbls">二代及以上病例 图二</option>
        <option value="fxl">主动发现病例</option>
        <option value="qzbls">聚集性疫情管控 图一</option>
        <option value="jubls">聚集性疫情管控 图二</option>
      </select>
    </h3>
    <div id="wjwChart"></div>
    <div class="wjwDesc">{{ desc }}</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      desc: ''
    };
  },
  methods: {
    // 卫健委指数
    wjwzs (titlename, data, titleText) {
      const chart = this.$echarts.init(document.getElementById("wjwChart"));
      chart.setOption({
          title: {
            text: titleText.length > 6 ? titleText.substr(0, 6) + '\n' + titleText.substr(6) : titleText,
            right: '1%',
            top: '5%',
            textStyle: {
              fontSize: 15,
              width: 20,
              color: 'rgb(246, 227, 27)'
            }
          },
          xAxis: {
              show: false
          },
          grid: {
            left: '15%',
            right: '10%',
            bottom: '8%',
            top: '2%'
          },
          yAxis: [{
              show: true,
              data: titlename,
              inverse: true,
              axisLabel: {
                  textStyle: {
                      fontSize: 12,
                      color: '#fff',
                  },
                  interval: 0
              },
              axisLine: {
                  show: false
              },
              splitLine: {
                  show: false
              },
              axisTick: {
                  show: false
              }
          }],
          series: [{
              name: '条',
              type: 'bar',
              yAxisIndex: 0,
              data: data,
              itemStyle: {
                  normal: {
                      color: '#1089E7'
                  }
              },
              label: {
                  normal: {
                      show: true,
                      color: '#fff',
                      position: 'right'
                  }
              },
          } ]
      });
    },
    changewjwzs (marks, titleNanme) {
      // let data = marks.sort((a,b) => a.value - b.value);
      let title = [];
      let result = [];
      marks.map((item) => {
        title.push(item.key);
        result.push(item.value);
      });
      this.wjwzs(title, result, titleNanme);
    },
    changebqSelect (value) {
      switch (value) {
        case 'fbl': 
          this.changewjwzs(window.SHI_QU_DATA.zhishuData.fbl, window.SHI_QU_DATA.zhishuData.fblTitle);
          this.desc = window.SHI_QU_DATA.zhishuData.fblDesc;
          break;
        case 'mzbls':
          this.changewjwzs(window.SHI_QU_DATA.zhishuData.mzbls, window.SHI_QU_DATA.zhishuData.mzblsTitle);
          this.desc = window.SHI_QU_DATA.zhishuData.mzblsDesc;
          break;
        case 'fxl':
          this.changewjwzs(window.SHI_QU_DATA.zhishuData.fxl, window.SHI_QU_DATA.zhishuData.fxlTitle);
          this.desc = window.SHI_QU_DATA.zhishuData.fxlDesc;
          break;
        case 'qzbls':
          this.changewjwzs(window.SHI_QU_DATA.zhishuData.qzbls, window.SHI_QU_DATA.zhishuData.qzblsTitle);
          this.desc = window.SHI_QU_DATA.zhishuData.qzblsDesc;
          break;
        case 'jubls':
          this.changewjwzs(window.SHI_QU_DATA.zhishuData.jubls, window.SHI_QU_DATA.zhishuData.jublsTitle);
          this.desc = window.SHI_QU_DATA.zhishuData.jublsDesc;
          break;
      }
    },
    bqSelect: function(event) {
      this.$echarts.init(document.getElementById("wjwChart")).clear();
      this.changebqSelect(event.target.value);
    }
  },
  created() {
  },
  mounted() {
    this.changebqSelect('fbl');
  }
};
</script>

<style>
#fy-rightDiv #wjwDiv {
  width: 100%;
  /*height: 34%;*/
  height: 34%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
  position: relative;
}
#fy-rightDiv #wjwDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
  padding-left: 2%;
  text-align: left;
}
#fy-rightDiv #wjwDiv h3 select {
  background-color: #0c7cd2;
  border: none;
  color: #fff;
  padding: 7px 7px;
  margin-left: 5px;
}
#fy-rightDiv #wjwDiv #wjwChart {
  width: 100%;
  height: 85%;
}
#wjwDiv .wjwDesc {
  position: absolute;
  z-index: 10;
  bottom: 1%;
  left: 2%;
  font-size: 12px;
  color: #ccc;
}
</style>