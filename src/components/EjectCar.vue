<template>
  <div>
    <router-link to="/" class="top-right-corner">go back</router-link>
    <div>弹射小车游戏</div>
    <div class="d-flex">
      <div class="game-area-ref game-bg">
        <div class="car">
          <img class="" src="/static/game-car.png" alt="">
        </div>
        <!-- <div class="arrow">
          <img class="pull-arrow" src="/static/game-down-arrow.png" alt="">
        </div> -->
      </div>
      <div class="game-area-ref" style="margin-left: 100px;">
        <img style="width: 100%; height: 100%;" src="/static/game-overview-2.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.top-right-corner {
  position: absolute;
  top: 20px;
  right: 20px;
}
.game-area-ref {
  position: relative;
  border: 1px solid red;

  width: 400px;
  height: 600px;
}
.game-area-ref img {
  height: 100%;
  width: 100%;
}
.game-area-ref.game-bg {
  background-image: url('/static/game-bg.png');
  background-size: 100%;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
}

.d-flex {
  display: flex;
}
</style>
