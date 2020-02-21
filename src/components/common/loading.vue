<template>
  <div class="loadingFrame">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: "loading"
};
</script>

<style>
.loadingFrame{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.3);
    top: 0;
    left: 0;
}
.loading {
  margin: 100px auto;
  width: 100px;
  height: 100px;
  border: 10px solid #333333;
  border-bottom: #aaa 10px solid;
  border-radius: 50%;
  animation: load 1.1s infinite linear;
  -webkit-animation: load 1.1s infinite linear;
  -moz-animation: load 1.1s infinite linear;
  -o-animation: load 1.1s infinite linear;
}
@keyframes load {
  from {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
  }
}
@-webkit-keyframes load {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes load {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-o-keyframes load {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(360deg);
  }
}
</style>