<template>
  <div class="topDateDiv">
    <ul>
      <li>
        <p>总工地数</p>
        <h3 style="color:#ff283a">{{SHI_QU_DATA.QZ}}</h3>
      </li>
      <li>
        <p>复工工地数</p>
        <h3 style="color:#fcc659">{{SHI_QU_DATA.ZZ}}</h3>
      </li>
      <li>
        <p>总人数</p>
        <h3 style="color:#f6e31b">{{SHI_QU_DATA.CY}}</h3>
      </li>
      <li>
        <p>已在温人数</p>
        <h3 style="color:#1eff95">{{SHI_QU_DATA.SW}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { SHI_QU_DATA: window.SHI_QU_DATA };
  }
};
</script>

<style lang="less" scoped>
.topDateDiv {
  position: absolute;
  top: 50px;
  width: 100%;
}
.topDateDiv ul li {
  width: 100px;
  margin: auto;
  display: inline-block;
  background-color: #1b45a7;
  border: 1px solid #07e2e8;
  margin-left: 10px;
  padding: 10px 10px;
  color: #07e2e8;
  i {
    font-style: normal;
    font-size: 12px;
    color: #fff;
  }
}
</style>