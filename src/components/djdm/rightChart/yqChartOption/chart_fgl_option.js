/** 温州市员工到岗率 */
const data = [
  { name: "瓯江口", val: 85.8 },
  { name: "瑞安", val: 90.2 },
  { name: "泰顺", val: 91.3 },
  { name: "经开区", val: 91.4 },
  { name: "鹿城", val: 92.3 },
  { name: "龙湾", val: 92.6 },
  { name: "洞头", val: 94.2 },
  { name: "永嘉", val: 95.1 },
  { name: "龙港", val: 95.8 },
  { name: "文成", val: 96.9 },
  { name: "苍南", val: 97.3 },
  { name: "乐清", val: 97.7 },
  { name: "平阳", val: 98.8 },
  { name: "瓯海", val: 98.9 }
].sort((o1, o2) => {
  const v1 = o1.val;
  const v2 = o2.val;
  return v2 > v1 ? -1 : v2 < v1 ? 1 : 0;
});
const avg = [{ name: "全市平均", val: 94.59, color: "red" }];
export const chart_fgl_option = {
  color: ["#6EB2FF"],
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
    data: ["复工率", "全市平均"],
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
    min: 84,
    max: 100,
    type: "value",
    splitLine: {
      show: false
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
      name: "复工率",
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
