<template>
  <div class="rightRadioFrame">
    <div class="rightRadioFrame_radio">
      <span v-for="(item,index) in this.forceOne.radio" :key="index">
        <input type="radio" :id="item.label" :value="item.label" v-model="forceRadio" />
        <label :for="item.label">{{item.label}}</label>
      </span>
    </div>
    <ul class="rightRadioFrame_list" v-if="echarts">
      <li v-for="(item,index) in list" :key="index">
        <span>{{item.name}}</span>
        <span>
          <i :style="{width:`${(item.value)/2}%`}"></i>
          <i>{{item.value}}</i>
        </span>
      </li>
    </ul>
    <ul class="rightRadioFrame_list" v-else>
      <li v-for="(item,index) in list" :key="index">
        <span>{{item.name}}</span>
        <div>
          <div id="jdt">
            <span
              :style="{width:`${(item.value*100/item.target)}%`}"
            >完成数:{{item.value}}</span>
          </div>
          <span>目标值:{{item.target}}</span>
          <span>完成率:{{(item.value*100/item.target).toFixed(2)}}%</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import echarts from "../echarts";
export default {
  name: "rightRadioFrame",
  data() {
    return {
      forceRadio: undefined,
      list: [],
      echarts: true
    };
  },
  components: {
    echarts
  },
  props: {
    forceOne: Object,
    id: String,
    tag: Boolean
  },
  created() {},
  mounted() {
    this.echarts = this.tag;
    this.forceRadio = this.forceOne.radio[0].label;
    this.list = this.forceOne.radio[0].list;
  },
  methods: {},
  watch: {
    forceOne(newVal, val) {
      this.forceRadio = newVal.radio[0].label;
      this.list = newVal.radio[0].list;
    },
    forceRadio(val, oldVal) {
      const that = this;
      if (that.forceOne.radio)
        that.forceOne.radio.map(item => {
          if (item.label === that.forceRadio) {
            if (item.label == "整治进度") {
              that.echarts = false;
            } else {
              that.echarts = true;
            }
            that.list = item.list;
          }
        });
    }
  }
};
</script>
 <style lang="less">
.rightRadioFrame {
  span {
    display: inline-block;
  }
  .rightRadioFrame_radio {
    padding: 10px 0px;
    text-align: left;
    > span {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding: 0 8px;
    }
  }
  .rightRadioFrame_list {
    width: 100%;
    height: 210px;
    box-sizing: border-box;
    padding: 0 0 0 10px;
    li {
      height: 30px;
      line-height: 30px;
      text-align: left;
      display: flex;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      span:first-child {
        width: 78px;
      }
      span:last-child {
        flex: 1;
        > i {
          display: inline-block;
          height: 18px;
          line-height: 18px;
          vertical-align: middle;
        }
        i:first-child {
          // width: 70%;
          background: linear-gradient(to right, #00bfff, #87ceeb);
          border-radius: 2px;
        }
      }
      div {
        display: flex;
        width: 83%;
        #jdt {
          width: 46%;
          background-color: #ccc;
          height: 79%;
          display: block;
          span {
            background: linear-gradient(to right, #00bfff, #87ceeb);
            border-radius: 2px;
            height: 100%;
            font-size: 14px;
            position: relative;
            top: -4px;
          }
        }
        span {
          color: #fff;
          background-color: unset !important;
          font-size: 15px;
        }
        span:first-child {
          width: 24%;
        }
      }
    }
  }
}
</style>



