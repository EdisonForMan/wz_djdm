<template>
  <div id="sbDateDiv">
    <input
      type="text"
      v-model="text"
      placeholder="请输入查询"
      style="width: 60%;margin-top: 10px;background-color: #162449;border: 1px solid #75c8f4;border-radius: 8px;padding: 8px 9px; color:#fff"
    />
    <button
      style="background-color: #162449;border: 1px solid #75c8f4;border-radius: 8px;padding: 7px 9px; color:#fff;margin-right:4px"
      @click="()=>{text && filteItem()}"
    >查询</button>
    <button
      style="background-color: #162449;border: 1px solid #75c8f4;border-radius: 8px;padding: 7px 9px; color:#fff;cursor: pointer;"
      @click="show()"
    >详情</button>
    <!-- <h3>- 确诊病例动态更新 -</h3> -->
    <ul>
      <li v-for="(item,index) in forceData" :key="index" @click="goLocation(item)">
        <span
          v-if="item.label == '疫情分布' && ['gld','gld_list','mj','mj2','hbhw','ytyg'].indexOf(item.id) < 0"
        >{{++index}}.患者：{{item.attributes.Name?item.attributes.Name.slice(0,1):''}}**,{{item.attributes.Sex}},{{item.attributes.Address}},{{item.attributes.Age}}</span>
        <span
          v-if="~['mj','mj2'].indexOf(item.id)"
        >{{++index}}.{{item.attributes.NAME?item.attributes.NAME.slice(0,1):''}}**,{{item.attributes.Sex}},{{item.attributes.Address_Department}}</span>
        <span
          v-if="~['gld'].indexOf(item.id)"
        >{{++index}}.{{item.attributes.Name}},{{item.attributes.Address}}</span>
        <span
          v-if="~['gld_list'].indexOf(item.id)"
        >{{++index}}.{{item.attributes.姓名?item.attributes.姓名.slice(0,1):''}}**,{{item.attributes.家庭住址}}</span>
        <span
          v-if="item.id == 'ytyg'"
        >{{++index}}.{{item.attributes.姓名?item.attributes.姓名.slice(0,1):''}}**,{{item.attributes.通讯地址}}</span>
        <span
          v-if="item.id == 'hbhw'"
        >{{++index}}.{{item.attributes.Name?item.attributes.Name.slice(0,1):''}}**,{{item.attributes.Address}}</span>
        <span v-if="item.label == '医疗资源'">{{++index}}.{{item.attributes.NAME}}</span>
        <span v-if="item.id == 'highway_type_1'">{{++index}}.{{item.attributes.Name}}</span>
        <span v-if="item.id == 'highway_type_2'">{{++index}}.{{item.attributes.Name}}</span>
        <span v-if="item.id == 'highway_type_3'">{{++index}}.{{item.attributes.name}}</span>
        <span
          v-if="item.label == '人员密集场所' && item.id == 'people_type_3'"
        >{{++index}}.{{item.attributes.name}}</span>
        <span
          v-if="item.label == '人员密集场所' && (item.id == 'people_type_7')"
        >{{++index}}.{{item.attributes.Address}}</span>
        <span
          v-if="item.label == '人员密集场所' && item.id != 'people_type_3' && item.id != 'people_type_7'"
        >{{++index}}.{{item.attributes.Name}}</span>
        <span
          v-if="item.id == 'people_type_8' || item.id == 'people_type_9'"
        >{{++index}}.{{item.attributes.Name}}</span>
        <span v-if="item.id == 'xq'">{{++index}}.{{item.attributes.name}}</span>
        <span v-if="item.id == 'xqjck'">{{++index}}.{{item.attributes.NAME}}</span>
        <span v-if="item.id == 'wg'">{{++index}}.{{item.attributes.Name}}</span>
        <span
          v-if="item.id == 'chanyePlate'"
        >{{++index}}.{{item.attributes.名称}}（{{item.attributes.num}}例）</span>
        <span
          v-if="item.label == -1"
        >{{++index}}.{{item.attributes.Name?item.attributes.Name:(item.attributes.ProjectName?item.attributes.ProjectName:(item.attributes.CompanyName?item.attributes.CompanyName:item.attributes.项目名称))}}</span>
      </li>
    </ul>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import Loading from "@/components/common/loading";
import { leftOptions } from "../config/enums";

export default {
  name: "sbDate",
  data() {
    return {
      text: undefined,
      data: [],
      forceData: [],
      isLoading: false
    };
  },
  created() {},
  mounted() {
    this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  components: { Loading },
  methods: {
    filteItem() {
      this.isLoading = true;
      const data = this.data;
      const forceData = [];
      data.map(item => {
        const { attributes } = item;
        const tag =
          attributes.name ||
          attributes.Name ||
          attributes.NAME ||
          attributes.Address ||
          attributes.short_name ||
          attributes.姓名;
        tag && ~tag.indexOf(this.text) && forceData.push(item);
      });
      this.forceData = forceData;
      this.isLoading = false;
    },
    getItem({ url, sublayers, id, name, definitionExpression, ytd }, label) {
      this.isLoading = true;
      const d = [];
      definitionExpression && d.push(definitionExpression);
      this.$parent.$refs.leftOptions.tabIndex == 1 && ytd && d.push(ytd);
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
        query.num = 20;
        const { fields, features } = await queryTask.execute(query);
        const fieldAliases = {};
        fields.map(item => {
          fieldAliases[item.name] = item.alias;
        });
        // console.log(features);
        const list = features.map(item => {
          item.fieldAliases = fieldAliases;
          item.label = label;
          item.id = id;
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
        //  街镇网格统计病例
        if (id == "chanyePlate") {
          const qzblList = await this.getQzbl();
          const contryObject = {};
          qzblList.map(item => {
            if (!contryObject[item.attributes.Country]) {
              contryObject[item.attributes.Country] = [];
            }
            contryObject[item.attributes.Country].push(item);
          });
          list.map(item => {
            contryObject[item.attributes.名称] &&
              (item.qzblList = contryObject[item.attributes.名称] || []);
            return item;
          });
        }
        this.data = list;
        this.forceData = list.filter((item, index) => {
          return index < 20;
        });
        this.text = undefined;
        this.isLoading = false;
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
    getQzbl(Country) {
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({
            url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/0`
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
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    show() {
      this.$parent.xqShow = true;
    }
  }
};
</script>

<style>
#fy-rightDiv #sbDateDiv {
  width: 100%;
  height: 32%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  overflow-y: scroll;
  position: relative;
}
#fy-rightDiv #sbDateDiv::-webkit-scrollbar {
  display: none;
}
#fy-rightDiv #sbDateDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#fy-rightDiv #sbDateDiv ul {
  list-style: none;
  width: 96%;
  margin-left: 2%;
  margin-top: 3%;
}
#fy-rightDiv #sbDateDiv ul li {
  padding: 10px 0;
  background: #122960;
  text-align: left;
  padding-left: 15px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
#fy-rightDiv #sbDateDiv ul li:nth-child(even) {
  background: #081942;
}
#fy-rightDiv #sbDateDiv ul li:hover {
  cursor: pointer;
  background-color: #0b5cc7;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #fff;
}
</style>