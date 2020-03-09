/** 温州市二产产能恢复率 */
const data = [
  { name: "瓯江口", val: 63.8 },
  { name: "瑞安", val: 59 },
  { name: "泰顺", val: 83.3 },
  { name: "经开区", val: 61.8 },
  { name: "鹿城", val: 33.6 },
  { name: "龙湾", val: 64.4 },
  { name: "洞头", val: 66 },
  { name: "永嘉", val: 58.3 },
  { name: "龙港", val: 85.8 },
  { name: "文成", val: 64.6 },
  { name: "苍南", val: 82.9 },
  { name: "乐清", val: 73.1 },
  { name: "平阳", val: 84.6 },
  { name: "瓯海", val: 51.2 }
].sort((o1, o2) => {
  const v1 = o1.val;
  const v2 = o2.val;
  return v2 > v1 ? -1 : v2 < v1 ? 1 : 0;
});
const avg = [
  { name: "全省平均", val: 78, color: "#FF8C48" },
  { name: "全市平均", val: 64, color: "red" }
];
export const chart_ywz_option = {
  color: ["#6EB2FF"],
  title: {
    text: "时间:2020-03-06",
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
    }
  },
  yAxis: {
    type: "category",
    axisLabel: {
      color: "#fff",
      fontSize: 16
    },
    data: data.map(item => item.name)
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
      data: data.map(item => item.val)
    },
    ...avg.map(item => {
      return {
        name: item.name,
        type: "line",
        data: [item.val],
        markLine: {
          label: {
            fontSize: 16,
            fontWeight: "bold",
            formatter: "{c} %"
          },
          lineStyle: {
            width: 2,
            color: item.color
          },
          data: [{ type: "average", name: "平均值" }]
        }
      };
    })
  ]
};
