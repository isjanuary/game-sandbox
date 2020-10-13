<template>
  <div>
    <router-link to="/" class="top-right-corner">go back</router-link>
    <div>弹射小车游戏</div>
    <div class="content-wrapper">
      <div
        class="game-area-ref game-bg"
      >
        <div class="energy-bar"></div>
        <!-- <div
          class="car"
          draggable
          @dragstart="handleDragStart"
          @dragend="handleDragEnd"
          @touchstart="startTouch"
          @touchmove="moveTouch"
          @touchend="endTouch"
        > -->
        <div
          class="car"
          draggable
          @mousedown="handleMouseDown"
          @touchstart="startTouch"
          @touchmove="moveTouch"
          @touchend="endTouch"
        >
          <img id="car" class="game-car" src="/static/game-car.png" alt="">
        </div>
      
        <!-- 下拉箭头 -->
        <div class="arrow">
          <img class="pull-arrow" src="/static/game-down-arrow.png" alt="">
        </div>
      </div>
      <!-- <div class="game-area-ref" style="margin-left: 100px;">
        <img style="width: 100%; height: 100%;" src="/static/game-overview-2.png" alt="">
      </div> -->
    </div>
    <button @click="resetCarPos">reset</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeout: null,
      curr: {
        clientX: 0,
        clientY: 0
      },
      start: {
        clientX: 0,
        clientY: 0,
        timestamp: 0
      },
    }
  },
  methods: {
    handleClickCar() {
      console.log('car on click')
    },
    handleDragStart(evt) {
      // console.log('drag start: ', evt, evt.target)
      this.start.clientX = evt.clientX
      this.start.clientY = evt.clientY
      this.start.timestamp = Date.now()
    },
    handleDragEnd(evt) {
      clearTimeout(this.timeout)
      this.timeout = null
      const car = document.getElementById('car')
      console.log('drag end: ', evt.clientX, evt.clientY)
      // car.style.transform = ''
      const delta = {
        x: evt.clientX - this.start.clientX,
        y: evt.clientY - this.start.clientY
      }
      const next = {
        x: this.curr.clientX + delta.x,
        y: this.curr.clientY + delta.y
      }
      const duration = Date.now() - this.start.timestamp
      car.style.left = `${next.x}px`
      car.style.top = `${next.y}px`
      this.curr.clientX = next.x
      this.curr.clientY = next.y
      // car.style.transform = `translate(${evt.clientX - this.target.x}px, ${evt.clientY - this.target.y}px)`
      // car.style.transition = `transform 500ms  ease-in-out`
      console.log('duration:', duration)
    },
    resetCarPos() {
      const car = document.getElementById('car')
      car.style.top = '0px'
      car.style.left = '0px'
      this.curr.clientX = 0
      this.curr.clientY = 0
    },
    handleDragOver(evt) {
      if (this.timeout) return
      console.log('drag over: ', evt.clientX, evt.clientY)
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout)
        this.timeout = null
      }, 100)
    },
    handleDrop(evt) {
      console.log('on drop: ', evt)
      evt.preventDefault()
    },
    startTouch(evt) {
      console.log('start touch: ', evt)
      const el = document.getElementById('car')
      // disable horizontal movement
      // let startX = evt.touches[0].clientX
      let startY = evt.touches[0].clientY
      // let left = el.offsetLeft
      let top = el.offsetTop
      // TODO: use requestAnimationFrame here
      const move = evt => {
        if (this.timeout) return
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout)
          this.timeout = null
          // const deltaX = evt.touches[0].clientX - startX
          let deltaY = evt.touches[0].clientY - startY
          console.log('come in move:', evt.touches[0].clientY, startY, deltaY, el.offsetTop)
          if (deltaY < 0) {
            deltaY = 0
          }
          // el.style.left = `${left + deltaX}px`
          el.style.top = `${top + deltaY}px`
        }, 16)
      }
      document.addEventListener('touchmove', move)
      el.addEventListener('touchend', () => {
        console.log('on touch end: ')
        document.removeEventListener('touchmove', move)
        el.ontouchend = null
      })

      // // 如果不设置这段代码，会发生奇怪的现象，这是因为浏览器有自己的对图片和一些其他元素的拖放处理，会在我们拖放
      // // 时自动运行，这与我们的拖放处理产生了冲突
      // // ref: https://juejin.im/post/6844904158273765384
      el.ondragstart = function() {
        return false
      }
    },
    moveTouch() {
    },
    endTouch(evt) {
      console.log('end touch: ', evt)
    },
    handleMouseDown(evt) {
      const el = document.getElementById('car')
      let startX = evt.clientX
      let startY = evt.clientY
      let left = el.offsetLeft
      let top = el.offsetTop
      // TODO: use requestAnimationFrame here
      const move = evt => {
        if (this.timeout) return
        this.timeout = setTimeout(() => {
          console.log('come in move:', evt.clientX, evt.clientY)
          clearTimeout(this.timeout)
          this.timeout = null
          const X = evt.clientX - startX
          const Y = evt.clientY - startY
          el.style.left = `${left + X}px`
          el.style.top = `${top + Y}px`
        }, 16)
      }
      document.addEventListener('mousemove', move)
      el.addEventListener('mouseup', () => {
        console.log('on mouse up: ')
        document.removeEventListener('mousemove', move)
        el.onmouseup = null
      })

      // 如果不设置这段代码，会发生奇怪的现象，这是因为浏览器有自己的对图片和一些其他元素的拖放处理，会在我们拖放
      // 时自动运行，这与我们的拖放处理产生了冲突
      // ref: https://juejin.im/post/6844904158273765384
      el.ondragstart = function() {
        return false
      }
    }
  },
  mounted() {
    const car = document.getElementById('car')
    console.log(car.getBoundingClientRect())
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
  }
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
  // width: 540px;
  // height: 990px;
  width: 100%;
  height: 688px;

  &.game-bg {
    background-image: url('/static/game-bg.png');
    background-size: 100% 100%;
  }
  .car {
    position: absolute;
    height: 126px;
    width: 60px;
    left: 50%;
    top: 400px;
    transform: translateX(-50%);
    .game-car {
      position: absolute;
      top: 0px;
      left: 0px;
      cursor: move;
    }
  }
  .arrow {
    position: absolute;
    bottom: 130px;
    left: 50%;
    transform: translateX(-50%);
    height: 51px;
    width: 34px;
  }
  .energy-bar {
    width: 10px;
    height: 300px;
    position: absolute;
    left: 50px;
    top: 130px;
    background: linear-gradient(#FFBB00, #ddebad);
  }
}
.game-area-ref img {
  height: 100%;
  width: 100%;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
}

.d-flex {
  display: flex;
}

@media screen and (min-width: 576px) {
  .content-wrapper {
    display: flex;
  }
}
@media screen and (max-width: 576px) {
  .content-wrapper {
    display: block;
  }
}
</style>
