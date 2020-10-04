<template>
  <div>
    <router-link class="top-right-corner" to="/">go back</router-link>
    <h3>canvas 测试区域</h3>
    <canvas class="canvas-preset"></canvas>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.canvas-preset {
  width: 1000px;
  height: 700px;
  background-color: #F1F1F1;
}
.top-right-corner {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
