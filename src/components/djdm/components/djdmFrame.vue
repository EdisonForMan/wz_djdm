<template>
  <div class="djdmFrame">
    <div class="close" @click="()=>{$parent.doFrame=false}" />
    <div class="basic">
      <header>基本信息</header>
      <div v-if="!isField">
        <div class="name">{{attributes.qymc || attributes.企业名称}}</div>
        <ul>
          <li>
            <span>地址</span>
            <span>{{attributes.dz || attributes.地址}}</span>
          </li>
          <li>
            <span>地址2</span>
            <span>{{attributes.dz1 || attributes.地址1}}</span>
          </li>
          <li>
            <span>法人代表</span>
            <span>{{attributes.fr || attributes.法人代表}}</span>
          </li>
          <li>
            <span>联系电话</span>
            <span>{{attributes.lxdh || attributes.联系电话}}</span>
          </li>
          <li>
            <span>联系电话</span>
            <span>{{attributes.lxdh1 || attributes.联系联系号码}}</span>
          </li>
          <li>
            <span>产能发挥情况</span>
            <span>{{attributes.cnfhqk || attributes.产能发挥情况}}</span>
          </li>
          <li>
            <span>所在村社</span>
            <span>{{attributes.szcs || attributes.所在村社}}</span>
          </li>
          <li>
            <span>统一社会信用代码</span>
            <span>{{attributes.tyshxydm || attributes.统一社会信用代码}}</span>
          </li>
          <li>
            <span>应到员工数</span>
            <span>{{attributes.ydyg || attributes.应到员工数}}</span>
          </li>
          <li>
            <span>已到员工数</span>
            <span>{{attributes.ydygs || attributes.已到员工数}}</span>
          </li>
        </ul>
      </div>
      <div v-if="isField">
        <ul>
          <li v-for="(item,key,index) in attributes" :key="index">
            <span>{{key}}</span>
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const BANNED_PARAMS = [
  "OBJECTID",
  "Shape",
  "Shape_Area",
  "Shape_Leng",
  "Shape_Length",
  "x",
  "y",
  "type"
];
const EXTRA_HASH = {
  ysq_snfg_green_cnt: "市内员工-绿码(人)",
  ysq_snfg_yellow_cnt: "市内员工-黄码(人)",
  ysq_snfg_red_cnt: "市内员工-红码(人)",
  ysq_swfg_green_cnt: "市外员工-绿码(人)",
  ysq_swfg_yellow_cnt: "市外员工-黄码(人)",
  ysq_swfg_red_cnt: "市外员工-红码(人)",
  ysq_ygqs_green_cnt: "员工亲属-绿码(人)",
  ysq_ygqs_yellow_cnt: "员工亲属-黄码(人)",
  ysq_ygqs_red_cnt: "员工亲属-红码(人)"
};
export default {
  name: "djdmFrame",
  data: () => {
    return {
      attributes: {},
      isField: false
    };
  },
  mounted() {
    this.eventRegister();
  },
  methods: {
    /**
     * 判断展示数据内容 [***后续需优化,有点乱***]
     * @param obj 数据内容
     * @param fieldAliases  服务返回数据hash对应表,用于遍历obj↑
     * *左侧菜单栏点击事件触发,代入fieldAliases进行遍历
     * *地图点击事件触发,没有fieldAliases入参
     */
    eventRegister() {
      this.$hub.$on("menu-item-click", ({ obj, fieldAliases }) => {
        if (!fieldAliases) {
          const attributes = {};
          for (let v in obj.attributes) {
            if (!BANNED_PARAMS.includes(v)) {
              const name = EXTRA_HASH[v] || v;
              attributes[name] =
                name == "到岗率"
                  ? `${(obj.attributes[v] * 100).toFixed(2)}%`
                  : obj.attributes[v];
            }
          }
          this.isField = true;
          this.attributes = attributes;
        } else {
          const attributes = {};
          Object.keys(fieldAliases)
            .filter(item => !BANNED_PARAMS.includes(item))
            .map(item => {
              const name = EXTRA_HASH[fieldAliases[item]] || fieldAliases[item];
              attributes[name] = obj.attributes[item];
            });
          this.isField = true;
          this.attributes = attributes;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@frameBg: url(../img/djdmFrame.png);
@frameClose: url(../img/djdmFrameClose.png);
@frameLine: url(../img/djdmFrameLine.png);
.box() {
  box-sizing: border-box;
}
.cover (@size : cover) {
  background-size: @size;
}
.djdmFrame {
  /** ui规定高宽  */
  width: 605px;
  background: @frameBg;
  .cover();
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  .box();
  padding: 30px 20px 10px 20px;
  > div {
    > header {
      width: 100%;
      height: 40px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(97, 235, 255, 1);
      line-height: 40px;
      position: relative;
      text-align: left;
      .box();
      padding-left: 10px;
    }
    > header:after {
      content: "";
      background: @frameLine;
      width: 100%;
      height: 4px;
      position: absolute;
      bottom: 0px;
      left: 0px;
    }
  }
  .close {
    background: @frameClose;
    .cover();
    width: 20px;
    height: 20px;
    position: absolute;
    right: 14px;
    top: 16px;
    cursor: pointer;
  }
  /** 基本信息 */
  .basic {
    /** 标题 */
    .name {
      width: 100%;
      height: 36px;
      line-height: 36px;
      background: rgba(75, 164, 255, 0.2);
      font-size: 16px;
      font-weight: 600;
      color: rgba(99, 246, 255, 1);
      margin-top: 10px;
      text-align: left;
      .box();
      padding-left: 10px;
    }
    /** 排列条目 */
    ul::-webkit-scrollbar {
      border: 1px solid rgba(109, 225, 255, 1);
      width: 6px;
    }
    ul::-webkit-scrollbar-thumb {
      background: rgba(109, 225, 255, 1);
      border-radius: 3px;
    }
    ul {
      clear: both;
      overflow-y: scroll;
      padding: 10px 0;
      height: 450px;

      > li {
        list-style: none;
        width: 100%;
        display: inline-block;
        border-bottom: 1px #979797 solid;
        vertical-align: super;
        .box();
        padding: 0px 12px;
        span {
          word-break: break-all;
          display: block;
          line-height: 28px;
          font-size: 16px;
          font-weight: 400;
          text-align: left;
        }
        > span:first-child {
          color: rgba(255, 255, 255, 1);
        }
        > span:last-child {
          font-size: 14px;
          color: rgba(255, 208, 86, 1);
        }
      }
    }
    /** 额外条目 */
    .nobreakul {
      li {
        height: 30px;
        line-height: 30px;
        width: 100%;
        span {
          display: inline-block;
          vertical-align: middle;
          float: left;
        }
      }
    }
    /** 滚动框 */
    .scroll {
      border: 1px solid rgba(109, 225, 255, 1);
      .box();
      padding: 10px;
      height: 100px;
      overflow-y: auto;
      word-break: break-all;
      text-align: left;
      font-size: 14px;
    }
    .scroll::-webkit-scrollbar {
      border: 1px solid rgba(109, 225, 255, 1);
      width: 6px;
    }
    .scroll::-webkit-scrollbar-thumb {
      background: rgba(109, 225, 255, 1);
      border-radius: 3px;
    }
  }
  /** 返工信息 */
  .worker {
    > ul {
      margin: 10px 0;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      li {
        .box();
        padding: 0 10px;
        text-align: left;
        list-style: none;
        display: inline-block;
        width: 49.8%;
        background-color: #364f87;
      }
      li:first-child {
        border-right: 1px #202253 solid;
      }
    }
  }
}
</style>