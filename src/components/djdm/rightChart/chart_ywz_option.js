/** 温州市二产产能恢复率 */
export const chart_ywz_option = {
  color: ["#6EB2FF", "red"],
  legend: {
    top: "20px",
    data: ["二产产能恢复率", "全市平均"],
    textStyle: { color: "#fff", fontSize: 16 },
    inactiveColor: "#000"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  grid: {
    left: "3%",
    right: "20px",
    bottom: "3%",
    top: "80px",
    containLabel: true
  },
  xAxis: {
    type: "value",
    axisLabel: {
      formatter: "{value} %",
      color: "#fff",
      fontSize: 16
    }
  },
  yAxis: {
    type: "category",
    axisLabel: {
      color: "#fff",
      fontSize: 16
    },
    data: [
      "鹿城",
      "龙湾",
      "瓯海",
      "洞头",
      "乐清",
      "瑞安",
      "永嘉",
      "文成",
      "平阳",
      "泰顺",
      "苍南",
      "龙港",
      "瓯江口",
      "经开区"
    ]
  },
  series: [
    {
      name: "二产产能恢复率",
      type: "bar",
      smooth: true,
      label: {
        show: true,
        position: "right",
        formatter: "{c}%"
      },
      itemStyle: {
        normal: {
          color: param => {
            return param.name == "乐清" ? "#FFD700" : "#6EB2FF";
          }
        }
      },
      barWidth: 16,
      data: [
        23.8,
        55.7,
        46.5,
        61.0,
        48.3,
        52.1,
        47.5,
        60.8,
        81.3,
        75.4,
        79.2,
        79.9,
        58.8,
        55.9
      ]
    },
    {
      name: "全市平均",
      // 支持 'average', 'min', 'max'
      type: "line",
      data: [57.81],
      markLine: {
        label: {
          fontSize: 16,
          fontWeight: "bold",
          formatter: "{c} %"
        },
        lineStyle: {
          width: 2
        },
        data: [{ type: "average", name: "平均值" }]
      }
    }
  ]
};
