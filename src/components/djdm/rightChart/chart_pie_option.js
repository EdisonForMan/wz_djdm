/** 饼图 */
export default {
  color: ["#FF8C48", "#F32020", "#6EB2FF", "#FFE01D"],
  title: [
    {
      text: "市内外员工分析",
      top: "60px",
      left: "center",
      textStyle: {
        color: "#ccc"
      }
    },
    {
      text: "是否湖北籍员工分析",
      top: "51%",
      left: "center",
      textStyle: {
        color: "#ccc"
      }
    },
    {
      text: "时间:2020-03-02",
      textStyle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
      },
      top: "20px",
      left: "14px"
    },
  ],
  tooltip: {},
  series: [
    {
      type: "pie",
      radius: 70,
      center: ["50%", "25%"],
      radius: ["30%", "50%"],
      label: {
        formatter: "{b}\n {c}人",
        fontSize: 16,
        fontWeight: "bold"
      },
      data: []
    },
    {
      type: "pie",
      radius: 70,
      center: ["50%", "75%"],
      radius: ["30%", "50%"],
      label: {
        formatter: "{b}\n {c}人",
        fontSize: 16,
        fontWeight: "bold"
      },
      data: []
    }
  ]
};
