<template>
  <div>
    <router-link class="top-right-corner" to="/">go back</router-link>
    <h3>canvas 测试区域</h3>
    <canvas id="static-sin" width="800" height="500"></canvas>
    <canvas id="dynamic-sin"></canvas>
    <canvas id="eject" class="canvas-preset"></canvas>
    <!-- <img src="../assets/game-bg.png" alt="" id="img"> -->
  </div>
</template>

<script>
export default {
  methods: {
    drawRect() {
      let i = 0
      let startX = 20.5
      let startY = 20.5
      const draw = function() {
        /** @type {HTMLCanvasElement} */
        const canvas = document.getElementById('static-sin')
        const ctx = canvas.getContext('2d')
        ctx.strokeStyle = 'rgb(0, 0, 255)'
        ctx.clearRect(startX, startY - 1, 30, 30)
        startX += 2
        i++
        ctx.beginPath()
        ctx.rect(startX, startY, 20, 20)
        ctx.stroke()
        if (i < 200) {
          window.requestAnimationFrame(draw)
        }
      }

      window.requestAnimationFrame(draw)
    },
    drawSin() {
      let offset = 0
      let startX = 50
      let startY = 150
      // /** @type {HTMLCanvasElement} */
      // const canvas = document.getElementById('static-sin')
      // const ctx = canvas.getContext('2d')
      // ctx.strokeStyle = '#FF9000'
      // let y = 0
      // for (let i = 0; i < 360; i++) {
      //   y = 150 - 50 * Math.sin(i * Math.PI / 180)
      //   ctx.lineTo(i + 50, y)
      // }
      // ctx.moveTo(50, 150 - 50 * Math.sin(10 * Math.PI / 180))
      // for (let i = 0; i < 360; i++) {
      //   y = 150 - 50 * Math.sin((i + 10) * Math.PI / 180)
      //   ctx.lineTo(i + 50, y)
      // }
      // ctx.moveTo(50, 150 - 50 * Math.sin(20 * Math.PI / 180))
      // for (let i = 0; i < 360; i++) {
      //   y = 150 - 50 * Math.sin((i + 20) * Math.PI / 180)
      //   ctx.lineTo(i + 50, y)
      // }
      // ctx.stroke()

      const draw = function() {
        /** @type {HTMLCanvasElement} */
        const canvas = document.getElementById('static-sin')
        const ctx = canvas.getContext('2d')
        ctx.strokeStyle = '#FF9000'
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        startY = 150 - 50 * Math.sin(offset * Math.PI / 180)
        ctx.moveTo(50, startY)
        let y = 0
        ctx.beginPath()
        for (let j = 0; j < 512; j++) {
          y = 150 - 50 * Math.sin((offset + j) * Math.PI / 256)
          ctx.lineTo(50 + j, y)
        }
        ctx.stroke()
        offset += 2
        if (offset <= 512) {
          window.requestAnimationFrame(draw)
        } else {
          offset = 0
          window.requestAnimationFrame(draw)
        }
      }

      // draw()
      window.requestAnimationFrame(draw)
    }
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

    // this.drawRect()
    this.drawSin()

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

#static-sin {
  width: 800px;
  height: 500px;
  margin: 30px auto;
  border: 1px solid blue;
}
#dynamic-sin {}

canvas {
  display: block;
}
</style>
