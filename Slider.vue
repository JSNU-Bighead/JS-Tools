<template>
  <div class="wrapper">
    <div class="content" ref="content" @touchstart="start" @touchend="end">
      <slot name="content"></slot>
    </div>
    <div class="btns" ref="btns">
      <slot name="btns"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      distance: {
        type: Number,
        default: -60
      }
    },
    data() {
      return {
        startx: null,
        starty: null
      }
    },
    methods: {
      getAngle(angx, angy) {////获得方位角
        return Math.atan2(angy, angx) * 180 / Math.PI;
      },
      //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
      getDirection(startx, starty, endx, endy) {
        let angx = endx - startx;
        let angy = endy - starty;
        let result = 0;
        //如果滑动距离太短
        if (Math.abs(angx) < 10 && Math.abs(angy) < 10) {
          return result;
        }
        let angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
          result = 1;
        } else if (angle > 45 && angle < 135) {
          result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 3;
        } else if (angle >= -45 && angle <= 45) {
          result = 4;
        }
        return result;
      },
      start(e) {
        this.startx = e.touches[0].pageX;
        this.starty = e.touches[0].pageY;
      },
      end(e) {
        //方向事件
        let endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        let direction = this.getDirection(this.startx, this.starty, endx, endy);
        switch (direction) {
          case 0:
            if (e.target.contains(this.$el.querySelector('.mu-checkbox'))) break;
            this.$emit('_click', this.$el);
            break;
          case 1:
            this.$emit('up', this.$el)
            break;
          case 2:
            this.$emit('down', this.$el)
            break;
          case 3:
            this.slideLeft()
            break;
          case 4:
            this.slideRight()
            break;
          default:
        }
      },
      slideLeft() {
        this.$refs.content.style.transform = "translate(" + this.distance + "px)";
        this.$refs.content.style.transition = 'all .5s';
      },
      slideRight(rightnow) {
        if (rightnow) {
          this.$refs.content.style.transition = 'all 0s';
        } else {
          this.$refs.content.style.transition = 'all .5s';
        }
        this.$refs.content.style.transform = "translate(" + 0 + "px)";
      },
      touchend(event) {
        if (!this.$el.contains(event.target)) {
          this.slideRight();
        }
      }
    },
    mounted() {
      document.addEventListener('touchend', this.touchend)
    },
    beforeDestroy() {
      document.removeEventListener('touchend', this.touchend);
    }
  }
</script>
<style>
  .wrapper {
    width: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    border-bottom: 1px solid #eee;
  }

  .content {
    position: relative;
    background: #fff;
    z-index: 2;
  }

  .btns {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: right;
    z-index: 0;
  }
</style>