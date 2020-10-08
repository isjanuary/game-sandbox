<template>
  <div>
    <router-link to="/" class="top-right-corner">go back</router-link>
    <div>弹射小车游戏</div>
    <div class="content-wrapper">
      <div
        class="game-area-ref game-bg"
        @dragover="handleDragOver"
        @drop="handleDrop"
      >
        <div
          class="car"
          draggable
          @click="handleClickCar"
          @dragstart="handleDragStart"
          @drag="handleDragging"
          @dragend="handleDragEnd"
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
    handleDragging() {
      // console.log('evt: ', evt)
      // if (this.timeout) return
      // this.timeout = setTimeout(() => {
      //   clearTimeout(this.timeout)
      //   this.timeout = null
      // }, 100)
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
    }
  },
  mounted() {
    const car = document.getElementById('car')
    console.log(car.getBoundingClientRect())
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
