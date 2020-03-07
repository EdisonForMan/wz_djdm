/** 各区县 */
export default {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  grid: {
    top: "60px",
    left: "20px",
    right: "50px",
    bottom: "40px",
    containLabel: true
  },
  legend: {
    show: true,
    top: "20px",
    right: "center",
    textStyle: {
      color: "#fff"
    },
    data: [
      {
        name: "未到员工"
      },
      {
        name: "已到员工"
      }
    ]
  },

  xAxis: {
    show: false,
    type: "value",
    name: "例",
    nameTextStyle: {
      fontSize: 14,
      color: "#fff"
    },
    axisLabel: {
      textStyle: {
        fontSize: 12,
        color: "#fff"
      }
    },
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: "#fff"
      }
    }
  },
  yAxis: [
    {
      boundaryGap: true,
      type: "category",
      inverse: "true",
      axisTick: {
        show: false,
        color: "#fff",
        alignWithLabel: true
      },
      axisLabel: {
        textStyle: {
          fontSize: 14,
          color: "#fff"
        },
        show: true
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#fff"
        }
      },
      data: []
    }
  ],
  series: [
    {
      name: "已到员工",
      type: "bar",
      stack: "one",
      label: {
        show: false
      },
      barWidth: 18,
      data: []
    },
    {
      name: "未到员工",
      type: "bar",
      stack: "one",
      label: {
        show: true,
        position: "right",
        color: "#fff",
        formatter: function (param) {
          return param.value;
        }
      },
      barWidth: 18,
      data: []
    }
  ]
};
