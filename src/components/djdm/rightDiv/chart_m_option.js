import echarts from "echarts"
/** 中部图表 */
export default {
    title: {
        text: "单位:     万人",
        textStyle: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "normal"
        },
        top: "0%",
        right: "3%"
    },
    grid: {
        top: "15%",
        bottom: "27%",
        left: "9%",
        right: "4%"
    },
    legend: {
        show: false,
        right: "4%",
        top: "20%",
        textStyle: {
            color: "#fff"
        },
        data: [{ name: "治愈率" }]
    },
    tooltip: {
        trigger: "axis",
        label: {
            show: true
        }
    },
    xAxis: {
        boundaryGap: false, //默认,坐标轴留白策略
        axisLine: {
            show: true,
            lineStyle: {
                color: "#fff"
            }
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                fontSize: 14,
                color: "#fff"
            },
            interval: 0,
            formatter: function (param) {
                let str = "";
                for (let i = 0; i < param.length; i++) {
                    if (i == param.length - 1) {
                        str += param[i];
                    } else {
                        str += param[i] + "\n";
                    }
                }
                return str;
            }
        },
        data: []
    },
    yAxis: {
        axisLine: {
            show: true,
            lineStyle: {
                color: "#fff"
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: "#13194C",
                width: 2
            }
        },
        axisTick: {
            show: false,
            lineStyle: {
                color: "#fff"
            }
        },
        splitArea: {
            show: false
        }
    },
    series: [
        {
            name: "预计返温人员",
            type: "line",
            symbol: "circle",
            symbolSize: 7,
            color: "#2ED887",
            itemStyle: {
                color: "#fff",
                borderWidth: 1,
                borderColor: "#2ED887"
            },
            lineStyle: {
                color: "#2ED887"
            },
            smooth: true,
            label: {
                show: true
            },
            areaStyle: {
                //区域填充样式
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 1,
                                color: "rgba(46, 216, 135, 0.3)"
                            },
                            {
                                offset: 1,
                                color: "rgba(46, 216, 135, 0.3)"
                            }
                        ],
                        false
                    )
                }
            },
            data: []
        }
    ]
}