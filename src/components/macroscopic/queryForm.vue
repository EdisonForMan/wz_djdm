<template>
<div class="form" v-if="list.length">
  <head>
    <span class="title">空间查询结果</span>
    <span id="close" @click="()=>{list = []}">x</span>
  </head>
  <div>
    <div class="list">
      <div v-for="(item,index) in list" :key="index" v-if="item.value && item.value.length">
        <div class="type">{{item.type}}</div>
        <ul v-if="item.type != '集中隔离点'">
          <li v-for="(_item,_index) in item.value" :key="_index" @click="goLocation(_item)">
            <span>{{++_index}}. {{_item.attributes.Name?_item.attributes.Name.slice(0,1):(_item.attributes.NAME?_item.attributes.NAME.slice(0,1):null)}}**, {{_item.attributes.Country}}</span>
          </li>
        </ul>

        <ul v-else>
          <li v-for="(_item,_index) in item.value" :key="_index" @click="goLocation(_item)">
            <span>{{++_index}}. {{_item.attributes.Name}}, {{_item.attributes.Country}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: "queryForm",
  data() {
    return {
      title: "",
      list: []
    };
  },
  mounted() {},
  methods: {
    goLocation(item) {
      // console.log(item);
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  position: absolute;
  width: 400px;
  height: 580px;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 20;
  top: 0;
  margin: auto;
  left: 360px;
  bottom: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  head {
    display: block;
    box-sizing: border-box;
    padding: 5px;
    height: 40px;
    font-size: 20px;

    .title {
      margin-left: 17px;
    }
  }
  #close {
    float: right;
    padding: 0px 5px;
    font-size: 17px;
    cursor: pointer;
  }

  > div {
    flex: 1;
    .list {
      height: 530px;
      overflow: auto;
      text-align: left;

      div .type {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 17px;
        font-weight: bolder;
      }

      ul {
        li {
          padding: 10px 0;
          background: #122960;
          text-align: left;
          padding-left: 15px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        li:nth-child(even) {
          background: #081942;
        }
      }
    }
    .list::-webkit-scrollbar {
      display: block;
      width: 6px;
      background-color: rgb(50, 95, 245);
      border-radius: 3px;
    }
    .list::-webkit-scrollbar-thumb {
      width: 6px;
      background-color: rgb(32, 28, 243);
      border-radius: 3px;
    }
  }
}
</style>