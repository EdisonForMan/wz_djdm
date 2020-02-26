<template>
  <div class="djdmFrame">
    <div class="close" @click="()=>{$parent.doFrame=false}" />
    <div class="basic">
      <header>基本信息</header>
      <div>
        <div class="name">{{attributes.NAME || attributes.项目名称}}</div>
        <ul>
          <li>
            <span>投资类型</span>
            <span>{{attributes.FUNDTYPE || attributes.投资类型}}</span>
          </li>
          <li>
            <span>建设类型大类</span>
            <span>{{attributes.CONSTYPE || attributes.建设类型大类}}</span>
          </li>
          <li>
            <span>建设类型小类</span>
            <span>{{attributes.CONSTYPE2 || attributes.建设类型小类}}</span>
          </li>
          <li>
            <span>建设进度</span>
            <span>{{attributes.STATE || attributes.建设进度}}</span>
          </li>
          <li>
            <span>所在范围</span>
            <span>{{attributes.XMSZD || attributes.所在范围}}</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>所属街道</span>
            <span>{{attributes.XZJD || attributes.所属街道}}</span>
          </li>
          <li>
            <span>计划开工时间</span>
            <span>{{attributes.CONSYEARB2 || attributes.计划开工时间}}</span>
          </li>
          <li>
            <span>计划建成时间</span>
            <span>{{attributes.CONSYEARE2 || attributes.计划建成时间}}</span>
          </li>
          <li>
            <span>总投资</span>
            <span>{{attributes.TOTALAMOUNT || attributes.总投资}}万</span>
          </li>
          <li>
            <span>去年累计投资</span>
            <span>{{attributes.PREVAMOUNT || attributes.去年累计投资}}万</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>当年投资计划</span>
            <span>{{attributes.NEXTAMOUNT || attributes.当年投资计划}}万</span>
          </li>
          <li>
            <span>当年累计投资</span>
            <span>{{attributes.YEARSUM || attributes.当年累计投资}}万</span>
          </li>
          <li>
            <span>剩余投资额</span>
            <span>{{attributes.YEARREMAIN || attributes.剩余投资额}}万</span>
          </li>
          <li style="width:40%">
            <span>责任单位</span>
            <span>{{attributes.ZR_DEPT || attributes.责任单位}}</span>
          </li>
        </ul>
        <ul class="nobreakul">
          <li>
            <span>实施单位:</span>
            <span>{{attributes.SS_DEPT || attributes.实施单位}}</span>
          </li>
          <li>
            <span>项目范围:</span>
            <span>{{attributes.ZHB_DEPT || attributes.项目范围}}</span>
          </li>
        </ul>
        <div class="scroll">
          <span>项目建设规模和内容:</span>
          {{attributes.CONTENTGM || attributes.建设规模与内容}}
        </div>
      </div>
    </div>
    <div class="worker">
      <header>复工信息</header>
      <ul>
        <li>
          复工总人数:
          <span>{{attributes.FGZRS || attributes.复工总人数}}</span> 人
        </li>
        <li>
          已复工人数:
          <span>{{attributes.YFGRS || attributes.已复工人数}}</span> 人
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "djdmFrame",
  data: () => {
    return {
      //  懒得写逻辑了就这么分吧
      attributes: {}
    };
  },
  mounted() {
    this.eventRegister();
  },
  methods: {
    eventRegister() {
      this.$hub.$on("menu-item-click", ({ attributes }) => {
        this.attributes = attributes;
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
    ul {
      clear: both;
      overflow: hidden;
      padding: 10px 0;
      border-bottom: 1px #979797 solid;
      > li:last-child {
        border-right: 0px !important;
      }
      > li {
        list-style: none;
        width: 20%;
        display: inline-block;
        float: left;
        border-right: 1px #979797 solid;
        .box();
        padding: 0px 12px;
        span {
          display: block;
          line-height: 22px;
          font-size: 14px;
          font-weight: 400;
          text-align: left;
        }
        > span:first-child {
          color: rgba(255, 255, 255, 1);
        }
        > span:last-child {
          font-size: 12px;
          color: rgba(255, 208, 86, 1);
        }
      }
    }
    /** 额外条目 */
    .nobreakul {
      li {
        line-height: 22px;
        span {
          display: inline-block;
          vertical-align: middle;
          float: left;
        }
      }
      li:first-child {
        width: 59.9%;
      }
      li:last-child {
        width: 39.9%;
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
      span {
        display: block;
      }
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
        span {
          font-size: 14px;
          color: rgba(255, 208, 86, 1);
        }
      }
      li:first-child {
        border-right: 1px #202253 solid;
      }
    }
  }
}
</style>