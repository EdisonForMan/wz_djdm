/** 乐清市产能恢复率 */
const chart1 = {
  name: [
    "2月\n28日",
    "2月\n29日",
    "3月\n1日",
    "3月\n2日",
    "3月\n3日",
    "3月\n4日",
    "3月\n5日",
    "3月\n6日",
    "3月\n7日"
  ],
  全省产能恢复率: [71.3, 76.8, 74, 75.9, 80.1, 82.8, 82.0, 83.3, 96.5],
  温州市产能恢复率: [60, 69.8, 67.5, 67, 71.7, 76.5, 78.1, 81.6, 85.8],
  乐清市产能恢复率: [52.5, 54.2, 55.6, 57.3, 58, , , 88, 101]
};
const SERIES = {
  name: "",
  type: "line",
  smooth: true,
  label: {
    show: true,
    position: "top",
    formatter: "{c}%"
  },
  lineStyle: {
    width: 5,
    shadowColor: "rgba(0,0,0,0.4)",
    shadowBlur: 10,
    shadowOffsetY: 10
  },
  data: []
};
export const chart_y_option = {
  color: ["#FF8C48", "#6EB2FF", "#FFE01D"],
  legend: {
    top: "20px",
    data: Object.keys(chart1).filter(item => !["name"].includes(item)),
    textStyle: { color: "#fff", fontSize: 16 },
    inactiveColor: "#000"
  },
  tooltip: {
    show: true,
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  grid: {
    top: "100px",
    left: "3%",
    right: "4%",
    bottom: "50px",
    containLabel: true
  },
  xAxis: {
    axisLabel: {
      interval: i => true,
      fontSize: 12
    },
    axisLine: {
      lineStyle: {
        color: "#fff"
      }
    },
    data: chart1.name
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        type: "dashed"
      }
    },
    min: 40,
    max: 100,
    axisLabel: {
      formatter: "{value} %",
      color: "#fff",
      fontSize: 14
    }
  },
  series: Object.keys(chart1)
    .filter(item => !["name"].includes(item))
    .map(item => {
      const series = JSON.parse(JSON.stringify(SERIES));
      series.name = item;
      series.data = chart1[item];
      return series;
    })
};
