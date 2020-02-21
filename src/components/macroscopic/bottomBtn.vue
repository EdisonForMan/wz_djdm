<template>
  <div id="btnDiv">
    <ul>
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
    xzqh() {
      this.$parent.$refs.macroArcgis.removeLayer();
    },
    yxt() {
      this.$parent.$refs.macroArcgis.yxt();
    },
    slt() {
      this.$parent.$refs.macroArcgis.slt();
    },
    ygt() {
      this.$parent.$refs.macroArcgis.ygt();
    },
    clean() {
      this.$parent.$refs.leftOptions.clean();
      this.$parent.$refs.macroArcgis.view.popup.visible = false;
      this.$parent.$refs.queryForm.list = [];
    },
    doCircleQuery() {
      // console.log("圆形查询");
      this.$parent.$refs.macroArcgis.doCircleQuery();
    },
    doSpaceQuery() {
      // console.log("多边形查询");
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
      height: 21px;
      list-style: none;
      float: left;
      background-color: #243968;
      border: 1px solid #05fff8;
      padding: 10px 10px;
      margin-left: 5px;
      cursor: pointer;
      overflow: hidden;

      div {
        margin-top: -118px;

        ul li {
          height: 21px;
          list-style: none;
          background-color: #243968;
          border: 1px solid #05fff8;
          padding: 10px 10px;
          cursor: pointer;
        }
      }
    }

    .hover {
      padding: 10px 0px;
    }

    .hover:hover {
      overflow: visible;
    }
  }
}
</style>