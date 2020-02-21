<template>
  <div id="listxq">
    <div class="head">
      <span>{{ title }} 详情列表</span>
      <a v-on:click="sbclose">×</a>
    </div>
    <div class="search">
      <select @change="xqsearch($event)">
        <option value="0">姓名</option>
        <option value="1">街道</option>
      </select>
      <input type="text" v-model="text" placeholder="请输入查询" />
      <button @click="()=>{text && filteItem()}">查询</button>
    </div>
    <div class="content">
      <table border="0" cellpadding="0" cellspacing="0" v-if="qzflag">
        <thead>
          <tr>
            <th>序号</th>
            <th v-for="(k,i) in keyData" :key="i">{{ forceData[0].fieldAliases[k] }}</th>
            <th>关系图谱</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in forceData" :key="index">
            <td>{{ ++index }}</td>
            <td
              v-for="(k,i) in keyData"
              :key="i"
              @click="goLocation(item)"
              style="cursor: pointer;"
            >{{ item.attributes[k] || "无" }}</td>
            <td @click="showrelation(item)" style="cursor: pointer;">详情</td>
          </tr>
          <!-- <tr>
            <td>小计：</td>
            <td v-for="(citem,cindex) in sArr" :key="cindex">{{citem.Country}}:{{citem.count}}例</td>
            <td>合计：{{sum}}</td>
          </tr>-->
        </tbody>
      </table>

      <table border="0" cellpadding="0" cellspacing="0" v-else>
        <thead>
          <tr>
            <th>序号</th>
            <th v-for="(k,i) in keyData" :key="i">{{ forceData[0].fieldAliases[k] }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in forceData"
            :key="index"
            @click="goLocation(item)"
            style="cursor: pointer;"
          >
            <td>{{ ++index }}</td>
            <td v-for="(k,i) in keyData" :key="i">{{ item.attributes[k] || "无" }}</td>
          </tr>
        </tbody>
      </table>

      <table border="0" cellpadding="0" cellspacing="0" v-if="qzflag">
        <thead>
          <tr>
            <th>街道</th>
            <th v-for="(citem,cindex) in sArr" :key="cindex">{{citem.XZJD}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>合计</td>
            <td v-for="(citem,cindex) in sArr" :key="cindex">{{citem.count}}例</td>
          </tr>
        </tbody>
      </table>
    </div>
    <relation ref="relation" v-show="relationShow" />
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { leftOptions } from "./config/enums";
import relation from "./relation";

export default {
  name: "sbDate",
  data() {
    return {
      text: undefined,
      data: [],
      forceData: [],
      keyData: [],
      title: "",
      qzflag: false,
      relationShow: false,
      selectValue: 0,
      sObj: {},
      sArr: [],
      sum: 0,
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
        七都街道: 13
      }
    };
  },
  created() {},
  mounted() {
    this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  components: { relation },
  methods: {
    filteItem() {
      const data = this.data;
      const forceData = [];
      let tag;
      data.map(item => {
        const { attributes } = item;
        if (this.selectValue == "1") {
          tag = attributes.XZJD;
        } else {
          tag =
            attributes.name ||
            attributes.Name ||
            attributes.NAME ||
            attributes.Address ||
            attributes.short_name ||
            attributes.姓名;
        }
        tag && ~tag.indexOf(this.text) && forceData.push(item);
      });
      this.forceData = forceData;
    },
    xqsearch(event) {
      this.selectValue = event.target.value;
    },
    getItem({ url, sublayers, id, name, definitionExpression, ytd }, label) {
      const d = [];
      this.sObj = {};
      this.sArr = [];
      this.sum = 0;
      definitionExpression && d.push(definitionExpression);
      this.$parent.$refs.leftOptions.tabIndex == 1 && ytd && d.push(ytd);
      this.title = `${name}`.split(" ")[0];
      this.title == "确诊病例" ? (this.qzflag = true) : (this.qzflag = false);
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
      ).then(async ([QueryTask, Query]) => {
        const queryTask = new QueryTask({ url: `${url}/${sublayers}` });
        const query = new Query();
        query.outFields = "*";
        query.where = d.length ? d.join(" and ") : "1=1";
        query.returnGeometry = true;
        query.start = 0;
        // query.num = 20;
        const { fields, features } = await queryTask.execute(query);
        const fieldAliases = {};
        fields.map(item => {
          fieldAliases[item.name] = item.alias;
        });
        const list = features.map(item => {
          item.fieldAliases = fieldAliases;
          return item;
        });
        //  高速额外请求个服务
        if (id == "highway_type_1") {
          const highWayList = await this.getHighWay(url);
          const highWayObject = {};
          highWayList.map(item => {
            if (!highWayObject[item.attributes.Expressway]) {
              highWayObject[item.attributes.Expressway] = [];
            }
            highWayObject[item.attributes.Expressway].push(item);
          });
          list.map(item => {
            highWayObject[item.attributes.Name] &&
              (item.highWayList = highWayObject[item.attributes.Name]);
            return item;
          });
        }
        // 密接关联
        if (id == "qzbl") {
          const mjList = await this.getMj(url);
          const mjObject = {};
          mjList.map(item => {
            if (
              item.attributes.RelatingCodes != "" &&
              (item.attributes.RelatingCodes != null) &
                !mjObject[item.attributes.RelatingCodes]
            ) {
              mjObject[item.attributes.RelatingCodes] = [];
            }
            if (
              item.attributes.RelatingCodes != "" &&
              item.attributes.RelatingCodes != null
            ) {
              mjObject[item.attributes.RelatingCodes].push(item);
            }
          });
          list.map(item => {
            mjObject[item.attributes.Bid] &&
              (item.mjList = mjObject[item.attributes.Bid]);
            return item;
          });
        }
        this.data = list;
        console.log(list);
        list.map(({ attributes }) => {
          const { XZJD } = attributes;
          // console.log(Country);
          if (!XZJD) return false;
          if (!this.sObj[XZJD]) {
            this.sObj[XZJD] = { XZJD, count: 0 };
          }
          this.sObj[XZJD].count++;
        });
        console.log(this.sObj);
        for (let k in this.sObj) {
          this.sArr.push(this.sObj[k]);
        }
        this.sArr.map(item => {
          this.sum += parseInt(item.count);
        });

        // console.log("obj", this.sObj);

        this.forceData = list;
        // this.forceData = list.sort((a, b) => {
        //   const count1 = this.sObj[a.attributes.XZJD].count;
        //   const count2 = this.sObj[b.attributes.XZJD].count;

        //   if (count1 == count2) {
        //     return (
        //       this.countryHash[b.attributes.XZJD] -
        //       this.countryHash[a.attributes.XZJD]
        //     );
        //   }

        //   return count2 - count1;
        // });

        // console.log("data", this.forceData);
        this.keyData = Object.keys(this.forceData[0].fieldAliases).filter(k => {
          return (
            [
              "序号",
              "隔离点编码",
              "OBJECTID",
              "OBJECTID_1",
              "Bid",
              "bid",
              "Question",
              "question",
              "yy",
              "Note",
              "RelatingCodes",
              "Shape.STArea()",
              "Shape.STLength()",
              "小区面名称",
              "小区面唯一码"
            ].indexOf(k) < 0
          );
        });
        this.text = undefined;
      });
    },
    getHighWay(url) {
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({ url: `${url}/1` });
          const query = new Query();
          query.outFields = ["*"];
          query.where = `1=1`;
          const { fields, features } = await queryTask.execute(query);
          const fieldAliases = {};
          fields.map(item => {
            fieldAliases[item.name] = item.alias;
          });
          const list = features.map(item => {
            item.fieldAliases = fieldAliases;
            return item;
          });
          resolve(list);
        });
      });
    },
    getMj(url) {
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({
            url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/4`
          });
          const query = new Query();
          query.outFields = ["*"];
          query.where = `1=1`;
          const { fields, features } = await queryTask.execute(query);
          const fieldAliases = {};
          fields.map(item => {
            fieldAliases[item.name] = item.alias;
          });
          const list = features.map(item => {
            item.fieldAliases = fieldAliases;
            return item;
          });
          resolve(list);
        });
      });
    },
    goLocation(item) {
      this.$parent.$refs.macroArcgis.goloaction(item);
      this.$parent.listShow = false;
    },
    showrelation(item) {
      this.relationShow = true;
      this.$refs.relation.list = item.mjList;
      this.$refs.relation.title = item.attributes.Name;
      // console.log(item);
    },
    sbclose() {
      this.$parent.listShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
#listxq {
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
  .search {
    height: 60px;
    select {
      background-color: #0c7cd2;
      border: none;
      color: #fff;
      padding: 7px 7px;
      margin-right: 5px;
    }

    input {
      width: 15%;
      margin-top: 10px;
      margin-right: 5px;
      background-color: #162449;
      border: 1px solid #75c8f4;
      border-radius: 8px;
      padding: 8px 9px;
      color: #fff;
    }

    button {
      background-color: #162449;
      border: 1px solid #75c8f4;
      border-radius: 8px;
      padding: 7px 9px;
      color: #fff;
      margin-right: 4px;
    }
  }
  // .content::-webkit-scrollbar {
  //   display: none;
  // }
  .content {
    height: 80%;
    overflow: auto;

    table {
      border: 1px solid #ccc;
      width: 96%;
      margin: 0% 2%;

      th,
      td {
        border-bottom: 1px solid #ccc;
        padding: 10px 5px;
        min-width: 100px;
      }
    }
  }
}
</style>