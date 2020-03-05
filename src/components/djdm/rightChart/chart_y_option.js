/** 乐清市产能恢复率 */
export const chart_y_option = {
  color: ["#FF8C48", "#6EB2FF", "#FFE01D"],
  legend: {
    top: "20px",
    data: [],
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
      interval: i => true
    },
    axisLine: {
      lineStyle: {
        color: "#fff"
      }
    },
    data: []
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
    min: 24,
    max: 80,
    axisLabel: {
      formatter: "{value} %",
      color: "#fff",
      fontSize: 14
    }
  },
  series: []
};
export const SERIES = {
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
/** 乐清产能恢复率 */
export const chart1 = {
  name: [
    "2月\n23日",
    "2月\n24日",
    "2月\n25日",
    "2月\n26日",
    "2月\n27日",
    "2月\n28日",
    "2月\n29日",
    "3月\n1日",
    "3月\n2日"
  ],
  全省产能恢复率: [53.2, 55.2, 58.0, 62.5, 68, 71.3, 76.8, 74, 75.9],
  全市产能恢复率: [38.4, 42.8, 45.8, 48.7, 56.6, 60, 69.8, 67.5, 67],
  乐清市产能恢复率: [32.1, 38.9, 43.1, 43.5, 50.1, 58.5, 62.2, 62.3, 64]
};
