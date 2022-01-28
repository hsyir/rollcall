<template>
  <div class="progress-timer">
    <span :style="animateStyle"></span>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    running: {
      type: Boolean
    },
    fixed: {
      type: Boolean
    },
    duration: {
      type: Number,
      default: 10
    }
  },
  computed: {
    animateStyle () {
      return {
        animation: `progressBarCountDown forwards linear ${this.duration}s`
      }
    }
  },
  watch: {
    running: function (running) {
      const status = running ? 'running' : 'paused'
      $(this.$el).find('span').css('animation-play-state', status)
    },
    fixed: function (fixed) {
      $(this.$el).find('span').slideUp(200)
    }
  },
  mounted () {
    const vm = this
    $(vm.$el).find('span').on('animationend', x => {
      if (!vm.fixed) {
        vm.$emit('finish')
      }
    })
  }
}
</script>

<style scoped lang="scss">
.progress-timer {
  height: 2px;
  margin-top: 10px;
  margin-bottom: -5px;

  span {
    height: 100%;
    width: 100%;
    display: inline-block;
    background-color: #e77119;
    float: left;
  }
}
</style>
<style>

@keyframes progressBarCountDown {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
