<template>
  <div class="custom-document animated" :class="[hideVisible?'slideOutLeft':'slideInLeft']">
    <div class="custom-query">
      <el-input v-model="queryValue">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" @click.stop="query">查询</el-button>
    </div>
    <el-tabs v-model="tabActive" class="my-tabs" @tab-click="tabsPaneClickHandler">
      <el-tab-pane label="企业复工复产" name="fgfc" />
      <el-tab-pane label="疫情防控" name="xzqh" />
    </el-tabs>
    <div class="custom-document-content">
      <el-menu active-text-color="#000" text-color="#000" class="my-menu">
        <el-submenu
          v-for="(value, index) of tabsMenuData"
          v-show="value.tab == tabActive"
          :class="[!value.id?'noCheck':'']"
          :key="index"
          :index="index + ''"
        >
          <template slot="title">
            <el-checkbox
              v-if="value.children.length"
              v-model="value.check"
              class="my-checkbox"
              @click.stop.native="()=>{}"
              @change="changeCheckboxHandler(index)"
            ></el-checkbox>
            <span class="inner-title" v-if="!value.children.length" v-html="value.innerTitle" />
            <span>{{ value.name }}</span>
            <span v-if="value.innerText">{{ value.innerText }}</span>
          </template>
          <el-menu-item
            :index="index + '-' + ind"
            v-for="(item, ind) of value.children"
            :key="ind"
            @click="menuItemClickHandler(item,value)"
            :class="[item.key?'key_sc':'']"
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
      </el-menu>
    </div>
    <span class="hide_button" @click="hideSide"></span>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "custom-document",
  data() {
    return {
      tabActive: "fgfc",
      queryValue: undefined,
      tabsMenuData: [],
      hideVisible: false
    };
  },
  computed: {
    ...mapState({
      xmMenu: state => state.xmMenu,
      dataDone: state => state.dataDone
    })
  },
  watch: {
    xmMenu(n, o) {
      this.tabsMenuData = n;
    }
  },
  created() {
    this.xmMenu.length && (this.tabsMenuData = [...this.xmMenu]);
  },
  watch: {
    dataDone(n) {
      n && (this.tabsMenuData = [...this.xmMenu]);
    }
  },
  methods: {
    hideSide() {
      this.hideVisible = !this.hideVisible;
    },
    tabsPaneClickHandler(val) {},
    changeCheckboxHandler(parentIndex, childrenIndex) {
      const currentMenu = this.tabsMenuData;
      const parentCheck = currentMenu[parentIndex].check;
      if (currentMenu[parentIndex].id) {
        this.$set(currentMenu[parentIndex], "check", parentCheck);
        this.$hub.$emit("document-checkbox", currentMenu[parentIndex]);
      } else {
        return alert("功能建设中，敬请期待!");
      }
    },
    // 单独点击一个侧目录的子项
    menuItemClickHandler(obj, { fieldAliases }) {
      this.$hub.$emit("menu-item-click", { obj, fieldAliases });
    },
    // 查询
    query() {
      const tabsMenuData = [];
      const reg = new RegExp(this.queryValue);
      this.xmMenu.forEach(Element => {
        const children = Element.children.filter(item => item.name.match(reg));
        tabsMenuData.push({
          check: Element["check"],
          children,
          innerText: `(${children.length})`,
          name: Element["name"],
          fieldAliases: Element["fieldAliases"],
          tab: Element["tab"]
        });
      });
      this.tabsMenuData = [...tabsMenuData];
    }
  }
};
</script>
<style scoped>
.hide_button {
  position: absolute;
  top: 40%;
  left: 320px;
  height: 126px;
  width: 27px;
  background: url("./img/hide_button.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.custom-document {
  top: 120px !important;
  width: 320px;
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
  flex: 1;
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
  height: 60px;
  line-height: 60px;
}
.custom-query /deep/ .el-input {
  width: 240px;
  margin-right: 8px;
}
.custom-query /deep/ .el-input__inner {
  height: 34px;
  line-height: 34px;
  border-color: #10cdf9;
  background: rgba(22, 52, 127, 0.5);
  font-size: 16px;
  border-radius: 0;
  color: #fff;
}
.custom-query /deep/ .el-input__icon {
  line-height: 34px;
}
.custom-query /deep/ .el-button {
  height: 34px;
  line-height: 34px;
  background: rgba(37, 169, 226, 1);
  width: 50px;
  padding: 0;
  border-radius: 0;
  font-size: 16px;
  box-sizing: border-box;
}

.my-tabs /deep/ .el-tabs__active-bar {
  height: 4px;
}
.my-tabs /deep/ .el-tabs__item {
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  padding: 0 10px !important;
  color: rgba(255, 255, 255, 0.8);
}
.my-tabs /deep/ .is-active {
  color: #409eff;
  font-weight: 700;
}
.my-tabs /deep/ .el-tabs__nav-wrap::after {
  height: 1px;
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
.custom-document-content > .my-menu {
  /* top: 80px; */
}
.my-menu,
.my-menu /deep/ .el-menu {
  background: transparent;
  border: none;
}
.my-menu /deep/ .el-submenu {
  position: relative;
  margin-bottom: 16px;
}
.my-menu /deep/ .noCheck {
  margin-bottom: 6px;
}
.my-menu /deep/ .inner-title {
  position: absolute;
  font-size: 14px;
  top: -14px;
  left: 85px;
}
.my-menu /deep/ .noCheck .el-submenu__title {
  background: unset;
}
.my-menu /deep/ .noCheck .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
.my-menu /deep/ .el-menu-item.is-active {
  background-color: rgba(19, 88, 183, 1);
}
.my-menu /deep/ .el-submenu__title {
  padding: 0 14px !important;
  font-size: 18px;
  color: #fff !important;
  font-weight: 500;
  height: 46px;
  line-height: 42px;
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
  font-size: 16px;
  color: #fff !important;
  position: relative;
}
.key_sc {
  background: rgba(220, 20, 60, 0.2);
}
.children-menu-item:hover {
  background: rgba(19, 88, 183, 0.84);
}
.children-menu-item > button {
  position: absolute;
  right: 10px;
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  top: 12px;
  background-color: #243968;
  border: 1px solid #05fff8;
  color: #fff;
  cursor: pointer;
}
.my-menu /deep/ .el-submenu .children-menu-item:last-child {
  border-bottom: none;
}
/** visible */
.vsb {
  visibility: hidden;
}
</style>