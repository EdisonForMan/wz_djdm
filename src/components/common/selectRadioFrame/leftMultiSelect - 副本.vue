<template>
  <div class="leftMultiSelect">
    <div class="topic">
      <header>
        专题展示
        <!-- <span class="stateTipHeaderBar"></span> -->
      </header>
      <div class="selectFrame no_select">
        <div v-for="(item,index) in this.tree" :key="index">
          <span @click="toggleTree(item.label,index)">
            {{item.label}}
            <input
              v-if="!item.disabled"
              type="checkbox"
              v-model="item.check"
              @change="changeBox(item.check,index)"
              @click="stop($event)"
            />
            <i :class="`iconfont ${item.show?`icon-angle-double-up`:`icon-angle-double-down`}`"></i>
          </span>
          <ul v-show="item.show">
            <li
              v-for="(oitem,oindex) in item.children"
              :key="oindex"
              :class="oitem.isSub ? 'sub':''"
            >
              <p @click="ShowResult(item.label,oitem.name)">
                <img v-if="oitem.img" :src="`${server}/icon/${URL}/${oitem.imgName}.png`" />
                {{oitem.name}}
                <span v-if="oitem.num">({{oitem.num}})</span>
              </p>
              <input
                type="checkbox"
                v-if="!item.disabled"
                v-model="oitem.check"
                @change="changeTree(oitem)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="blueBorder">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="mapOption"></div>
  </div>
</template>

<script>
import { WRT_config } from "@/components/common/Tmap";
const { server } = WRT_config;
export default {
  name: "leftMultiSelect",
  data() {
    return {
      icon_show: true,
      tree: [],
      items: {},
      server,
      URL: null
    };
  },
  components: {},
  props: { leftOptions: Array, leftformdata: Object, imgUrl: String },
  created() {
    this.tree = this.leftOptions;
    this.items = this.leftformdata;
  },
  mounted() {},
  computed: {},
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
      this.intercept();
      this.$parent &&
        this.$parent.Listcontact &&
        this.$parent.Listcontact(item);
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
    ShowResult(label, name) {
      if (!this.$parent) return;
      if (label.includes("鹿城工作先进单位")) {
        this.$parent.TopCompany && this.$parent.TopCompany(name);
      } else if (label == "特色经济") {
        this.$parent.showJJTS && this.$parent.showJJTS(name);
      } else if (label == "鹿城旅游") {
        this.$parent.showJJTS && this.$parent.showTravel(name);
      }
      this.$parent.ResultNone && this.$parent.ResultNone(false);
      this.tree.map((item, index) => {
        const children = item.children.map((c, _index) => {
          if (c.name == name) {
            this.tree[index]["children"][_index].check = true;
          }
        });
      });
      this.intercept();
    },
    intercept() {
      const _tree = this.$util.clone(this.tree);
      for (let i = 0; i < _tree.length; i++) {
        let shall = true;
        _tree[i].children.length
          ? _tree[i].children.map(item => {
              if (!item.check) {
                shall = false;
              }
            })
          : (shall = false);
        _tree[i].check = shall;
      }
      this.tree = _tree;
      this.$parent.leftOptions = this.tree;
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
    }
  }
};
</script>
<style lang="less">
// @import url("../css/style.less");
.leftMultiSelect {
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
      font-weight: 700;
      color: #4cd7ec;
      text-shadow: 0px 0px 4px rgba(76, 215, 236, 0.3);
      padding-left: 20px;
      .stateTipHeaderBar:before {
        content: "";
        width: 4px;
        height: 24px;
        background: #15f9fd;
        display: inline-block;
        float: left;
        margin-top: -7px;
      }

      .stateTipHeaderBar {
        width: 120px;
        height: 12px;
        background: linear-gradient(
          90deg,
          rgba(47, 253, 255, 0.5) 0%,
          rgba(21, 249, 253, 0) 100%
        );
        display: inline-block;
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
      span {
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

      > div {
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
          height: 44px;
          line-height: 28px;
          list-style: none;
          background: rgba(120, 171, 246, 0.2);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 4px;
          padding-left: 22px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          p {
            font-size: 18px;
            cursor: pointer;
            line-height: 44px;
            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              position: relative;
              top: 6px;
            }
            span {
              background: unset;
              background-color: unset;
              width: unset;
              height: unset;
              padding: unset;
              margin-bottom: unset;
              display: unset;
              font-size: unset;
              line-height: unset;
              box-shadow: none;
              border: unset;
            }
          }
          input[type="checkbox"] {
            top: 12px;
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