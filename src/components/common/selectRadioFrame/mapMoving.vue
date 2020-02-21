<template>
  <div
    id="pic"
    v-if="url"
    class="backIcon"
    draggable="true"
    @dragstart="down($event)"
    @dragend="end($event)"
    @dragover="move($event)"
  >
    <span class="cirle">
      <span @click="isShow">
        <i class="iconfont icondingwei"></i>
      </span>
    </span>
    <ul class="menu" v-show="show">
      <li v-for="item in items" :key="item" @click="change(item)">{{item}}</li>
    </ul>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      url: true,
      show: false,
      position: { x: 0, y: 0 },
      cx: "",
      cy: "",
      x: "",
      y: "",
      l: "",
      t: "",
      r: "",
      b: "",
      items: ["地形图", "历史影像", "空间查询"]
    };
  },
  components: {},
  props: {},
  created() {},
  mounted() {
    let moveDiv = document.querySelector("#pic");
    this.w = document.documentElement.clientWidth || document.body.clientWidth;
    this.h =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.x = moveDiv.offsetWidth;
    this.y = moveDiv.offsetHeight;
    //使用二级事件绑定，解决浏览器警告，可自行查询
    moveDiv.addEventListener("touchstart", this.down, { passive: false });
    moveDiv.addEventListener("touchmove", this.move, { passive: false });
    moveDiv.addEventListener("touchend", this.end, { passive: false });
    //可移动边界判断
    this.l = moveDiv.offsetLeft;
    this.t = moveDiv.offsetTop;
    this.r = this.w - this.l - this.x;
    this.b = this.h - this.t - this.y;
    // console.log(this.t,"=========t")
  },
  computed: {},
  methods: {
    down(event) {
      let moveDiv = document.querySelector("#pic");
      this.position.x = moveDiv.offsetLeft;
      this.position.y = moveDiv.offsetTop;
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      //光标起始位置
      this.cx = touch.clientX;
      this.cy = touch.clientY;
    },
    move(event) {
      let moveDiv = document.querySelector("#pic");
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      event.preventDefault(); //阻止body滚动
      //光标偏移量
      this.curx = touch.clientX - this.cx;
      this.cury = touch.clientY - this.cy;
      //DOM 运动边界判断
      if (this.curx > 0) {
        //向右
        this.curx = Math.abs(this.curx) > this.r ? this.r : this.curx;
      } else {
        //向左
        this.curx = Math.abs(this.curx) > this.l ? -this.l : this.curx;
      }
      if (this.cury > 0) {
        //向下
        this.cury = Math.abs(this.cury) > this.b ? this.b : this.cury;
      } else {
        //向上
        this.cury = Math.abs(this.cury) > this.t ? -this.t : this.cury;
      }
      //DOM 运动
      moveDiv.style.transform = `translate(${this.curx}px,${this.cury}px)`;
    },
    end() {
      let moveDiv = document.querySelector("#pic");
      if (moveDiv.style.transform != "") {
        //光标松开,记录盒子的位移。
        let aa = parseInt(moveDiv.style.transform.match(/(-?\d+\.?\d+)/g)[0]); //获取X偏移量
        let bb = parseInt(moveDiv.style.transform.match(/(-?\d+\.?\d+)/g)[1]); //获取Y偏移量
        let ax = parseInt(this.position.x) + aa; //DOMX轴偏移量
        let by = parseInt(this.position.y) + bb; //DOMY轴偏移量
        // 处理吸边
        //ax = ax>this.w/2?this.w-this.x:0;
        //end 时，重绘DOM位置，并清空transform的值。
        moveDiv.style.left = ax + "px";
        moveDiv.style.top = by + "px";
        moveDiv.style.transform = "";
        //可移动边界判断
        this.l = ax;
        this.t = by;
        this.r = this.w - this.l - this.x;
        this.b = this.h - this.t - this.y;
      }
    },
    isShow() {
      this.show = !this.show;
    },
    change(item) {
      this.$parent.changemapMoving(item);
    }
  }
};
</script>
<style lang="less">
.backIcon {
  display: block;
  position: fixed;
  z-index: 999;
  width: 10%;
  touch-action: none;
  > span:first-child {
    float: left;
  }
}
.cirle {
  border-radius: 50%;
  height: 45px;
  width: 45px;
  display: inline-block;
  background: rgb(98, 201, 243);
  vertical-align: top;
  > span {
    display: block;
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 40px;
    line-height: 40px;
    cursor: all-scroll;
    i {
      font-size: 28px;
    }
  }
}
.menu {
  width: 100%;
  box-sizing: border-box;
  padding-left: 45px;
  > li {
    height: 30px;
    background-color: #4139d0;
    line-height: 30px;
    cursor: context-menu;
  }
}
</style>

