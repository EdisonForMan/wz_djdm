<template>
  <div id="btnDiv">
    <ul>
      <li class="hover">
        五色图
        <div>
          <ul class="subList">
            <li @click="doSwitch(1)"
                :class="{active:forceColor == 1}">亿元以上项目复工强度</li>
            <li @click="doSwitch(2)"
                :class="{active:forceColor == 2}">省重点项目复工强度</li>
            <li @click="doSwitch(0)"
                :class="{active:forceColor == 0}">市重点项目复工强度</li>

          </ul>
        </div>
      </li>
      <li @click="xzqh">行政区划</li>
      <li @click="yxt">影像图</li>
      <li @click="slt">矢量图</li>
      <li @click="ygt">夜光图</li>
      <li class="hover">
        空间查询
        <div>
          <ul class="subList">
            <li @click="doCircleQuery">圆形查询</li>
            <li @click="doSpaceQuery">多边形查询</li>
          </ul>
        </div>
      </li>
      <li @click="clean">清除</li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "bottomBtn",
  data() {
    return {
      forceColor: 1
    };
  },
  methods: {
    xzqh() {},
    yxt() {},
    slt() {},
    ygt() {},
    clean() {
      const context = this.$parent.$refs.macroArcgis;
      const id = "colorLayer";
      context.map.findLayerById(id) &&
        context.map.remove(context.map.findLayerById(id));
    },
    doSwitch(val) {
      this.forceColor = val;
      this.$parent.$refs.macroArcgis.switchColorLayer(val);
    },
    doCircleQuery() {
      this.$parent.$refs.macroArcgis.doCircleQuery();
    },
    doSpaceQuery() {
      this.$parent.$refs.macroArcgis.doSpaceQuery();
    }
  }
};
</script>

<style lang="less" scoped>
#btnDiv {
  position: absolute;
  bottom: 2%;
  right: 30%;

  > ul {
    > li {
      position: relative;
      height: 40px;
      line-height: 40px;
      list-style: none;
      float: left;
      background-color: #243968;
      border: 1px solid #05fff8;
      margin-left: 5px;
      padding: 0 10px;
      cursor: pointer;
      overflow: hidden;

      div {
        position: absolute;
        width: 140px;
        bottom: 40px;
        margin-left: -11px;
        ul li {
          font-size: 14px;
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          width: 100%;
          list-style: none;
          background-color: #243968;
          border: 1px solid #05fff8;
          cursor: pointer;
        }
        .active {
          background-color: #0754e2;
          color: #fff;
        }
      }
    }

    .hover {
      width: 140px;
      .subList {
        li:hover {
          background-color: #0754e2;
          color: #fff;
        }
      }
    }

    .hover:hover {
      overflow: visible;
    }
  }
}
</style>