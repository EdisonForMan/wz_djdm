<template>
  <div class="hoverPanel">
    <div class="all">
      <div
        v-for="(item,key,index) in option"
        :key="index"
        :class="item.class"
        data-val="0"
        @click.stop="doMapTool(false,item.id,key)"
      >
        <div class="explainer" v-if="item.explainer">
          <span :class="`iconfont icon-${item.explainer.icon}`"></span>
          <div>{{item.explainer.name}}</div>
        </div>
        <div class="text hoverActive" @mouseenter="showList(item.name)" @mouseleave="onMouleave">
          <span :class="`iconfont icon-${item.icon}`" />
          <div>{{item.name}}</div>
          <div
            v-if="item.children && Object.keys(item.children).length"
            :class="`_float animated ${(item.name == showName && showlist)?`fadeIn`:`fadeOut`}`"
          >
            <span
              v-for="(_item,_key,_index) in item.children"
              :key="_index"
              data-val="1"
              @click.stop="doMapTool(true,_item.id,_key)"
            >{{_item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "hoverPanel",
  data() {
    return {
      option: [],
      showlist: false,
      showName: ""
    };
  },
  components: {},
  props: {
    mapTool: Object,
  },
  created() {
    this.option = this.$props.mapTool;
  },
  mounted() {},
  computed: {},
  watch: {
    mapTool: {
      handler(newVal, val) {
        this.option = newVal;
      },
      deep: true
    }
  },
  methods: {
    showList(name) {
      this.showName = name;
      this.showlist = true;
    },
    onMouleave() {
      this.showName = "";
      this.showlist = false;
    },
    doMapTool(bo, id, key) {
      const _option = JSON.parse(JSON.stringify(this.option));
      for (let d in _option) {
        if (!bo) {
          if (!Object.keys(_option[key].fun)) return;
          if (
            ~["vector", "25d", "images"].indexOf(_option[d].id) &&
            ["search", "tools"].indexOf(id) == -1
          ) {
            _option[d].check = false;
            for (let v in _option[d].children) {
              _option[d].children[v].check = false;
            }
          }
          if (_option[d].id && _option[d].id == id) {
            _option[d].check = !_option[d].check;
          }
        } else {
          for (let v in _option[d].children) {
            if (
              ~["vector", "25d", "images"].indexOf(_option[d].id) &&
              ["circle", "space", "distance", "clear"].indexOf(id) == -1
            ) {
              _option[d].children[v].check = false;
              //  特殊处理_25d设为false
              _option["_25d"].check = false;
              _option["vector"].check = false;
            }
            if (_option[d].children[v].id && _option[d].children[v].id == id) {
              _option[d].children[v].check = !_option[d].children[v].check;
            }
          }
        }
      }
      this.$parent.changeMapTool(_option);
    }
  }
};
</script>
<style lang="less">
.hoverPanel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  .iconfont {
    font-size: 22px;
    line-height: 26px;
  }
  .all {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-perspective: 10px;
    perspective: 10px;
    -webkit-transform: perspective(300px) rotateX(20deg);
    transform: perspective(300px) rotateX(20deg);
    will-change: perspective;
    -webkit-perspective-origin: center center;
    perspective-origin: center center;
    -webkit-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 30px;
  }
  .all:hover {
    -webkit-perspective: 1000px;
    perspective: 1000px;
    transition: all 0.5s ease-in;
    -webkit-transform: perspective(10000px) rotateX(0deg);
    transform: perspective(10000px) rotateX(0deg);
  }
  .all:hover .text {
    opacity: 1;
  }
  .all:hover > div {
    opacity: 1;
    transition-delay: 0s;
  }
  .all:hover .explainer {
    opacity: 0;
  }

  .left,
  .center,
  .right,
  .lefter,
  .righter {
    width: 120px;
    height: 60px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    opacity: 0;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    -webkit-transition-delay: 1s;
    transition-delay: 1s;
    position: relative;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: radial-gradient(circle at center top, #fff, #696969);
    cursor: pointer;
    background-blend-mode: color-burn;
  }
  .hoverActive {
    background-image: radial-gradient(
      circle at center top,
      #cce,
      #0097ff
    ) !important;
  }
  .hoverClear {
    background-image: radial-gradient(
      circle at center top,
      #cce,
      #0097ff
    ) !important;
  }
  .left:hover,
  .center:hover,
  .right:hover,
  .lefter:hover,
  .righter:hover {
    box-shadow: 0 0 30px 10px rgba(100, 100, 255, 0.5);
    background-color: #ccf;
  }
  .text {
    border-radius: 10px;
    opacity: 0;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    bottom: 0;
    position: absolute;
    will-change: transform;
    color: #fff;
    padding: 6px;
    text-align: center;
    width: 100%;
    height: 100%;
    > span:before {
      text-shadow: 0 0 5px rgba(100, 100, 255, 0.6);
    }
    > div {
      text-shadow: 0 0 5px rgba(100, 100, 255, 0.6);
    }
    .fadeIn,
    .fadeOut {
      animation-duration: 0.5s;
    }
    ._float {
      width: 100%;
      box-sizing: border-box;
      padding: 2px;
      background: radial-gradient(
        circle at center top,
        #cce,
        #696969
      ) !important;
      overflow: hidden;
      position: absolute;
      bottom: 58px;
      right: 1px;
      border-radius: 8px;
      border: 1px #fff solid;
      > span {
        display: block;
        width: 100%;
        height: 30px;
        line-height: 30px;
      }
      > span:hover {
        background: rgba(21, 48, 206, 0.5);
      }
    }
  }

  .lefter {
    -webkit-transform: translateX(-60px) translateZ(-50px) rotateY(-10deg);
    transform: translateX(-60px) translateZ(-50px) rotateY(-10deg);
  }

  .left {
    -webkit-transform: translateX(-30px) translateZ(-25px) rotateY(-5deg);
    transform: translateX(-30px) translateZ(-25px) rotateY(-5deg);
  }

  .center {
    opacity: 1;
  }

  .right {
    -webkit-transform: translateX(30px) translateZ(-25px) rotateY(5deg);
    transform: translateX(30px) translateZ(-25px) rotateY(5deg);
  }

  .righter {
    -webkit-transform: translateX(60px) translateZ(-50px) rotateY(10deg);
    transform: translateX(60px) translateZ(-50px) rotateY(10deg);
  }

  .explainer {
    color: #fff;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    width: 100%;
    height: 100%;
    background-color: #303050;
    background-image: radial-gradient(circle at center top, #cce, #0097ff);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 6px;
  }

  .ref {
    background-color: #000;
    background-image: linear-gradient(to bottom, #d80, #c00);
    border-radius: 3px;
    padding: 7px 10px;
    position: absolute;
    font-size: 16px;
    bottom: 10px;
    right: 10px;
    color: #fff;
    text-decoration: none;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  }
  .ref::first-letter {
    font-size: 12px;
  }
}
</style>

