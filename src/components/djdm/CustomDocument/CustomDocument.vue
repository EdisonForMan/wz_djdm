<template>
  <div class="custom-document">
    <div class="custom-query">
      <el-input v-model="queryValue">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" @click.stop="query">查询</el-button>
    </div>
    <div class="custom-document-content">
      <el-menu active-text-color="#000" text-color="#000" class="my-menu">
        <el-submenu v-for="(value, index) of selecedtDate" :key="index" :index="index + ''">
          <template slot="title">
            <el-checkbox
              v-model="value.check"
              class="my-checkbox"
              @click.stop.native="()=>{}"
              @change="changeCheckboxHandler(index)"
            ></el-checkbox>
            <span>{{ value.name }}</span>
            <span v-if="value.innerText">{{ value.innerText }}</span>
          </template>
          <el-menu-item
            :index="index + '-' + ind"
            v-for="(item, ind) of value.children"
            :key="ind"
            @click="menuItemClickHandler(item,value.fieldAliases)"
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
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "custom-document",
  data() {
    return {
      queryValue: undefined,
      tabsMenuData: [],
      selecedtDate: []
    };
  },
  computed: {
    ...mapState({
      xmMenu: state => state.xmMenu
    })
  },
  watch: {
    xmMenu(n, o) {
      this.tabsMenuData = n;
    }
  },
  created() {
    this.xmMenu.length &&
      (this.tabsMenuData = [...this.xmMenu]) &&
      (this.selecedtDate = [...this.xmMenu]);
  },
  mounted() {
    this.eventRegister();
  },
  methods: {
    eventRegister() {},
    goVideo(item) {
      window.open("http://120.199.110.111:8989/SPJK/spjkwcj/demo1.html");
    },
    changeCheckboxHandler(parentIndex, childrenIndex) {
      const currentMenu = this.selecedtDate;
      let parentCheck = currentMenu[parentIndex].check;
      this.$set(currentMenu[parentIndex], "check", parentCheck);
      this.$hub.$emit("document-checkbox", currentMenu[parentIndex]);
    },
    // 单独点击一个侧目录的子项
    menuItemClickHandler(obj, fieldAliases) {
      this.$hub.$emit("menu-item-click", { obj, fieldAliases });
    },
    // 查询
    query() {
      // this.$hub.$emit("query-handler", this.queryValue);
      const selecedtDate = []; //每一次搜索完清空数据
      var reg = new RegExp(this.queryValue); //匹配
      let resultMenu = selecedtDate; //新建一个菜单数组
      this.xmMenu.forEach(Element => {
        let regData = []; //新建一个匹配数据数组
        Element.children.map(item => {
          if (item.name.match(reg)) {
            regData.push(item);
          }
        });
        resultMenu.push({
          check: Element["check"],
          children: regData,
          innerText: "(" + regData.length + ")",
          name: Element["name"]
        });
      });
      this.selecedtDate = [...selecedtDate];
    }
  }
};
</script>
<style scoped>
.custom-document {
  top: 120px !important;
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
.custom-document-content > .my-menu {
  top: 80px;
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
  position: relative;
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