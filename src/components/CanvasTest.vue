<template>
  <div>
    <router-link class="top-right-corner" to="/">go back</router-link>
    <h3>canvas 测试区域</h3>
    <canvas id="eject" class="canvas-preset"></canvas>
    <canvas id="canvas"></canvas>
    <!-- <img src="../assets/game-bg.png" alt="" id="img"> -->
  </div>
</template>

<script>
export default {
  methods: {
  },
  mounted() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('eject')
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.onload = drawImageActualSize
    // img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg'
    img.src = '/static/game-bg.png'
    function drawImageActualSize() {
      console.log(this)
      // Use the intrinsic size of image in CSS pixels for the canvas element
      canvas.width = this.naturalWidth / 3;
      canvas.height = this.naturalHeight / 3;

      // Will draw the image as 300x227, ignoring the custom size of 60x45
      // given in the constructor
      // ctx.drawImage(this, 0, 0);

      // To use the custom size we'll have to specify the scale parameters
      // using the element's width and height properties - lets draw one
      // on top in the corner:
      ctx.drawImage(this, 0, 0, this.width / 3, this.height / 3);
    }

    // const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');

    // const image = new Image(); // Using optional size for image
    // image.onload = drawImageActualSize; // Draw when image has loaded

    // // Load an image of intrinsic size 300x227 in CSS pixels
    // image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';

    // function drawImageActualSize() {
    //   console.log(this, this.naturalWidth, this.naturalHeight)
    //   // Use the intrinsic size of image in CSS pixels for the canvas element
    //   canvas.width = this.naturalWidth;
    //   canvas.height = this.naturalHeight;

    //   // Will draw the image as 300x227, ignoring the custom size of 60x45
    //   // given in the constructor
    //   ctx.drawImage(this, 0, 0);

    //   // To use the custom size we'll have to specify the scale parameters 
    //   // using the element's width and height properties - lets draw one 
    //   // on top in the corner:
    //   ctx.drawImage(this, 0, 0, this.width, this.height);
    // }
  }
}
</script>

<style scoped>
.canvas-preset {
  /* width: 700px;
  height: 2100px; */
  background-color: #F1F1F1;
}
.top-right-corner {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
