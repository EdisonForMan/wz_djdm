/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import { xmBuildSiteURL, djdmBuildSiteURL, buildDataURL, backToWzURL } from "@/components/djdm/config/index"
Vue.use(Vuex);
import { fetchArcgisServer } from "@/api/beans/space";
export default new Vuex.Store({
  state: {
    /** 原始地图数据 */
    xmBuildSiteList: [],  //  重点项目工地点
    djdmBuildSiteList: [],  //  大建大美工地点
    /** 指标数据 */
    buildDataList: [],
    backToWzList: [],
    /** 菜单数组 */
    xmMenu: [],
    djdmMenuQyhf: [],
    djdmMenuXxjd: [],
    djdmMenuHyfl: []
  },
  mutations: {
    /**
     * 修改重点项目工地点
     */
    updateXmBuildSiteList(state, { list = [], menu = [] }) {
      state.xmBuildSiteList = list;
      state.xmMenu = menu;
    },
    /**
     * 修改大建大美工地点
     */
    updateDjdmBuildSiteList(state, { list = [], qyhf = [], xxjd = [], hyfl = [] }) {
      state.djdmBuildSiteList = list;
      state.djdmMenuQyhf = qyhf;
      state.djdmMenuXxjd = xxjd;
      state.djdmMenuHyfl = hyfl;
    },
    /**
     * 修改指标数据
     */
    updateBuildDataList(state, data) {
      state.buildDataList = data;
    },
    /**
     * 修改回温数据
     */
    updateBackToWzList(state, data) {
      state.backToWzList = data;
    },
  },
  actions: {
    async fetchBackToWzList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: backToWzURL });
      commit('updateBackToWzList', data.features)
    },
    async fetchBuildDataList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: buildDataURL });
      const _data_ = data.features.map(item => {
        const _item_ = item;
        _item_.attributes.yyysxms = parseInt(_item_.attributes.yyysxms);
        _item_.attributes.djdmxms = parseInt(_item_.attributes.djdmxms)
        return _item_;
      })
      commit('updateBuildDataList', _data_)
    },
    /**
     * xmbuild fetch
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchXmBuildSiteList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: xmBuildSiteURL });
      const buildS = {};
      data.features.map(({ attributes, geometry }) => {
        !buildS[attributes['XMSZD']] && (buildS[attributes['XMSZD']] = { name: attributes['XMSZD'], count: 0, arr: [] })
        buildS[attributes['XMSZD']].arr.push({ name: attributes['NAME'], geometry, attributes })
        buildS[attributes['XMSZD']].count += 1;
      })
      const menu = Object.keys(buildS).map(key => {
        const { name, count, arr } = buildS[key];
        return { name, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes } }) }
      })
      commit('updateXmBuildSiteList', { list: data.features, menu })
    },
    /**
     * djdm fetch
     * @param {*} param0 
     * @param {*} option 
     */
    async fetchDjdmBuildSiteList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: djdmBuildSiteURL });
      const qyhfObj = {};
      const xxjdObj = {};
      const hyflObj = {};
      data.features.map(({ attributes, geometry }) => {
        //  qyhf
        !qyhfObj[attributes['XMSZD']] && (qyhfObj[attributes['XMSZD']] = { name: attributes['XMSZD'], count: 0, arr: [] })
        qyhfObj[attributes['XMSZD']].arr.push({ name: attributes['NAME'], geometry, attributes })
        qyhfObj[attributes['XMSZD']].count += 1;
        //  xxjd
        !xxjdObj[attributes['STATE']] && (xxjdObj[attributes['STATE']] = { name: attributes['STATE'], count: 0, arr: [] })
        xxjdObj[attributes['STATE']].arr.push({ name: attributes['NAME'], geometry, attributes })
        xxjdObj[attributes['STATE']].count += 1;
        //  hyfl
        !hyflObj[attributes['CONSTYPE2']] && (hyflObj[attributes['CONSTYPE2']] = { name: attributes['CONSTYPE2'], count: 0, arr: [] })
        hyflObj[attributes['CONSTYPE2']].arr.push({ name: attributes['NAME'], geometry, attributes })
        hyflObj[attributes['CONSTYPE2']].count += 1;
      })
      const qyhf = Object.keys(qyhfObj).map(key => {
        const { name, count, arr } = qyhfObj[key];
        return { name, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes } }) }
      })
      const xxjd = Object.keys(xxjdObj).map(key => {
        const { name, count, arr } = xxjdObj[key];
        return { name, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes } }) }
      })
      const hyfl = Object.keys(hyflObj).map(key => {
        const { name, count, arr } = hyflObj[key];
        return { name, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry, attributes: i.attributes } }) }
      })
      commit('updateDjdmBuildSiteList', { list: data.features, qyhf, xxjd, hyfl })
    },
  }
});
