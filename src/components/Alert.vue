<template>
  <div class="alert" :class="typeCls">
    <p class="alert-content">{{ content }}</p>
    <span class="alert-close" @click="close">x</span>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['content', 'type'],
  data(){
    return {
      isClose: false,
      // info: this.content
    }
  },
  computed: {
    typeCls: function(){
      return 'alert-' + this.type
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
    opacity: 0.7;
    padding: 10px 15px;
    border-radius: 3px;
    position: relative;
    margin: 10px 0 20px;
  }
  .alert-content {
    margin: 0;
  }
  .alert-close {
    position: absolute;
    right: 8px;
    top: 3px;
    font-size: 14px;
    cursor: pointer;
    color: #778087;
    opacity: 0.2;
    font-weight: 700;
    filter: alpha(opacity=20);
  }
  .alert-error {
    color: #c30000;
    background: #f2dede;
  }
</style>

