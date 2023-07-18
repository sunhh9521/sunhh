<template>
  <div class="container">
    <h3>ComponentA</h3>
    <button @click="incrementCounter">计数器加1</button>
    <button @click="asyncIncrementCounter">计数器异步加1</button>
  </div>
</template>
 
<script>
export default {
  methods: {
    incrementCounter() {
      this.$store.commit('counter/increment')
    },
    asyncIncrementCounter() {
      this.$store.dispatch('counter/asyncIncrement')
    },
  }
}
</script>
 
<style scoped>
.container {
  margin: 20px;
  border: 2px solid blue;
  padding: 20px;
}
</style>