<template>
  <div id="popDiv" v-show="popShow">
    <div class="head">
      <span>{{ type==1 ? "隔离人员" : "隔离点" }} 详情列表</span>
      <a v-on:click="popClose">×</a>
    </div>

    <div class="content">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr v-if="type==1">
            <th>序号</th>
            <th v-for="(k,i) in keyData1" :key="i">{{ manData[0].fieldAliases[k] }}</th>
          </tr>
          <tr v-if="type==2">
            <th>序号</th>
            <th v-for="(k,i) in keyData2" :key="i">{{ roomData[0].fieldAliases[k] }}</th>
          </tr>
        </thead>
        <tbody v-if="type==1">
          <tr v-for="(item,index) in manData" :key="index">
            <td>{{ ++index }}</td>
            <td v-for="(k,i) in keyData1" :key="i">{{ item.attributes[k] || "无" }}</td>
          </tr>
        </tbody>
        <tbody v-if="type==2">
          <tr v-for="(item,index) in roomData" :key="index">
            <td>{{ ++index }}</td>
            <td v-for="(k,i) in keyData2" :key="i">{{ item.attributes[k] || "无" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import util from "./util";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { leftOptions } from "./config/enums";
export default {
  data() {
    return {
      popShow: false, //弹出框默认隐藏
      roomData: [],
      manData: [],
      keyData1: [],
      keyData2: [],
      type: 1,
      countryHash: {
        山福镇: 0,
        藤桥镇: 1,
        仰义街道: 2,
        丰门街道: 3,
        双屿街道: 4,
        广化街道: 5,
        五马街道: 6,
        松台街道: 7,
        大南街道: 8,
        南郊街道: 9,
        南汇街道: 10,
        蒲鞋市街道: 11,
        滨江街道: 12,
        七都街道: 13,
        区直设: 14
      }
    };
  },
  methods: {
    popShowDiv(type) {
      const that = this;
      if (type == 1) {
        that.type = 1;
        that.getItem(
          `http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer/5`
        );
      } else if (type == 2) {
        that.type = 2;
        that.getItem(
          `http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer/2`
        );
      }
      this.popShow = true; //显示
    },
    popClose() {
      this.popShow = false; //隐藏
    },
    getItem(url) {
      const that = this;
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
      ).then(async ([QueryTask, Query]) => {
        const queryTask = new QueryTask({
          url: url
        });
        const query = new Query();
        query.outFields = "*";
        query.where = `1=1`;
        query.returnGeometry = true;
        const { fields, features } = await queryTask.execute(query);
        const fieldAliases = {};
        fields.map(item => {
          fieldAliases[item.name] = item.alias;
        });
        const list = features.map(item => {
          item.fieldAliases = fieldAliases;
          return item;
        });

        if (that.type == 1) {
          that.manData = list.sort((a, b) => {
            return (
              that.countryHash[b.attributes.Country] -
              that.countryHash[a.attributes.Country]
            );
          });
          that.keyData1 = Object.keys(list[0].fieldAliases).filter(k => {
            return (
              [
                "序号",
                "隔离点编码",
                "OBJECTID",
                "Bid",
                "Question",
                "question"
              ].indexOf(k) < 0
            );
          });
        } else if (that.type == 2) {
          that.roomData = list.sort((a, b) => {
            return (
              that.countryHash[b.attributes.Country] -
              that.countryHash[a.attributes.Country]
            );
          });
          that.keyData2 = Object.keys(list[0].fieldAliases).filter(k => {
            return (
              [
                "序号",
                "隔离点编码",
                "OBJECTID",
                "Bid",
                "Question",
                "question",
                "yy"
              ].indexOf(k) < 0
            );
          });
        }
      });
    }
  },
  mounted() {
    var that = this;
    util.$on("popshow", function(param) {
      that.popShowDiv(param);
    });
  }
};
</script>

<style lang="less" scoped>
#popDiv {
  position: absolute;
  width: 88%;
  height: 78%;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 20;
  top: 0;
  margin: auto;
  left: 6%;
  top: 10%;

  .head {
    height: 7%;
    margin-top: 1%;

    span {
      font-size: 30px;
    }

    a {
      float: right;
      font-size: 40px;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .content {
    height: 88%;
    overflow: auto;

    table {
      border: 1px solid #ccc;
      width: 96%;
      margin: 0% 2%;

      th,
      td {
        border-bottom: 1px solid #ccc;
        padding: 10px 5px;
      }
    }
  }
}
</style>