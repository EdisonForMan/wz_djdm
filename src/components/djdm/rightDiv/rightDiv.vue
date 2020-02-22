<template>
  <div class="right-div">
    <div class="gqx">
      <div class="right-div-title">
        <span class="right-div-title-inner">各县市区</span>
      </div>
      <div id="gqx-chart"></div>
    </div>
    <div class="yjfw">
      <div class="right-div-title">
        <span class="right-div-title-inner">预计返温人员</span>
      </div>
      <div id="yjfw-chart"></div>
    </div>
    <div class="wlfg">
      <div class="right-div-title">
        <span class="right-div-title-inner">外来人口复工区县分布</span>
      </div>
      <div id="wlfg-chart"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  // 数据格式参照props   (default接完数据请清空, 暂时造假)
  props: {
    gqxData: {
      type: Object,
      default: function () {
        return {
          zgds: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
          fggds: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        }
      }
    },
    yjfwData: {
      type: Array,
      default: function () {
        return [25, 30, 25, 25, 25, 25, 80, 25, 25, 25, 25, 25, 25, 25];
      }
    },
    wlfgData: {
      type: Array,
      default: function () {
        return [
          {
              name: '鹿城',
              value: '8'
          },
          {
              name: '龙湾',
              value: '1'
          },
          {
              name: '瓯海',
              value: '3'
          },
          {
              name: '洞头',
              value: '0'
          }
        ];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    // 绘制各市县区
    drawGQX () {
      const mychart = this.$echarts.init(document.getElementById("gqx-chart"));
      const quxian = ['鹿城', '龙湾', '瓯海', '洞头', '瑞安', '乐清', '永嘉', '文成', '平阳', '泰顺', '苍南', '龙港', '浙南', '瓯江口'];
      mychart.setOption({
        title: {
          text: '单位:     个',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal'
          },
          bottom: '3%',
          right: '7%'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        tooltip: {
          trigger: "axis",
          // formatter: function(param) {
          //   let name = param[0].name;
          //   let param1 = "累计确诊：" + param[0].value;
          //   let param2 = "累计治愈：" + param[1].value;
          //   let param3 = "确诊存量：" + (param[0].value - param[1].value);
          //   return [name, param1, param2, param3].join("\n");
          // },
          // extraCssText: "white-space:pre-wrap;text-align:left;"
        },
        grid: {
          top: "8%",
          left: "2%",
          right: "0",
          bottom: "27%"
        },
        legend: {
          show: true,
          left: "4%",
          bottom: "3%",
          itemGap: 15,
          textStyle: {
            padding: [0,0,0,5],
            color: "#BEE9FF",
            fontSize: 14
          },
          icon: 'rect',
          data: [{ name: "总工地数" }, { name: "复工工地数" }]
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
              formatter: function(param) {
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
            data: quxian
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
              position: "inside",
              color: "#fff",
              formatter: function(param) {
                return param.value;
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#DA414F" },
                { offset: 1, color: "#FF7783" }
              ])
            },
            barWidth: 16,
            data: this.gqxData.fggds
          },
          {
            name: "总工地数",
            type: "bar",
            stack: "one",
            label: {
              show: true,
              position: "top",
              color: "#fff",
              formatter: function(param) {
                return param.value;
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FF8146" },
                { offset: 1, color: "#FFD699" }
              ])
            },
            barWidth: 16,
            data: this.gqxData.zgds
          }
        ]
      });
    },
    // 绘制预计返温人员
    drawJYFW () {
      const mychart = this.$echarts.init(document.getElementById("yjfw-chart"));
      const quxian = ['鹿城', '龙湾', '瓯海', '洞头', '瑞安', '乐清', '永嘉', '文成', '平阳', '泰顺', '苍南', '龙港', '浙南', '瓯江口'];
      mychart.setOption({
        title: {
          text: '单位:     万人',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            fontWeight: 'normal'
          },
          top: '0%',
          right: '3%'
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
            formatter: function(param) {
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
          data: quxian
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
              color: '#fff',
              borderWidth: 1,
              borderColor: "#2ED887"
            },
            lineStyle: {
              color: "#2ED887", 
            },
            smooth: true,
            label: {
              show: true
            },
            areaStyle: {
              //区域填充样式
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
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
            data: this.yjfwData
          }
        ]
      });
    },
    // 绘制外来人口复工各区县分布
    drawWLFG () {
      const mychart = this.$echarts.init(document.getElementById("wlfg-chart"));
      mychart.setOption({
        color: ['#F7DC2B', '#31B2F6','#C355D1','#2ED8CB','#A37CFF','#F67B28','#B3F628','#7DFFF5','#FFC25D','#FF5C47','#20A92E','#F385FF','#FFFBAC','#96A8FF'],
        legend: {
          show: false,
          x:'center',
          y:'2%',
          textStyle: {
              color:'#8C8C8C'
          }
        },
        series: [
            {
                name:'外来人口复工',
                type:'pie',
                center: ['50%', '50%'],
                radius: ['30%', '55%'],
                label: {
                    normal: {
                        show: true,
                        position: 'outter',
                        fontSize: 14,
                        formatter: (params)=>{
                          return params.name + ' ' + params.percent + '%';
                        }
                    }
                },
                labelLine: {
                    show:false,
                    normal: {
                      smooth:false,
                    }
                },
                data: this.wlfgData
            },
            {
                radius: ['0%', '31%'],
                center: ['50%', '50%'],
                type: 'pie',
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
                data: [{
                    value: 100,
                    name: '标题2',
                    itemStyle: {
                        normal: {
                            color: '#143499',
                        }
                    }
                }],
                animation: false
            }
        ]
      });
    }
  },
  created() {
  },
  mounted() {
    this.drawGQX(); // 绘制各市县区
    this.drawJYFW(); // 绘制预计返温人员
    this.drawWLFG(); // 绘制外来人口复工各区县分布
  }
};
</script>
<style scoped>
  .right-div {
    width: 100%;
    height: 100%;
    background: url(../img/rightDiv_bg.png) 0 0 no-repeat;
    background-size: 100% 100%;
    padding: 0 26px;
    box-sizing: border-box;
  }
  .gqx {
    height: 40%;
  }
  .yjfw {
    height: 30%;
  }
  .wlfg {
    height: 30%;
  }
  .gqx, .yjfw {
    border-bottom: 1px solid #86C9E1;
  }
  .gqx, .yjfw, .wlfg {
    width: 100%;
    display: flex;
    flex-direction: column;
  } 
  .right-div-title {
    width: 100%;
    text-align: left;
    padding: 15px 0;
  }
  .right-div-title::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50% 50%;
    margin-right: 8px;
  }
  .right-div-title-inner {
    font-weight: 500;
    font-size: 20px;
    font-family: PingFangSC-Medium,PingFang SC;
    position: relative;
    z-index: 2;
  }
  .gqx .right-div-title {
    padding-top: 20px;
    padding-bottom: 0;
  }
  .right-div-title-inner::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  .gqx .right-div-title::before {
    background-color: #E8943A;
  }
  .yjfw .right-div-title::before {
    background-color: #2ED887;
  }
  .wlfg .right-div-title::before {
    background-color: #31B2F6;
  }
  .gqx .right-div-title-inner::before {
    background: rgba(255,185,91,0.3);
    filter: blur(9px);
  }
  .yjfw .right-div-title-inner::before {
    background: rgba(46,216,135,0.3);
    filter: blur(9px);
  }
  .wlfg .right-div-title-inner::before {
    background: rgba(49,178,246,0.3);
    filter: blur(9px);
  }
  #gqx-chart,
  #yjfw-chart,
  #wlfg-chart {
    flex-grow: 1;
    min-height: 0;
    width: 100%;
  }
</style>