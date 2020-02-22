<template>
  <div class="djdmFrame">
    <div class="close" />
    <div class="basic">
      <header>基本信息</header>
      <div>
        <div class="name">项目名称：中央绿轴区G-23地块沿河绿地及驳坎工程</div>
        <ul>
          <li v-for="(item,key,index) in obj">
            <span>{{key}}</span>
            <span>{{item}}</span>
          </li>
        </ul>
        <ul class="nobreakul">
          <li>
            <span>实施单位:</span>
            <span>五马街到</span>
          </li>
          <li>
            <span>项目范围:</span>
            <span>中央绿轴-即指挥部字段</span>
          </li>
        </ul>
        <div class="scroll"></div>
      </div>
    </div>
    <div class="worker">
      <header>返工信息</header>
      <ul>
        <li>人员数量:</li>
        <li>人员数量:</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "djdmFrame",
  data: () => {
    return {
      obj: { 投资类型: "政府性投资", 建设类型大类: "公益型项目" }
    };
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
        min-width: 20%;
        display: inline-block;
        float: left;
        height: 44px;
        border-right: 1px #979797 solid;
        .box();
        padding: 0px 12px;
        span {
          display: block;
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          font-weight: 400;
          text-align: left;
        }
        > span:first-child {
          color: rgba(255, 255, 255, 1);
        }
        > span:last-child {
          color: rgba(255, 208, 86, 1);
        }
      }
    }
    /** 额外条目 */
    .nobreakul {
      li {
        height: 22px;
        line-height: 22px;
        span {
          display: inline-block;
          vertical-align: middle;
          float: left;
        }
      }
      li:first-child {
        width: 39.9%;
      }
      li:last-child {
        width: 49.9%;
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