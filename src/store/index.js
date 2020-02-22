/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import { xmBuildSiteURL, djdmBuildSiteURL, buildDataURL } from "@/components/djdm/config/index"
Vue.use(Vuex);
import { fetchArcgisServer } from "@/api/beans/space";
export default new Vuex.Store({
  state: {
    /** 原始地图数据 */
    xmBuildSiteList: [],  //  重点项目工地点
    djdmBuildSiteList: [],  //  大建大美工地点
    /** 指标数据 */
    buildDataList: [],
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
  },
  actions: {
    async fetchBuildDataList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: buildDataURL });
      commit('updateBuildDataList', data.features)
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
        buildS[attributes['XMSZD']].arr.push({ name: attributes['NAME'], geometry })
        buildS[attributes['XMSZD']].count += 1;
      })
      const menu = Object.keys(buildS).map(key => {
        const { name, count, arr } = buildS[key];
        return { name, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry } }) }
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
        !qyhfObj[attributes['djdm_xm.xmszd']] && (qyhfObj[attributes['djdm_xm.xmszd']] = { name: attributes['djdm_xm.xmszd'], count: 0, arr: [] })
        qyhfObj[attributes['djdm_xm.xmszd']].arr.push({ name: attributes['xm_point.NAME'], geometry })
        qyhfObj[attributes['djdm_xm.xmszd']].count += 1;
        //  xxjd
        !xxjdObj[attributes['xm_point.STATE']] && (xxjdObj[attributes['xm_point.STATE']] = { name: attributes['xm_point.STATE'], count: 0, arr: [] })
        xxjdObj[attributes['xm_point.STATE']].arr.push({ name: attributes['xm_point.NAMEE'], geometry })
        xxjdObj[attributes['xm_point.STATE']].count += 1;
        //  hyfl
        !hyflObj[attributes['djdm_xm.constype2']] && (hyflObj[attributes['djdm_xm.constype2']] = { name: attributes['djdm_xm.constype2'], count: 0, arr: [] })
        hyflObj[attributes['djdm_xm.constype2']].arr.push({ name: attributes['xm_point.NAME'], geometry })
        hyflObj[attributes['djdm_xm.constype2']].count += 1;
      })
      const qyhf = Object.keys(qyhfObj).map(key => {
        const { name, count, arr } = qyhfObj[key];
        return { name, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry } }) }
      })
      const xxjd = Object.keys(xxjdObj).map(key => {
        const { name, count, arr } = xxjdObj[key];
        return { name, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry } }) }
      })
      const hyfl = Object.keys(hyflObj).map(key => {
        const { name, count, arr } = hyflObj[key];
        return { name, innerText: ` (${count})`, check: true, children: arr.map(i => { return { name: i.name, geometry: i.geometry } }) }
      })
      commit('updateDjdmBuildSiteList', { list: data.features, qyhf, xxjd, hyfl })
    },
  }
});
