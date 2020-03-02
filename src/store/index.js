/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import util from "@/components/common/util.js";
import {
  xmBuildSiteURL,
  djdmBuildSiteURL,
  buildDataURL,
  backToWzURL
} from "@/components/djdm/config/index";
Vue.use(Vuex);
import { fetchArcgisServer } from "@/api/beans/space";
export default new Vuex.Store({
  state: {
    /** 原始地图数据 */
    xmBuildSiteList: [], //  重点项目工地点
    djdmBuildSiteList: [], //  大建大美工地点
    /** 指标数据 */
    buildDataList: [],
    backToWzList: [],
    /**字段名 */
    xmfieldAliases: {},
    djdmfieldAliases: {},
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
    updateXmBuildSiteList(state, { list = [], menu = [], fieldAliases = {} }) {
      state.xmBuildSiteList = list;
      state.xmMenu = menu;
      state.xmfieldAliases = fieldAliases;
    },
    /**
     * 修改大建大美工地点
     */
    updateDjdmBuildSiteList(
      state,
      { list = [], qyhf = [], xxjd = [], hyfl = [], fieldAliases = {} }
    ) {
      state.djdmBuildSiteList = list;
      state.djdmMenuQyhf = qyhf;
      state.djdmMenuXxjd = xxjd;
      state.djdmMenuHyfl = hyfl;
      state.djdmfieldAliases = fieldAliases;
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
    }
  },
  actions: {
    // async fetchFields({state,commit}){
    //   const { data } = await fetchArcgisServer({ url: xmBuildSiteURL });
    //   console.log("在vuex中fetchFields",data.fieldAliases)
    //   commit("updatefields",data.fieldAliases)
    // },

    async fetchBackToWzList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: backToWzURL });
      commit("updateBackToWzList", data.features);
    },
    async fetchBuildDataList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: buildDataURL });
      // console.log("在vuex", data.features);
      const _data_ = data.features.map(item => {
        const _item_ = item;
        _item_.attributes.yyysxms = parseInt(_item_.attributes.yyysxms);
        _item_.attributes.djdmxms = parseInt(_item_.attributes.djdmxms);
        // 安置房修改;
        _item_.attributes.djdmazxms = parseInt(_item_.attributes.djdmazxms);
        _item_.attributes.djdmazfgs = parseInt(_item_.attributes.djdmazfgs);
        //亿元项目
        _item_.attributes.djdmyyxms = parseInt(_item_.attributes.djdmyyxms);
        _item_.attributes.djdmyyfgs = parseInt(_item_.attributes.djdmyyfgs);

        return _item_;
      });
      commit("updateBuildDataList", _data_);
    },
    /**
     * xmbuild fetch
     * @param {*} param0
     * @param {*} option
     */
    async fetchXmBuildSiteList({ state, commit }) {
      const { data } = await fetchArcgisServer({ url: xmBuildSiteURL });
      console.log("fetchXmBuildSiteList", data);
      const buildS = {};
      data.features.map(({ attributes, geometry }) => {
        !buildS[attributes["XMSZD"]] &&
          (buildS[attributes["XMSZD"]] = {
            name: attributes["XMSZD"],
            count: 0,
            arr: []
          });
        buildS[attributes["XMSZD"]].arr.push({
          name: attributes["NAME"],
          geometry,
          attributes
        });
        buildS[attributes["XMSZD"]].count += 1;
      });
      console.log("buildS,", buildS);
      const menu = Object.keys(buildS).map(key => {
        const { name, count, arr } = buildS[key];
        return {
          name,
          innerText: ` (${count})`,
          check: true,
          children: arr.map(i => {
            return {
              name: i.name,
              geometry: i.geometry,
              attributes: i.attributes
            };
          })
        };
      });
      console.log("updateXmBuildSiteList", {
        list: data.features,
        menu,
        fieldAliases: data.fieldAliases
      });
      commit("updateXmBuildSiteList", {
        list: data.features,
        menu,
        fieldAliases: data.fieldAliases
      });
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
      console.log("在vuex111区域", data);

      data.features.map(({ attributes, geometry }) => {
        //  qyhf
        // console.log("!qyhfObj[attributes", attributes);
        !qyhfObj[attributes["XMSZD"]] &&
          (qyhfObj[attributes["XMSZD"]] = {
            name: attributes["XMSZD"],
            count: 0,
            arr: [],
            id: attributes["Id"],
            orig_fid: attributes["ORIG_FID"]
          });
        qyhfObj[attributes["XMSZD"]].arr.push({
          name: attributes["NAME"],
          geometry,
          attributes,
          id: attributes["Id"],
          orig_fid: ["ORIG_FID"]
        });
        qyhfObj[attributes["XMSZD"]].count += 1;
        //  xxjd
        !xxjdObj[attributes["STATE"]] &&
          (xxjdObj[attributes["STATE"]] = {
            name: attributes["STATE"],
            count: 0,
            arr: [],
            id: attributes["Id"],
            orig_fid: attributes["ORIG_FID"]
          });
        xxjdObj[attributes["STATE"]].arr.push({
          name: attributes["NAME"],
          geometry,
          attributes,
          id: attributes["Id"],
          orig_fid: ["ORIG_FID"]
        });
        xxjdObj[attributes["STATE"]].count += 1;
        //  hyfl
        !hyflObj[attributes["CONSTYPE2"]] &&
          (hyflObj[attributes["CONSTYPE2"]] = {
            name: attributes["CONSTYPE2"],
            count: 0,
            arr: [],
            id: attributes["Id"],
            orig_fid: attributes["ORIG_FID"]
          });
        hyflObj[attributes["CONSTYPE2"]].arr.push({
          name: attributes["NAME"],
          geometry,
          attributes,
          id: attributes["Id"],
          orig_fid: ["ORIG_FID"]
        });
        hyflObj[attributes["CONSTYPE2"]].count += 1;
      });
      let qyhf = Object.keys(qyhfObj).map(key => {
        // console.log("在vuex区域", qyhfObj[key]);

        const { name, count, arr, id, orig_fid } = qyhfObj[key];
        return {
          name,
          innerText: ` (${count})`,
          check: true,
          id,
          orig_fid,
          children: arr.map(i => {
            return {
              name: i.name,
              geometry: i.geometry,
              attributes: i.attributes
            };
          })
        };
      });
      let xxjd = Object.keys(xxjdObj).map(key => {
        const { name, count, arr, id, orig_fid } = xxjdObj[key];
        return {
          name,
          innerText: ` (${count})`,
          check: true,
          children: arr.map(i => {
            return {
              name: i.name,
              geometry: i.geometry,
              attributes: i.attributes
            };
          })
        };
      });
      let hyfl = Object.keys(hyflObj).map(key => {
        const { name, count, arr, id, orig_fid } = hyflObj[key];
        return {
          name,
          innerText: ` (${count})`,
          check: true,
          id,
          orig_fid,
          children: arr.map(i => {
            return {
              name: i.name,
              geometry: i.geometry,
              attributes: i.attributes
            };
          })
        };
      });
      console.log("vuex中qyhf,hyfl", qyhf, hyfl);
      qyhf = qyhf.sort(util.compare("id"));
      hyfl = hyfl.sort(util.compare("orig_fid"));
      commit("updateDjdmBuildSiteList", {
        list: data.features,
        qyhf,
        xxjd,
        hyfl,
        fieldAliases: data.fieldAliases
      });
    }
  }
});
