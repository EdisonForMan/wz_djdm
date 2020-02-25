/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import { xmBuildSiteURL, yqStreetURL, yqSQURL, yqXSQURL } from "@/components/djdm/config/index"
Vue.use(Vuex);
import { fetchArcgisServer } from "@/api/beans/space";
export default new Vuex.Store({
  state: {
    /** 原始地图数据 */
    xmBuildSiteList: [],  //  企业数据
    xsqList: [],
    streetList: [],
    sqList: [],
    /** 菜单数组 */
    xmMenu: [{ id: "PointLayer", name: "规上企业复工复产", innerText: undefined, check: true, children: [] },
    { id: "xsqLayer", name: "县市区网格", innerText: undefined, check: true, children: [] },
    { id: "streetLayer", name: "乡镇街道功能区", innerText: undefined, check: true, children: [] },
    { id: "sqLayer", name: "村社网络", innerText: undefined, check: false, children: [] }],
  },
  mutations: {
    updateXmBuildSiteList(state, { list = [], menu }) {
      state.xmBuildSiteList = list;
      state.xmMenu[0] = menu;
    },
    updateXsqList(state, { list = [], menu }) {
      state.xsqList = list;
      state.xmMenu[1] = menu;
    },
    updateStreetList(state, { list = [], menu }) {
      state.streetList = list;
      state.xmMenu[2] = menu;
    },
    updateSqList(state, { list = [], menu }) {
      state.sqList = list;
      state.xmMenu[3] = menu;
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
      const buildS = { id: "PointLayer", name: "规上企业复工复产", count: 0, arr: [] };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({ name: attributes['qymc'], geometry, attributes })
        buildS.count += 1;
      })
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "point" } }) }
      commit('updateXmBuildSiteList', { list: data.features, menu })
    },
    /**
     * 规上企业复工复产 县市区
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchXsqList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqXSQURL });
      const buildS = {
        id: "xsqLayer", name: "县市区网格", count: 0, arr: []
      };
      // data.features.map(({ attributes, geometry }) => {
      //   buildS.arr.push({ name: attributes['qymc'], geometry, attributes })
      //   buildS.count += 1;
      // })
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: "", check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "polygon" } }) }
      commit('updateXsqList', { list: data.features, menu })
    },
    /**
     * 规上企业复工复产
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchStreetList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: yqStreetURL });
      const buildS = { id: "streetLayer", name: "乡镇街道功能区", count: 0, arr: [] };
      data.features.map(({ attributes, geometry }) => {
        buildS.arr.push({ name: attributes['街道'], geometry, attributes })
        buildS.count += 1;
      })
      const { id, name, count, arr } = buildS;
      const menu = { id, name, fieldAliases: data.fieldAliases, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes, type: "polygon" } }) }
      commit('updateStreetList', { list: data.features, menu })
    },
    /**
     * 规上企业复工复产
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
    }
  }
});
