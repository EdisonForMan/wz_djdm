<template>
  <div class="custom-document">
    <div class="custom-query">
      <el-input v-model="queryValue">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" @click="query">查询</el-button>
    </div>
    <el-tabs
      v-model="activeTabsPane"
      type="card"
      class="my-tabs"
      :class="{vsb:!shallTabs}"
      @tab-click="tabsPaneClickHandler"
    >
      <el-tab-pane
        v-for="(value, index) of tabsPane"
        :key="index"
        :label="value.label"
        :name="value.name"
      ></el-tab-pane>
    </el-tabs>
    <div class="custom-document-content">
      <el-menu active-text-color="#000" text-color="#000" class="my-menu">
        <el-submenu
          v-for="(value, index) of tabsMenuData[activeTabsPane]"
          v-if="value.children && value.children.length > 0"
          :key="index"
          :index="index + ''"
        >
          <template slot="title">
            <el-checkbox
              v-model="value.check"
              class="my-checkbox"
              @change="changeCheckboxHandler(index)"
            ></el-checkbox>
            <span>{{ value.name }}</span>
            <span v-if="value.innerText">{{ value.innerText }}</span>
          </template>
          <el-menu-item
            :index="index + '-' + ind"
            v-for="(item, ind) of value.children"
            :key="ind"
            @click="menuItemClickHandler(item)"
            class="children-menu-item"
          >
            <el-checkbox
              v-model="item.check"
              class="my-checkbox"
              @change="changeCheckboxHandler(index, ind)"
              v-show="false"
            ></el-checkbox>
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="index" :index="index + ''" @click="menuItemClickHandler(value)">
          <el-checkbox
            v-model="value.check"
            class="my-checkbox"
            @change="changeCheckboxHandler(index)"
          ></el-checkbox>
          {{ item.name }}
          <span v-if="value.innerText">{{ value.innerText }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "custom-document",
  data() {
    return {
      tabsPane: [
        {
          label: "区域划分",
          name: "qyhf"
        },
        {
          label: "形象进度",
          name: "xxjd"
        },
        {
          label: "行业分类",
          name: "hyfl"
        }
      ],
      activeTabsPane: "xm", // 当前头部tab索引位置
      queryValue: undefined,
      tabsMenuData: { qyhf: [], xxjd: [], hyfl: [], xm: [] }
    };
  },
  computed: {
    ...mapState({
      xmMenu: state => state.xmMenu,
      djdmMenuQyhf: state => state.djdmMenuQyhf,
      djdmMenuXxjd: state => state.djdmMenuXxjd,
      djdmMenuHyfl: state => state.djdmMenuHyfl
    }),
    shallTabs() {
      return this.activeTabsPane != "xm";
    }
  },
  watch: {
    xmMenu(n, o) {
      this.tabsMenuData["xm"] = n;
    },
    djdmMenuQyhf(n, o) {
      this.tabsMenuData["qyhf"] = n;
    },
    djdmMenuXxjd(n, o) {
      this.tabsMenuData["xxjd"] = n;
    },
    djdmMenuHyfl(n, o) {
      this.tabsMenuData["hyfl"] = n;
    }
  },
  created() {
    this.xmMenu.length && (this.tabsMenuData["xm"] = this.xmMenu);
    this.djdmMenuQyhf.length && (this.tabsMenuData["qyhf"] = this.djdmMenuQyhf);
    this.djdmMenuXxjd.length && (this.tabsMenuData["xxjd"] = this.djdmMenuXxjd);
    this.djdmMenuHyfl.length && (this.tabsMenuData["hyfl"] = this.djdmMenuHyfl);
  },
  mounted() {
    this.eventRegister();
  },
  methods: {
    eventRegister() {
      this.$hub.$on("topDocumentClick", val => {
        this.activeTabsPane = val ? "qyhf" : "xm";
      });
    },
    tabsPaneClickHandler() {
      this.$hub.$emit("tabsPane-click");
    },
    changeCheckboxHandler(parentIndex, childrenIndex) {
      const currentMenu = this.tabsMenuData[this.activeTabsPane];
      if (childrenIndex !== null && childrenIndex !== undefined) {
        let parentCheck = currentMenu[parentIndex].check;
        let allCheck = true;
        currentMenu[parentIndex].children.map((item, index) => {
          // if (index === childrenIndex) {
          //   item.check
          //     ? this.$hub.$emit("document-single-choose", item)
          //     : this.$hub.$emit("document-single-close", item);
          // }
          if (!item.check) allCheck = false;
        });
        this.$set(currentMenu[parentIndex], "check", allCheck);
      } else {
        let parentCheck = currentMenu[parentIndex].check;
        let items = [];
        currentMenu[parentIndex].children.map((item, index) => {
          if (parentCheck && !item.check) {
            items.push(item);
            item.check = true;
          } else if (!parentCheck && item.check) {
            items.push(item);
            item.check = false;
          }
        });
        this.$set(currentMenu[parentIndex], "check", parentCheck);
        // parentCheck
        //   ? this.$hub.$emit("document-single-list-choose", items)
        //   : this.$hub.$emit("document-single-list-close", items);
        this.$hub.$emit("document-checkbox");
      }
    },
    // 单独点击一个侧目录的子项
    menuItemClickHandler(obj) {
      this.$hub.$emit("menu-item-click", obj);
    },
    // 查询
    query() {
      this.$hub.$emit("query-handler", this.queryValue);
    }
  }
};
</script>
<style scoped>
.custom-document {
  width: 296px;
  background: url(./img/document_bg.png) 0 0 no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 10px 10px;
  position: relative;
  text-align: left;
}
.custom-document-content {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
.custom-document-content::-webkit-scrollbar {
  /*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
  height: 4px;
  width: 4px;
}
.custom-document-content::-webkit-scrollbar-track-piece {
  /*内层轨道，滚动条中间部分（位置4）*/
  background: rgba(4, 30, 117, 0.4);
  border-radius: 2px;
}
.custom-document-content::-webkit-scrollbar-thumb {
  /*滚动条里面可以拖动的那部分（位置5）*/
  background: rgba(62, 158, 255, 0.8);
  border-radius: 2px;
}

.custom-query {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 23px;
  display: flex;
}
.custom-query /deep/ .el-input {
  width: 180px;
  margin-right: 9px;
}
.custom-query /deep/ .el-input__inner {
  height: 24px;
  line-height: 24px;
  border-color: #10cdf9;
  background: rgba(22, 52, 127, 0.5);
  font-size: 14px;
  border-radius: 0;
  color: #fff;
}
.custom-query /deep/ .el-input__icon {
  line-height: 24px;
}
.custom-query /deep/ .el-button {
  height: 24px;
  line-height: 24px;
  background: rgba(37, 169, 226, 1);
  width: 50px;
  padding: 0;
  border-radius: 0;
  box-sizing: border-box;
}

.my-tabs {
  padding-top: 58px;
}
.my-tabs /deep/ .el-tabs__header {
  border-color: #21c8ff;
  border-width: 2px;
}
.my-tabs /deep/ .el-tabs__nav {
  border: none !important;
  top: -1px;
}
.my-tabs /deep/ .el-tabs__item {
  padding: 1px 9px !important;
  border: none !important;
  border-radius: 5px 5px 0 0;
  height: 20px;
  line-height: 20px;
  background-color: #2667a8;
  font-size: 13px;
  color: #7fb5f8;
}
.my-tabs /deep/ .el-tabs__item.is-active {
  background-color: #21c8ff;
  color: #fff;
}

.my-menu /deep/ .my-checkbox {
  margin-right: 8px;
  top: -1px;
}
.my-menu /deep/ .my-checkbox .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.my-menu /deep/ .my-checkbox .el-checkbox__inner::after {
  width: 5px;
  height: 11px;
  border-width: 2px;
  left: 6px;
}
.my-menu /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.my-menu /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #1e3663;
  border-color: #1e3663;
}

.my-menu,
.my-menu /deep/ .el-menu {
  background: transparent;
  border: none;
}
.my-menu /deep/ .el-submenu {
  margin-bottom: 20px;
}
.my-menu /deep/ .el-submenu__title {
  font-size: 17px;
  color: #fff !important;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
  font-family: PingFangSC-Medium, PingFang SC;
  background: rgba(62, 158, 255, 0.66);
}
.my-menu /deep/ .el-submenu__title:hover {
  background: rgba(62, 158, 255, 0.66);
}
.my-menu /deep/ .el-submenu__title i {
  color: #fff;
  font-size: 17px;
}
.children-menu-item {
  padding: 0 6px !important;
  height: 44px;
  line-height: 44px;
  background: rgba(19, 88, 183, 0.44);
  border-bottom: 1px solid #3e9eff;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fff !important;
}
.children-menu-item:hover {
  background: rgba(19, 88, 183, 0.84);
}
.my-menu /deep/ .el-submenu .children-menu-item:last-child {
  border-bottom: none;
}
/** visible */
.vsb {
  visibility: hidden;
}
</style>