/** 温州市员工到岗率 */
export const chart_dgl_option = {
  color: ["#6EB2FF", "red", "#FF8C48"],
  title: {
    text: "时间:2020-03-06",
    textStyle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold"
    },
    top: "60px",
    left: "20px"
  },
  legend: {
    top: "20px",
    data: ["员工到岗率", "全市平均", "全省平均"],
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
    top: "100px",
    containLabel: true
  },
  xAxis: {
    min: 60,
    max: 100,
    type: "value",
    splitLine: {
      lineStyle: {
        type: "dashed"
      }
    },
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
      "瓯海",
      "龙岗",
      "经开区",
      "瓯江口",
      "瑞安",
      "龙湾",
      "永嘉",
      "苍南",
      "鹿城",
      "泰顺",
      "平阳",
      "洞头",
      "乐清",
      "文成"
    ]
  },
  series: [
    {
      name: "员工到岗率",
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
        75.8,
        76.5,
        76.6,
        77.1,
        77.3,
        77.5,
        79.1,
        80.1,
        81.6,
        83,
        84.3,
        91.3,
        91.4,
        95.2
      ]
    },
    {
      name: "全市平均",
      type: "line",
      data: [78.7],
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
      data: [89.5],
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
