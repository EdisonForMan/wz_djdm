<template>
  <div id="btnDiv">
    <ul>
      <li class="hover">
        区划图
        <div>
          <ul class="subList">
            <li>工地数量分色图</li>
            <li>疫情风险分色图</li>
            <li>复工率分色图</li>
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
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    xzqh() {},
    yxt() {},
    slt() {},
    ygt() {},
    clean() {},
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
        width: 120px;
        bottom: 40px;
        margin-left: -11px;
        ul li {
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          width: 100%;
          list-style: none;
          background-color: #243968;
          border: 1px solid #05fff8;
          cursor: pointer;
        }
      }
    }

    .hover {
      width: 120px;
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