/** 温州市员工到岗率 */
const data = [
  { name: "瓯江口", val: 77.1 },
  { name: "瑞安", val: 77.3 },
  { name: "泰顺", val: 83 },
  { name: "经开区", val: 76.6 },
  { name: "鹿城", val: 81.6 },
  { name: "龙湾", val: 77.5 },
  { name: "洞头", val: 91.3 },
  { name: "永嘉", val: 79.1 },
  { name: "龙港", val: 76.1 },
  { name: "文成", val: 95.2 },
  { name: "苍南", val: 80.1 },
  { name: "乐清", val: 91.4 },
  { name: "平阳", val: 84.3 },
  { name: "瓯海", val: 75.8 }
].sort((o1, o2) => {
  const v1 = o1.val;
  const v2 = o2.val;
  return v2 > v1 ? -1 : v2 < v1 ? 1 : 0;
});
const avg = [
  { name: "全省平均", val: 89.5, color: "#FF8C48" },
  { name: "全市平均", val: 78.7, color: "red" }
];
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
    min: 70,
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
    data: data.map(item => item.name)
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
