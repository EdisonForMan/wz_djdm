<template>
  <div class="leftRadioSelect">
    <div class="topic">
      <div class="selectFrame no_select">
        <div v-for="(item,index) in this.tree" :key="index">
          <span
            @click="toggleTree(item.label,index)"
            v-if="!((tabIndex==2&&item.sflabel==-1)||(tabIndex!=2&&item.label==-1))"
          >
            {{tabIndex==2?item.sflabel:item.label}}
            <i
              :class="`iconfont ${item.show?`icon-angle-double-up`:`icon-angle-double-down`}`"
            ></i>
          </span>
          <ul
            v-show="item.show"
            v-if="!((tabIndex==2&&item.sflabel==-1)||(tabIndex!=2&&item.label==-1))"
          >
            <li
              v-for="(oitem,oindex) in item.children"
              :key="oindex"
              v-if="!((tabIndex==1 && oitem.ytname == -1) || (tabIndex!=1 && oitem.name == -1))"
            >
              <input
                type="checkbox"
                v-if="!item.disabled"
                v-model="oitem.check"
                @change="changeTree(oitem)"
                @click="ShowResult(oitem,item)"
              />
              <p
                @click="ShowResult(oitem,item)"
              >{{tabIndex==1?(oitem.ytname||oitem.name) : oitem.name}}</p>
              <ToggleSwitch
                v-if="oitem.id == 'jjgl' || oitem.id == 'hbhw'"
                @change="change(oitem.id)"
              />
              <span id="xq" v-if="item.label=='疫情分布'" @click="ShowListxq(oitem,item)">详情</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mapOption"></div>
  </div>
</template>

