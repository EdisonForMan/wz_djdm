<template>
  <div class="map_content">
    <div v-for="(item,index) in items" :key="index">
      <input type="checkbox" v-model="item.check" @click="toggleBox(item)" @change="change" />
      <span>{{item.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { name: "产业布局图", check: false },
        { name: "产业热力图", check: false },
        { name: "产业聚合图", check: false }
      ]
    };
  },
  components: {},
  props: {},
  created() {},
  mounted() {},
  computed: {},
  methods: {
    toggleBox(item) {
      item.check = !item.check;
    },
    change() {
      this.$parent.changeleftcheckBox(this.items);
    }
  }
};
</script>
<style scoped>
.map_content {
  height: 3%;
}
.map_content div {
  width: 33%;
  padding-top: 2%;
}
.map_content span {
  color: #fff;
  font-size: 13px;
  margin-left: 5px;
}
</style>

