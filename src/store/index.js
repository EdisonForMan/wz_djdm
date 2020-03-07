/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import {
  xmBuildSiteURL,
  yqStreetURL,
  yqSQURL,
  yqXSQURL,
  yqFWURL,
  yqFJURL
} from "@/components/djdm/config/index";
import { TOP_CS, TOP_CS_CNT } from "@/components/djdm/config/enums";
import $util from "@/components/common/util";
Vue.use(Vuex);
import { fetchArcgisServer } from "@/api/beans/space";
export default new Vuex.Store({
  state: {
    /** 原始地图数据 */
    xmBuildSiteList: [], // 规上工业数据
    fwLayer: [], // 规上服务业数据
    xsqList: [], // 县市区数据
    streetList: [], // 街道数据
    sqList: [], // 村社数据
    fjList: [], // 房建数据
    /** 数据hub下标 */
    dataDone: false,
    /** 菜单数组 */
    xmMenu: [
      {
        id: "PointLayer",
        name: "规上工业复工复产",
        innerText: undefined,
        check: true,
        children: [],
        tab: "fgfc"
      },
      {
        id: "fwLayer",
        name: "限上服务业复工复产",
        innerText: undefined,
        check: false,
        children: [],
        tab: "fgfc"
      },
      {
        id: "fjLayer",
        name: "房建项目",
        innerText: undefined,
        check: false,
        children: [],
        tab: "fgfc"
      },
      {
        name: "乐清市",
        innerText: undefined,
        children: [],
        forceText: true,
        tab: "xzqh"
      },
      {
        id: "streetLayer",
        name: "乡镇街道",
        innerText: undefined,
        check: false,
        children: [],
        forceText: true,
        tab: "xzqh"
      },
      {
        id: "sqLayer",
        name: "村、社区",
        innerText: undefined,
        check: false,
        children: [],
        tab: "xzqh"
      }
    ]
  },
  mutations: {
    updateXmBuildSiteList(state, { list = [], menu }) {
      state.xmBuildSiteList = list;
      state.xmMenu[0] = { ...state.xmMenu[0], ...menu };
    },
    updateFwList(state, { list = [], menu }) {
      state.fwLayer = list;
      state.xmMenu[1] = { ...state.xmMenu[1], ...menu };
    },
    updateFjList(state, { list = [], menu }) {
      state.fjList = list;
      state.xmMenu[2] = { ...state.xmMenu[2], ...menu };
    },
    updateStreetList(state, { list = [], menu, extraMenu }) {
      state.streetList = list;
      state.xmMenu[3] = { ...state.xmMenu[3], ...extraMenu };
      state.xmMenu[4] = { ...state.xmMenu[4], ...menu };
    },
    updateSqList(state, { list = [], menu }) {
      state.sqList = list;
      state.xmMenu[5] = { ...state.xmMenu[5], ...menu };
    },
    updateXsqList(state, { list = [], menu }) {
      state.xsqList = list;
      menu;
    },
    updateDataDone(state) {
      console.log("[done]", "data fetch");
      state.dataDone = true;
    }
  },
  actions: {
    /**
     * 规上企业复工复产
     * @param {*} param0
     * @param {*} option
     */
    async fetchXmBuildSiteList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: xmBuildSiteURL });
      const buildS = {
        count: 0,
        arr: []
      };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({
          name: attributes["qymc"],
          geometry,
          attributes: {
            ...attributes,
            ygdgl: `${(attributes.ygdgl * 100).toFixed(2)}%`,
          },
          ydyg: $util.toParseInt(attributes.ydyg)
        });
        buildS.count += 1;
      });
      const { count, arr } = buildS;
      const menu = {
        fieldAliases: data.fieldAliases,
        innerText: ` (${count})`,
        children: arr.sort($util.compare("ydyg")).reverse().map(i => {
          return {
            name: `${i.name}(${i.attributes.ydyg}/${i.attributes.ygdgl})`,
            geometry: i.geometry,
            attributes: i.attributes,
            type: "point"
          };
        })
      };
      commit("updateXmBuildSiteList", { list: data.features, menu });
    },
    /**
     * 服务业
     * @param {*} param0
     * @param {*} option
     */
    async fetchFwList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqFWURL });
      const buildS = {
        count: 0,
        arr: []
      };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({
          name: attributes["qymc"],
          geometry,
          attributes: {
            ...attributes,
            ygdgl: `${(attributes.ygdgl * 100).toFixed(2)}%`,
          },
          ydyg: $util.toParseInt(attributes.ydyg)
        });
        buildS.count += 1;
      });
      const { count, arr } = buildS;
      const menu = {
        fieldAliases: data.fieldAliases,
        innerText: ` (${count})`,
        children: arr.sort($util.compare("ydyg")).reverse().map(i => {
          return {
            name: `${i.name}(${i.attributes.ydyg}/${i.attributes.ygdgl})`,
            geometry: i.geometry,
            attributes: i.attributes,
            type: "point"
          };
        })
      };
      commit("updateFwList", { list: data.features, menu });
    },
    /**
     * 县市区
     * @param {*} param0
     * @param {*} option
     */
    async fetchXsqList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqXSQURL });
      const buildS = {
        count: 0,
        arr: []
      };
      const { arr } = buildS;
      const menu = {
        fieldAliases: data.fieldAliases,
        innerText: "",
        children: arr.map(i => {
          return {
            name: i.name,
            geometry: i.geometry,
            attributes: i.attributes,
            type: "polygon"
          };
        })
      };
      commit("updateXsqList", { list: data.features, menu });
    },
    /**
     * 街镇
     * @param {*} param0
     * @param {*} option
     */
    async fetchStreetList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqStreetURL });
      const buildS = {
        count: 0,
        red_cnt: 0,
        yellow_cnt: 0,
        arr: []
      };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({
          name: attributes["ssjd"],
          geometry,
          attributes: {
            ...attributes,
            gxsj: $util.timestampToTime(attributes.gxsj)
          },
          // 总人数(排序用)
          cnt: $util.toParseInt(attributes.ldrk_all),
          red_cnt: $util.toParseInt(attributes.ldrk_red),
          yellow_cnt: $util.toParseInt(attributes.ldrk_yellow)
        });
        buildS.count += $util.toParseInt(attributes.ldrk_all);
        buildS.red_cnt += $util.toParseInt(attributes.ldrk_red);
        buildS.yellow_cnt += $util.toParseInt(attributes.ldrk_yellow);
      });
      const { count, red_cnt, yellow_cnt, arr } = buildS;
      const menu = {
        fieldAliases: data.fieldAliases,
        innerText: ` (流动人口)`,
        children: arr
          .sort($util.compare("cnt"))
          .reverse()
          .map(i => {
            return {
              name: `${i.name} ${(i.cnt / 10000).toFixed(2)}万人/红码${
                i.red_cnt
                }/黄码${i.yellow_cnt}`,
              geometry: i.geometry,
              attributes: i.attributes,
              type: "polygon"
            };
          })
      };
      const extraMenu = {
        innerText: `(${count}/${red_cnt}/${yellow_cnt})`,
        innerTitle: `流动人口&ensp;/&ensp;<i class="red_title">红码</i>&emsp;/&ensp;<i class="yellow_title">黄码</i>`
      };
      commit("updateStreetList", { list: data.features, menu, extraMenu });
    },
    /**
     * 村社
     * @param {*} param0
     * @param {*} option
     */
    async fetchSqList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqSQURL });
      const buildS = { count: 0, arr: [] };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({
          name: attributes["村社区"],
          geometry,
          attributes, // 总人数(排序用)
          red_cnt:
            $util.toParseInt(attributes.CZRK_R) +
            $util.toParseInt(attributes.LDRK_R)
        });
        buildS.count += 1;
      });
      const _arr_ = buildS.arr.sort($util.compare("red_cnt")).reverse();
      const top_arr = _arr_
        .filter(({ name }) => TOP_CS.includes(name))
        .map(i => {
          return {
            name: `${i.attributes.街道}${i.name} （重点村社）`,
            key: true,
            geometry: i.geometry,
            attributes: i.attributes,
            type: "polygon"
          };
        });
      const rest_arr = _arr_
        .filter(({ name }) => !TOP_CS.includes(name))
        .map(i => {
          return {
            name: `${i.attributes.街道}${i.name} （红码人数:${i.red_cnt}）`,
            geometry: i.geometry,
            attributes: i.attributes,
            type: "polygon"
          };
        });
      const { count } = buildS;
      const menu = {
        fieldAliases: data.fieldAliases,
        innerText: ` (${count}个)`,
        children: [...top_arr, ...rest_arr]
      };
      commit("updateSqList", { list: data.features, menu });
    },
    /**
     * 房建
     * @param {*} param0
     * @param {*} option
     */
    async fetchFjList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqFJURL });
      const buildS = {
        count: 0,
        arr: []
      };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({ name: attributes["gcmc"], geometry, attributes });
        buildS.count += 1;
      });
      const { count, arr } = buildS;
      const menu = {
        fieldAliases: data.fieldAliases,
        innerText: ` (${count})`,
        children: arr.map(i => {
          return {
            name: i.name,
            geometry: i.geometry,
            attributes: i.attributes,
            type: "polygon"
          };
        })
      };
      commit("updateFjList", { list: data.features, menu });
    }
  }
});
