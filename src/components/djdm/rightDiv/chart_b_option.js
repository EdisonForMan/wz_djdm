/** 饼图 */
export default {
    color: [
        "#F7DC2B",
        "#31B2F6",
        "#C355D1",
        "#2ED8CB",
        "#A37CFF",
        "#F67B28",
        "#B3F628",
        "#7DFFF5",
        "#FFC25D",
        "#FF5C47",
        "#20A92E",
        "#F385FF",
        "#FFFBAC",
        "#96A8FF"
    ],
    legend: {
        show: false,
        x: "center",
        y: "2%",
        textStyle: {
            color: "#8C8C8C"
        }
    },
    series: [
        {
            name: "外来人口复工",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["30%", "55%"],
            label: {
                normal: {
                    show: true,
                    position: "outter",
                    fontSize: 14,
                    formatter: params => {
                        return params.name + " " + params.percent + "%";
                    }
                }
            },
            labelLine: {
                show: false,
                normal: {
                    smooth: false
                }
            },
            data: []
        },
        {
            radius: ["0%", "31%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            tooltip: {
                show: false
            },
            data: [
                {
                    value: 100,
                    name: "标题2",
                    itemStyle: {
                        normal: {
                            color: "#143499"
                        }
                    }
                }
            ],
            animation: false
        }
    ]
}