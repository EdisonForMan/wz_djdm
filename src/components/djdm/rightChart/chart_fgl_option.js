/** 温州市员工到岗率 */
export const chart_fgl_option = {
    color: ["#6EB2FF", "red", "#FF8C48"],
    title: {
        text: "时间:2020-03-05",
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
        data: [
            "瓯江口",
            "瑞安",
            "泰顺",
            "经开区",
            "鹿城",
            "龙湾",
            "洞头",
            "永嘉",
            "龙港",
            "乐清",
            "文成",
            "苍南",
            "平阳",
            "瓯海",
        ]
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
            data: [
                85.8,
                90.2,
                91.3,
                91.4,
                92.3,
                92.6,
                94.2,
                95.1,
                95.8,
                95.8,
                96.9,
                97.3,
                98.8,
                98.9,
            ]
        },
        {
            name: "全市平均",
            type: "line",
            data: [94.59],
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
    ]
};
