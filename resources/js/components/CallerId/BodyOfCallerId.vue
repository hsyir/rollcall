<template>
  <div class="crm-caller-id container px-2 pb-1 mb-1" @mouseenter="running=false" @mouseleave="running=true" @click="fixIt">
    <div class="">
      <button class="close" @click="close">
        X
      </button>
    </div>
    <div class="row p-2">
      <div class="col-3 bg-info text-center">
        <span class="bg-info rounded-circle d-inline-block" ></span>
      </div>
      <div class="col-9">
        <div>{{ item.data.participant}}</div>
        <div>{{ item.data.contact.person.firstname}}</div>
        <div class="pt-2">
          <a href="#" class="btn btn-sm btn-outline-secondary">کلید یک</a>
          <a href="#" class="btn btn-sm btn-outline-secondary">کلید دو</a>
        </div>
      </div>
    </div>
    <progress-bar :fixed="fixed" :running="running" @finish="close" />
  </div>
</template>
<script>

import ProgressBar from './ProgressBar'

export default {
  name: 'BodyOfCallerId',
  components: { ProgressBar },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data: function () {
    return {
      running: true,
      fixed: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    fixIt () {
      this.fixed = true
    }
  }
}
</script>

<style lang="scss">
.crm-caller-id {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  border: 1px solid #b3b1b1;
  .close{
    width: 10px;
    font-size: 10px;
    border: 0;
  }
}
</style>