<script>
/* eslint-disable */
import ToggleSwitch from "./Switch";
import { WRT_config } from "@/components/common/Tmap";
import util from "../../macroscopic/util";
const { server } = WRT_config;
export default {
  name: "leftRadioSelect",
  data() {
    return {
      icon_show: true,
      tree: [],
      items: {},
      server,
      tabIndex: 0,
      URL: null,
      check1: false,
      check2: false
    };
  },
  components: { ToggleSwitch },
  props: { leftOptions: Array, leftformdata: Object, imgUrl: String },
  created() {
    this.tree = this.leftOptions;
    this.items = this.leftformdata;
  },
  methods: {
    hidden() {
      this.icon_show = !this.icon_show;
    },
    //下拉菜单
    toggleTree(label, index) {
      for (let v in this.tree) {
        if (this.tree[v].label == label) {
          this.tree[v].show = !this.tree[v].show;
        }
      }
    },
    //触发父元素
    changeTree(item, event) {
      this.intercept(item);
    },
    stop(e) {
      e.stopPropagation();
    },
    changeBox(item, index) {
      const c = this.tree[index].check;
      for (let i in this.tree[index].children) {
        this.tree[index].children[i].check = c;
      }
    },
    ShowResult(oitem, item) {
      if (!this.$parent || !oitem.id || oitem.isImg) return;
      this.$parent.$refs.table.getItem(oitem, item.label);
      this.$parent.$refs.sbxq.getItem(oitem, item.label);
      // console.log(oitem, item.label);
      this.$parent.$refs.bqtj.getItem(oitem, item.label); //调用病例统计echart
    },
    ShowListxq(oitem, item) {
      this.$parent.listShow = true;
      this.$parent.$refs.listxq.getItem(oitem, item.label);
    },
    intercept({ id, check }) {
      const _tree = this.$util.clone(this.tree);
      if (check) {
        console.log(_tree[0].children)
        for (let i = 0; i < _tree[0].children.length; i++) {
          console.log(_tree[0].children[i])
          _tree[0].children[i].check = _tree[0].children[i].id == id;
        }
      }
      console.log(_tree);
      this.tree = _tree;
      this.$parent.leftOptions = this.tree;
    },
    clean() {
      const _tree = this.$util.clone(this.tree);
      for (let i = 0; i < _tree.length; i++) {
        _tree[i].children.length
          ? _tree[i].children.map(item => {
              item.check = false;
            })
          : null;
        _tree[i].check = false;
      }
      this.tree = _tree;
      this.$parent.leftOptions = this.tree;
      // 清除热力图
      this.$parent.$refs.macroArcgis.removeHeat();
      // 清除空间查询
      this.$parent.$refs.macroArcgis.cleanQuery();
    },
    change(id) {
      const that = this;

      let checked;

      if (id == "jjgl") {
        checked = this.check1 = !this.check1;
      } else if (id == "hbhw") {
        checked = this.check2 = !this.check2;
      }

      this.$parent.$refs.macroArcgis.changeHeat(id, checked);
    }
  },
  watch: {
    tree: {
      handler: function() {},
      deep: true
    },
    imgUrl: {
      handler(newVal, val) {
        this.URL = newVal;
      },
      immediate: true
    },
    leftOptions(newV, oldV) {
      this.tree = newV;
    },
    tabIndex(newV, oldV) {
      // console.log(newV);
      util.$emit("chartDataMod", newV);
      this.clean();
    }
  }
};
</script>
<style lang="less">
// @import url("../css/style.less");
.leftRadioSelect {
  height: 100%;
  border-right: 1px solid;
  background: linear-gradient(
    180deg,
    rgba(0, 63, 189, 0.6) 0%,
    rgba(5, 53, 129, 0.6) 100%
  );
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
    0px 0px 44px 0px rgba(16, 146, 236, 0.3);

  border-image: linear-gradient(
      360deg,
      rgba(7, 73, 190, 0) 0%,
      rgba(0, 172, 255, 0.4) 32%,
      rgba(0, 255, 255, 0.8) 51%,
      rgba(0, 172, 255, 0.4) 73%,
      rgba(7, 73, 190, 0) 100%
    )
    1 10;

  .topic {
    height: 100%;
    overflow: hidden;
    border-top: 1px solid;
    border-image: linear-gradient(
        270deg,
        rgba(7, 73, 190, 0.6) 0%,
        rgba(89, 199, 252, 1) 51%,
        rgba(7, 73, 190, 0.6) 100%
      )
      1 10;

    header {
      height: 40px;
      line-height: 50px;
      text-align: left;
      font-size: 20px;
      color: #4cd7ec;
      text-shadow: 0px 0px 4px rgba(76, 215, 236, 0.3);
      padding-left: 20px;
      cursor: pointer;
      .active {
        font-weight: 700;
        color: #fff;
      }
      i {
        font-style: normal;
        margin: 0 10px;
      }
    }
    .selectFrame::-webkit-scrollbar {
      display: none;
    }
    .selectFrame {
      height: 806px;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 10px;
      text-align: left;

      > div {
        > span {
          display: block;
          height: 52px;
          line-height: 54px;
          height: 52px;
          background: rgba(102, 164, 255, 0.45);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding-left: 12px;
          font-size: 18px;
          margin-bottom: 10px;
          i {
            cursor: pointer;
            color: #fff;
            float: right;
            padding-right: 15px;
          }
        }
        > ul:first-child {
          // p {
          color: rgba(42, 255, 250, 1);
          // }
        }
      }

      ul {
        width: 100%;
        box-sizing: border-box;
        .sub {
          height: 30px;
          line-height: 10px;
          margin-left: 40px;
          width: 70%;
          float: right;
          padding-left: 10px;
          position: relative;
          p {
            font-size: 16px;
            line-height: 22px;
          }
        }
        .sub:before {
          content: "|_";
          position: absolute;
          left: -20px;
          top: 4px;
        }
        li {
          // height: 44px;
          line-height: 28px;
          list-style: none;
          background: rgba(120, 171, 246, 0.2);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 4px;
          padding-left: 22px;
          margin-bottom: 10px;
          display: inline-block;
          width: 90%;
          // justify-content: space-between;
          p {
            font-size: 18px;
            cursor: pointer;
            line-height: 18px;
            display: inline-block;
            width: 158px;
            position: relative;
            top: 5px;
            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              position: relative;
              top: 6px;
            }
            span {
              background: unset;
              margin-bottom: unset;
              display: unset;
              box-shadow: none;
            }
          }
          #xq {
            background: unset;
            margin-bottom: unset;
            display: unset;
            box-shadow: none;
            background-color: #162449 !important;
            border: 1px solid #75c8f4 !important;
            border-radius: 8px;
            padding: 7px 9px !important;
            color: #fff;
            cursor: pointer;
            width: 36px !important;
            height: 20px !important;
            font-size: 14px !important;
            line-height: 23px !important;
            margin-left: 4px;
            margin-top: 4px;
            text-align: center;
            float: right;
          }
          input[type="checkbox"] {
            top: 7px;
            left: -8px;
          }
        }
      }
    }
    .map_content {
      height: 3%;
      display: flex;
    }
    .map_content div {
      width: 33%;
      padding: 2%;
    }
    .map_content span {
      color: #fff;
      font-size: 13px;
      margin-left: 5px;
    }
  }
  .blueBorder {
    height: unset !important;
  }
  /*  input   */
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /*编辑我们自己的样式*/
    position: relative;
    width: 18px;
    height: 18px;
    // transform : translate(-9px, -8px);
    background: rgba(21, 249, 253, 0.66);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border: 0px;
    outline: none;
    cursor: pointer;
    top: 2px;
    margin-right: 2px;
  }

  input[type="checkbox"]:after {
    content: "√";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    line-height: 24px;
    /*增加动画*/
    -webkit-transition: all ease-in-out 300ms;
    -moz-transition: all ease-in-out 300ms;
    transition: all ease-in-out 300ms;
    /*利用border-radius和opacity达到填充的假象，首先隐藏此元素*/
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    opacity: 0;
  }

  input[type="checkbox"]:checked:after {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    opacity: 1;
  }
}
</style>