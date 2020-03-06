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
      "瓯海",
      "永嘉",
      "乐清",
      "瑞安",
      "龙湾",
      "经开区",
      "瓯江口",
      "文成",
      "洞头",
      "泰顺",
      "苍南",
      "龙港",
      "平阳"
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
        46.5,
        47.5,
        48.3,
        52.1,
        55.7,
        55.9,
        58.8,
        60.8,
        61,
        75.4,
        79.2,
        79.9,
        81.3
      ]
    },
    {
      name: "全市平均",
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
    },
    {
      name: "全省平均",
      type: "line",
      data: [68.2],
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
