/** 温州市员工到岗率 */
export const chart_dgl_option = {
  color: ["#6EB2FF", "red"],
  legend: {
    top: "20px",
    data: ["员工到岗率"],
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
    top: "60px",
    containLabel: true
  },
  xAxis: {
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
      "乐清",
      "苍南",
      "鹿城",
      "泰顺",
      "平阳",
      "洞头",
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
        79.2,
        80.1,
        81.6,
        83,
        84.3,
        91.3,
        95.2
      ]
    }
  ]
};
