<template>
  <div class="commonEchart" :id="id"></div>
</template>

<script>
import echarts from "echarts";
require("echarts-wordcloud");
export default {
  name: "ecoecharts",
  props: {
    id: String,
    option: Object
  },
  data() {
    return {
      chart: null
    };
  },
  components: {},
  created() {},
  watch: {
    option: {
      handler(newVal, val) {
        this.chart && this.chart.setOption(newVal);
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
  },
  computed: {},
  methods: {
    initChart() {
      let that = this;
      this.chart = echarts.init(document.getElementById(that.id));
      // 把配置和数据放这里
      this.chart.setOption(that.option);
      //根据窗口的大小变动图表
      window.onresize = function() {
        that.chart.resize();
      };
      /*window.addEventListener("resize", function() {
        chart.resize();
      });*/
    }
  }
};
</script>
 <style lang="less">
.commonEchart {
  height: 100%;
  width: 100%;
}
</style>