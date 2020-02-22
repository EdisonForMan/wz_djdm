<template>
  <div class="topDateDiv">
    <ul>
      <li>
        <p>总工地数</p>
        <h3 style="color:#FF835F">{{SHI_QU_DATA.QZ}}</h3>
      </li>
      <li>
        <p>复工工地数</p>
        <h3 style="color:#54FFA6">{{SHI_QU_DATA.ZZ}}</h3>
      </li>
      <li>
        <p>总人数</p>
        <h3 style="color:#BD70FF">{{SHI_QU_DATA.CY}}</h3>
      </li>
      <li>
        <p>已在温人数</p>
        <h3 style="color:#FF4D7A">{{SHI_QU_DATA.SW}}</h3>
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
  width: 120px;
  margin: auto;
  display: inline-block;
  background-color: #1b45a7;
  border: 1px solid #07e2e8;
  margin-left: 20px;
  padding: 15px 10px;
  color: #07e2e8;
  i {
    font-style: normal;
    font-size: 12px;
    color: #fff;
  }
  p {
    font-size: 18px;
    background: linear-gradient(180deg, rgba(54,220,255,1) 0%, rgba(140,234,255,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: PingFangSC-Medium,PingFang SC;
    margin-bottom: 7px;
  }
  h3 {
    font-size: 20px;
  }
}
</style>