<template>
<div class="cpFrame" v-if="obj && obj.qzbl">
  <head>
    <span>{{title}}-疫情信息</span>
    <span id="close" @click="()=>{obj = undefined}">x</span>
  </head>
  <div>
    <div class="list">
      <p>确诊病例 ({{obj.qzbl?obj.qzbl.length:0}}例)</p>
      <ul class="ul" v-if="obj && obj.qzbl && obj.qzbl.length">
        <li v-for="(item,index) in obj.qzbl" :key="index" @click="goLocation(item)">
          <span>{{++index}}.{{item.attributes.Name}},{{item.attributes.Sex}},{{item.attributes.Address}},{{item.attributes.Age}}</span>
        </li>
      </ul>
    </div>

    <div class="list">
      <p>疑似病例 ({{obj.zzbl?obj.zzbl.length:0}}例)</p>
      <ul class="ul" v-if="obj && obj.zzbl && obj.zzbl.length">
        <li v-for="(item,index) in obj.zzbl" :key="index" @click="goLocation(item)">
          <span>{{++index}}.{{item.attributes.Name}},{{item.attributes.Sex}},{{item.attributes.Address}},{{item.attributes.Age}}</span>
        </li>
      </ul>
    </div>

    <div class="list">
      <p>密切接触者 ({{obj.mj?obj.mj.length:0}}例)</p>
      <ul class="ul" v-if="obj && obj.mj && obj.mj.length">
        <li v-for="(item,index) in obj.mj" :key="index" @click="goLocation(item)">
          <span>{{++index}}.{{item.attributes.NAME}},{{item.attributes.Sex}},{{item.attributes.Address_Department}},{{item.attributes.Age}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "cpFrame",
  data() {
    return {
      title: "",
      obj: {}
    };
  },
  mounted() {},
  methods: {
    goLocation(item) {
      console.log(item.geometry);
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    doChart({ qzbl, zzbl, mj }) {
      console.log({ qzbl, zzbl, mj });
    }
  },
  watch: {
    obj(newV, oldV) {
      this.$nextTick(() => {
        newV && Object.keys(newV).length && this.doChart(newV);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.cpFrame {
  position: absolute;
  width: 400px;
  height: 640px;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 20;
  margin: auto;
  left: 360px;
  bottom: 280px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  head {
    display: block;
    box-sizing: border-box;
    padding: 5px;
    height: 40px;
  }
  #close {
    float: right;
    padding: 5px;
    font-size: 17px;
    cursor: pointer;
  }
  > div {
    flex: 1;
    .list {
      border-top: 1px #04ecff solid;
      height: 200px;
      text-align: left;
      p {
        display: block;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      .ul::-webkit-scrollbar {
        display: block;
        width: 6px;
        background-color: rgb(50, 95, 245);
        border-radius: 3px;
      }
      .ul::-webkit-scrollbar-thumb {
        width: 6px;
        background-color: rgb(32, 28, 243);
        border-radius: 3px;
      }
      > ul {
        max-height: 170px;
        overflow: auto;
        li {
          padding: 10px 0;
          background: #122960;
          text-align: left;
          padding-left: 15px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        li:nth-child(even) {
          background: #081942;
        }
      }
    }
  }
}
</style>