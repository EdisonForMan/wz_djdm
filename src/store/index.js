/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import { xmBuildSiteURL, yqStreetURL, yqSQURL, yqXSQURL, yqFWURL, yqFJURL } from "@/components/djdm/config/index";
import $util from "@/components/common/util";
Vue.use(Vuex);
import { fetchArcgisServer } from "@/api/beans/space";
export default new Vuex.Store({
  state: {
    /** 原始地图数据 */
    xmBuildSiteList: [],  // 规上工业数据
    fwLayer: [],          // 规上服务业数据
    xsqList: [],          // 县市区数据
    streetList: [],       // 街道数据
    sqList: [],           // 村社数据
    fjList: [],           // 房建数据
    /** 菜单数组 */
    xmMenu: [{ id: "PointLayer", name: "规上工业复工复产", innerText: undefined, check: true, children: [] },
    { id: "fwLayer", name: "限上服务业复工复产", innerText: undefined, check: true, children: [] },
    { id: "xsqLayer", name: "县市区网格", innerText: undefined, check: true, children: [] },
    { id: "streetLayer", name: "乡镇街道功能区", innerText: undefined, check: false, children: [] },
    { id: "sqLayer", name: "村社网络", innerText: undefined, check: false, children: [] },
    { id: "fjLayer", name: "乐清市房建项目", innerText: undefined, check: false, children: [] },
    ],
  },
  mutations: {
    updateXmBuildSiteList(state, { list = [], menu }) {
      state.xmBuildSiteList = list;
      state.xmMenu[0] = menu;
    },
    updateFwList(state, { list = [], menu }) {
      state.fwLayer = list;
      state.xmMenu[1] = menu;
    },
    updateXsqList(state, { list = [], menu }) {
      state.xsqList = list;
      state.xmMenu[2] = menu;
    },
    updateStreetList(state, { list = [], menu }) {
      state.streetList = list;
      state.xmMenu[3] = menu;
    },
    updateSqList(state, { list = [], menu }) {
      state.sqList = list;
      state.xmMenu[4] = menu;
    },
    updateFjList(state, { list = [], menu }) {
      state.fjList = list;
      state.xmMenu[5] = menu;
    },
  },
  actions: {
    /**
     * 规上企业复工复产
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchXmBuildSiteList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: xmBuildSiteURL });
      const buildS = { id: "PointLayer", name: "规上工业复工复产", count: 0, arr: [] };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({ name: attributes['qymc'], geometry, attributes })
        buildS.count += 1;
      })
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "point" } }) }
      commit('updateXmBuildSiteList', { list: data.features, menu })
    },
    /**
     * 服务业
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchFwList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqFWURL });
      const buildS = { id: "fwLayer", name: "限上服务业复工复产", count: 0, arr: [] };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({ name: attributes['qymc'], geometry, attributes: { ...attributes, ygdgqk: `${(attributes.ygdgqk * 100).toFixed(2)}%` } })
        buildS.count += 1;
      })
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: ` (${count})`, check: false, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "point" } }) }
      commit('updateFwList', { list: data.features, menu })
    },
    /**
     * 县市区
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchXsqList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqXSQURL });
      const buildS = {
        id: "xsqLayer", name: "县市区网格", count: 0, arr: []
      };
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: "", check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "polygon" } }) }
      commit('updateXsqList', { list: data.features, menu })
    },
    /**
     * 街镇
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchStreetList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqStreetURL });
      const buildS = { id: "streetLayer", name: "乡镇街道功能区", count: 0, arr: [] };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({ name: attributes['街道'], geometry, attributes: { ...attributes, 更新时间: $util.timestampToTime(attributes.更新时间) } })
        buildS.count += 1;
      })
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "polygon" } }) }
      commit('updateStreetList', { list: data.features, menu })
    },
    /**
     * 村社
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchSqList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqSQURL });
      const buildS = { id: "sqLayer", name: "村社网络", count: 0, arr: [] };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({ name: attributes['村社区'], geometry, attributes })
        buildS.count += 1;
      })
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: ` (${count})`, check: false, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "polygon" } }) }
      commit('updateSqList', { list: data.features, menu })
    },
    /**
     * 房建
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchSqList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqFJURL });
      const buildS = { id: "fjLayer", name: "乐清市房建项目", count: 0, arr: [] };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({ name: attributes['gcmc'], geometry, attributes })
        buildS.count += 1;
      })
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: ` (${count})`, check: false, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "polygon" } }) }
      commit('updateFjList', { list: data.features, menu })
    },
  }
});
