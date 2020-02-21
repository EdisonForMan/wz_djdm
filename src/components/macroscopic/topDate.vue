<template>
  <div class="topDateDiv">
    <ul>
      <li>
        <h3 style="color:#ff283a">{{SHI_QU_DATA.QZ}}人</h3>
        <i>今日{{ SHI_QU_DATA.QZXZ }}</i>
        <p>确诊病例</p>
      </li>
      <li>
        <h3 style="color:#fcc659">{{SHI_QU_DATA.ZZ}}人</h3>
        <i>今日{{ SHI_QU_DATA.ZZXZ }}</i>
        <p>重症病例</p>
      </li>
      <li>
        <h3 style="color:#f6e31b">{{SHI_QU_DATA.CY}}人</h3>
        <i>今日{{ SHI_QU_DATA.CYXZ }}</i>
        <p>出院</p>
      </li>
      <li>
        <h3 style="color:#1eff95">{{SHI_QU_DATA.SW}}人</h3>
        <i>今日{{ SHI_QU_DATA.SWXZ }}</i>
        <p>死亡</p>
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
  width: 5%;
  margin: auto;
  display: inline-block;
  background-color: #1b45a7;
  border: 1px solid #07e2e8;
  margin-left: 10px;
  padding: 5px 9px;
  color: #07e2e8;
  i {
    font-style: normal;
    font-size: 12px;
    color: #fff;
  }
}
</style>