<template>
  <div class="fgimg">
    <div>
      <img :src="image1" @click="goPicture" />
    </div>
    <div>
      <img :src="image2" @click="goPicture" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image1: require("./img/yqImgleft.jpg"),
      image2: require("./img/yqImgright.jpg")
    };
  },
  methods: {
    goPicture() {
      window.open("http://172.20.89.88:5001/yq/icon/demo.jpg");
    }
  }
};
</script>

<style lang="less" scoped>
.fgimg {
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