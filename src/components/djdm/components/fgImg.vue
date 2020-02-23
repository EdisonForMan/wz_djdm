<template>
  <div class="fgimg">
    <div>
      <img :src="image" @click="goPicture" />
    </div>
    <div>
      <img :src="image" @click="goPicture" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: require("./img/demo.jpg")
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