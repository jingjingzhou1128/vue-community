<template>
  <div class="alert">
    <p class="alert-content">{{ content }}</p>
    <span class="alert-close" @click="close">x</span>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['content'],
  data(){
    return {
      isClose: false
    }
  },
  methods: {
    close(){
      // this.isClose = true
      this.$emit('hidden')
    }
  }
}
</script>

<style>
  .alert {
    background: #f5b0b0;
    opacity: 0.7;
    padding: 10px 15px;
    border-radius: 3px;
    color: #fff;
    position: relative;
  }
  .alert-close {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>

