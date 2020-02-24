<template>
  <div class="yqimg">
    <div>
      <img :src="image1" @click="goPicture(image1)" />
    </div>
    <div>
      <img :src="image2" @click="goPicture(image2)" />
    </div>
  </div>
</template>

<script>
import { SERVER } from "../config/index";
export default {
  data() {
    return {
      image1: `${SERVER}/icon/yqImgleft.jpg`,
      image2: `${SERVER}/icon/yqImgright.jpg`
    };
  },
  methods: {
    goPicture(url) {
      window.open(url);
    }
  }
};
</script>

<style lang="less" scoped>
.yqimg {
  height: 100%;
  width: 100%;
  > div {
    display: inline-block;
    width: 49.9%;
    float: left;
    height: 100%;
    position: relative;
    > img {
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>