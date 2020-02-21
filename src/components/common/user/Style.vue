<template>
<div class="Style-view">
  <div class="Style">
    <div>
      <head>
        个人中心
        <i class="iconfont iconRectangleCopy" @click="closeStyle"></i>
      </head>
      <div class="Style_contain">
        <div class="infoName">
          <head>
            <span>个人信息</span>
            <a @click="Exit" v-if="login">安全退出</a>
            <a @click="updatePassport" v-if="login">修改密码</a>
          </head>
          <div>
            <ul>
              <li>
                <span>用户名:</span>
                <span>{{au_username}}</span>
              </li>
              <li>
                <span>部门:</span>
                <span>{{au_groupname}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="_Style">
          <head>
            <span>系统风格</span>
            <span>请选择一款合适的配色作为您的默认颜色</span>
          </head>
          <div class="_Style_Color">
            <div>
              <ul>
                <li v-for="(item,index) in style_color" :key="index">
                  <div>
                    <p :style="`background:${item.color}`" @click="StyleColor(item.class,index)"></p>
                    <div
                      :style="` border-color: transparent ${item.color} transparent transparent`"
                      v-if="item.show"
                    ></div>
                  </div>
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
            <div class="_img">
              <img :src="`${server}/icon/commonIcon/${styleMap}.png`" />
            </div>
          </div>
        </div>
        <div class="saveButton" @click="changStyle()">保存</div>
      </div>
    </div>
  </div>
  <Passport v-if="showPassport" />
</div>
</template>
<script>
import { WRT_config } from "@/components/common/Tmap";
import Passport from "@/components/common/user/Passport";
const { server } = WRT_config;
import { addDataStores, updateDataStores } from "@/api/beans/auth";
import styleApi from "@/api/beans/u_choosestyle";
import { auth_token, auth_token_info } from "@/api/beans/auth";
export default {
  name: "Style",
  data() {
    return {
      server,
      auth_token,
      au_username: window.user.au_username,
      au_groupname: window.user.group[0].au_groupname,
      showPassport: false,
      style_color: [
        {
          color: "rgba(224,224,225,1)",
          name: "珠光白",
          class: "app",
          show: true
        },
        {
          color: "rgba(16,50,105,1)",
          name: "科技蓝",
          class: "Default2",
          show: false
        },
        {
          color: "rgba(22,62,124,1)",
          name: "实景灰",
          class: "Default3",
          show: false
        },
        {
          color: "rgba(37,35,103,1)",
          name: "水晶紫",
          class: "Default4",
          show: false
        }
      ],
      styleClass: "",
      styleMap: "app",
      mapStyle: "",
      login: window.user.au_username == "游客" ? false : true
    };
  },
  components: { Passport },
  props: {},
  created() {
    this.showColor();
  },
  mounted() {},
  methods: {
    StyleColor(item, _index) {
      let _mapTool;
      this.styleClass = item;
      const _style_color = this.$util.clone(this.style_color);
      _mapTool =
        window.user.au_username == "游客"
          ? this.$util.clone(
              this.$parent.$refs.router.$refs.StyleTool.$refs.Summary.mapTool
            )
          : this.$util.clone(this.$parent.$refs.router.$refs.StyleTool.mapTool);
      _style_color.map(_item => {
        _item.show = _item.class == item;
      });
      this.style_color = _style_color;
      this.styleMap = item;
      const _tip_ =
        item == "app"
          ? "simpleStyle"
          : item == "Default3"
          ? "image2017"
          : "largeDataStyle";
      for (let d in _mapTool) {
        for (let v in _mapTool[d].children) {
          (_mapTool[d].children[v].check = v == _tip_) &&
            v == _tip_ &&
            (this.mapStyle = v);
        }
      }
      if (window.user.au_username == "游客") {
        this.$parent.$refs.router.$refs.StyleTool.$refs.Summary.mapTool = _mapTool;
      } else {
        this.$parent.$refs.router.$refs.StyleTool.mapTool = _mapTool;
      }
      const demo = document.getElementsByTagName("div")[0];
      demo.className = this.styleClass;
    },
    changStyle() {
      const params = {
        res: "testsql_all",
        data: [
          {
            userName: this.au_username,
            userDepart: this.au_groupname,
            chooseStyle: this.styleClass,
            mapStyle: this.mapStyle
          }
        ]
      };
      const params1 = {
        ...params,
        keys: [{ userName: this.au_username }]
      };
      if (
        location.host.includes("lysb.lucheng.gov.cn") ||
        location.host.includes("localhost")
      ) {
        //  对外版本 或 本地版本 情况下修改style
        this.$util.setStorage("@style", params.data);
        window.user.style = [...params.data];
      } else {
        //  政务版用户登录情况下修改style
        window.user.style.length
          ? updateDataStores("u_choosestyle", params1)
          : addDataStores("u_choosestyle", params);
        //  更新window内存user的style样式
        window.user.style = [...params.data];
      }
      this.$parent.chooseStyle = false;
    },
    closeStyle() {
      const demo = document.getElementsByTagName("div")[0];
      demo.className = window.user.style.length
        ? window.user.style[0].chooseStyle
        : "app";
      let _mapTool =
        window.user.au_username == "游客"
          ? this.$util.clone(
              this.$parent.$refs.router.$refs.StyleTool.$refs.Summary.mapTool
            )
          : this.$util.clone(this.$parent.$refs.router.$refs.StyleTool.mapTool);
      for (let d in _mapTool) {
        for (let v in _mapTool[d].children) {
          _mapTool[d].children[v].check = v == window.user.style[0].mapStyle;
        }
      }
      if (window.user.au_username == "游客") {
        this.$parent.$refs.router.$refs.StyleTool.$refs.Summary.mapTool = _mapTool;
      } else {
        this.$parent.$refs.router.$refs.StyleTool.mapTool = _mapTool;
      }
      this.$parent.chooseStyle = false;
    },
    showColor() {
      const _style_color = this.$util.clone(this.style_color);
      if (window.user.style.length) {
        _style_color.map(_item => {
          _item.show = _item.class == window.user.style[0].chooseStyle;
        });
      }
      this.style_color = _style_color;
    },
    updatePassport() {
      this.showPassport = true;
    },
    Exit() {
      this.$util.removeStorage("access_token");
      window.location.href = `http://lysb.lucheng.gov.cn/index.html#/`;
    }
  }
};
</script>
 <style lang="less">
.Style-view {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  margin: auto;
  z-index: 4;
  .Style {
    width: 1080px;
    height: 780px;
    background: linear-gradient(
      180deg,
      rgba(20, 67, 135, 1) 0%,
      rgba(16, 78, 178, 1) 100%
    );
    border-radius: 4px;
    display: inline-block;
    position: absolute;
    left: 50%;
    right: 50%;
    top: 108px;
    transform: translate(-50%, 0px);
    z-index: 1;
    div {
      width: 100%;
      height: 100%;
      head {
        width: 100%;
        color: rgba(50, 241, 254, 1);
        height: 16px;
        font-size: 24px;
        text-align: center;
        display: block;
        position: relative;
        top: 16px;
        i {
          // background:rgba(221,221,221,1);
          color: rgba(221, 221, 221, 1);
          position: absolute;
          right: 20px;
          font-size: 24px;
          cursor: pointer;
        }
      }
      .Style_contain {
        width: 100%;
        height: 100%;
        padding: 60px;
        .infoName {
          width: 960px;
          height: 140px;
          background: rgba(164, 205, 255, 0.3);
          margin-bottom: 17px;
          padding: 20px;
          head {
            width: 100%;
            text-align: left;
            height: unset;
            top: -12px;
            span:first-child {
              width: 96px;
              height: 33px;
              font-size: 24px;
              font-weight: 600;
              color: rgba(50, 241, 254, 1);
              line-height: 33px;
              text-align: left;
            }
            a {
              width: 64px;
              height: 25px;
              // background: rgba(50, 241, 254, 1);
              border-radius: 2px;
              color: rgba(154, 255, 248, 1);
              font-size: 13px;
              float: right;
              padding: 0px 5px;
              line-height: 28px;
              cursor: pointer;
            }
          }
          div {
            width: 100%;
            display: inline-block;
            ul {
              width: 100%;
              list-style: none;
              display: flex;
              flex-wrap: wrap;
              margin-left: 38px;
              li {
                width: 50%;
                text-align: left;
                padding: 10px;
                span:first-child {
                  width: 64px;
                  height: 22px;
                  font-size: 16px;
                  font-weight: 400;
                  color: rgba(154, 255, 248, 1);
                  line-height: 22px;
                }
                span:last-child {
                  width: 36px;
                  height: 25px;
                  font-size: 18px;
                  font-weight: 600;
                  color: rgba(240, 246, 255, 1);
                  line-height: 25px;
                }
              }
            }
          }
        }
        ._Style {
          width: 960px;
          height: 465px;
          padding: 20px;
          margin-bottom: 15px;
          background: rgba(164, 205, 255, 0.3);
          head {
            width: 100%;
            text-align: left;
            height: unset;
            top: -12px;
            span:first-child {
              width: 96px;
              height: 33px;
              font-size: 24px;
              font-weight: 600;
              color: rgba(50, 241, 254, 1);
              line-height: 33px;
              text-align: left;
            }
            span:last-child {
              width: 288px;
              height: 22px;
              font-size: 16px;
              font-weight: 400;
              color: rgba(31, 252, 255, 1);
              line-height: 22px;
              padding: 0px 10px;
            }
          }
          ._Style_Color {
            width: 100%;
            height: 400px;
            display: flex;
            flex-direction: row;
            div {
              width: 215px;
              ul {
                width: 100%;
                li {
                  flex: 1;
                  text-align: center;
                  padding: 10px 0;
                  div {
                    width: 85px;
                    height: 58px;
                    margin: 0 auto;
                    p {
                      width: 59px;
                      height: 48px;
                      margin: 0 auto;
                      cursor: pointer;
                    }
                    div {
                      border-width: 21px;
                      border-style: solid;
                      transform: rotate(180deg);
                      display: inline-block;
                      position: relative;
                      top: -46px;
                      left: 42px;
                      width: 21px;
                      height: 43px;
                    }
                  }
                  span {
                    width: 42px;
                    height: 20px;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: 20px;
                  }
                }
              }
            }
            ._img {
              width: 960px;
              height: 480px;
            }
          }
        }
        .saveButton {
          width: 88px;
          height: 40px;
          background: rgba(59, 116, 253, 1);
          border-radius: 4px;
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          margin: 0 auto;
          cursor: pointer;
        }
      }
    }
  }
}
</style>