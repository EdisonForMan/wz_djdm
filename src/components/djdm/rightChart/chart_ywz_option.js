/** 温州市二产产能恢复率 */
export const chart_ywz_option = {
  color: ["#6EB2FF", "red", "#FF8C48"],
  title: {
    text: "时间:2020-03-02",
    textStyle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold"
    },
    top: "80px",
    left: "20px"
  },
  legend: {
    top: "20px",
    data: ["二产产能恢复率", "全市平均", "全省平均"],
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
    right: "30px",
    bottom: "50px",
    top: "120px",
    containLabel: true
  },
  xAxis: {
    min: 16,
    max: 85,
    type: "value",
    axisLabel: {
      formatter: "{value}%",
      color: "#fff",
      fontSize: 16
    },
    splitLine: {
      show: false
    },
  },
  yAxis: {
    type: "category",
    axisLabel: {
      color: "#fff",
      fontSize: 16
    },
    data: [
      "鹿城",
      "瓯海",
      "乐清",
      "永嘉",
      "瑞安",
      "经开区",
      "瓯江口",
      "龙湾",
      "文成",
      "洞头",
      "苍南",
      "泰顺",
      "平阳",
      "龙港",
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
        33.6,
        51.2,
        56.1,
        58.3,
        59.0,
        61.8,
        63.8,
        64.4,
        64.6,
        66,
        82.9,
        83.3,
        84.6,
        85.8,
      ]
    },
    {
      name: "全市平均",
      type: "line",
      data: [64],
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
    },
    {
      name: "全省平均",
      type: "line",
      data: [78],
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
