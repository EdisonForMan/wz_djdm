/** 各区县 */
export default {
    title: {
        text: "单位:     个",
        textStyle: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "normal"
        },
        bottom: "3%",
        right: "7%"
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow"
        }
    },
    tooltip: {
        trigger: "axis"
    },
    grid: {
        top: "8%",
        left: "2%",
        right: "0",
        bottom: "30%"
    },
    legend: {
        show: true,
        bottom: "3%",
        left: "2%",
        textStyle: {
            color: "#fff"
        },
        data: [{ name: "未复工工地数" }, { name: "复工工地数" }]
    },
    xAxis: [
        {
            boundaryGap: true,
            type: "category",
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
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#fff"
                }
            },
            data: []
        }
    ],
    yAxis: {
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
    series: [
        {
            name: "复工工地数",
            type: "bar",
            stack: "one",
            label: {
                show: false,
            },
            barWidth: 16,
            data: []
        },
        {
            name: "未复工工地数",
            type: "bar",
            stack: "one",
            label: {
                show: true,
                position: "top",
                color: "#fff",
                formatter: function (param) {
                    console.log(param)
                    return param.value;
                }
            },
            barWidth: 16,
            data: []
        }
    ]
}