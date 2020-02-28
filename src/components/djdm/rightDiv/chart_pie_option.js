/** 饼图 */
export default {
    title: [{
        text: '市内外员工分析',
        top: "30px",
        left: 'center'
    }, {
        text: '是否湖北籍员工分析',
        top: "51%",
        left: 'center'
    }],
    tooltip: {},
    series: [{
        type: 'pie',
        radius: 70,
        center: ['50%', '25%'],
        label: {
            formatter: '{b}\n {c}人',
            fontSize: 16,
            fontWeight: "bold"
        },
        data: [],
    }, {
        type: 'pie',
        radius: 70,
        center: ['50%', '75%'],
        label: {
            formatter: '{b}\n {c}人',
            fontSize: 16,
            fontWeight: "bold"
        },
        data: [],
    }]
};