<template>
  <div id="app">
    <header :class="`app_header `" v-if="showHeader">
      <div class="app_icon" style>乐清市疫情防控企业复工复产大数据平台</div>
      <!-- <div class="app_toptab_position app_toptab_normal">
        <ul class="app_toptab">
          <li
            v-for="(item,index) in toptab"
            :key="index"
            :class="{top_active:index==current}"
            @click="$goRoute(item.route),selected(index)"
          >{{item.label}}</li>
        </ul>
      </div>-->
      <p style="position: absolute;right: 15px;top: 7px;">温州设计集团勘测院</p>
      <p style="position: absolute;right: 15px;top: 33px;">{{time}}</p>
    </header>
    <div class="app_container">
      <router-view ref="router" />
      <transition name="frame"></transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import router from "@/router";
import { OPTION, GET_ARCGIS_TOKEN, WRT_config } from "./components/common/Tmap";
import { fixMenuList } from "./components/common/user/menuHash";
import { Store } from "vuex";
export default {
  name: "app",
  data() {
    return {
      toptab: [
        { label: "宏观管控", route: "control" },
        { label: "防疫布控", route: "macroscopic" },
        { label: "疫情监控", route: "monitor" }
      ],
      current: 1,
      time: " ",
      showHeader: true, // 显示头部
      time: " "
    };
  },
  mounted() {
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  methods: {
    shallLogin() {
      const that = this;
      return new Promise(async (resolve, reject) => {
        that.tabs = window.user.au_username ? fixMenuList(that.toptab) : [];
        resolve(true);
      });
    },
    setLoation() {
      const { name } = this.$router.history.current;
      this.toptab.map((item, index) => {
        if (item.route === name) {
          this.current = index;
        }
      });
    },
    selected(index) {
      this.current = index;
    },
    doRegisterToken(token) {
      const that = this;
      that.$arcgisToken = token;
      loadModules(["esri/identity/IdentityManager"], OPTION).then(
        ([IdentityManager]) => {
          //  token注册
          IdentityManager.registerToken({
            server: GET_ARCGIS_TOKEN,
            token
          });
        }
      );
    },
    //获取当前时间
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var minute = date.getMinutes();
      var hour = date.getHours();
      var second = date.getSeconds();
      //固定时间格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        seperator2 +
        minute +
        seperator2 +
        second;
      this.time = currentdate;
      //return currentdate;
    }
  }
};
</script>

<style lang="less">
@import url("components/common/css/common.less");
@import url("components/common/css/style.less");
@import url("components/common/css/animate.css");
@import url("components/common/css/frame.less");
@import url("components/common/css/arcgis.css");
</style>
