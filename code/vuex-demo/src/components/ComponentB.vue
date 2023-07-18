<template>
  <div class="container">
    <h3>ComponentB</h3>
    <div>计数器的值：{{thisCount}}</div>
    <div>计数器的2倍：{{thisDoubleCount}}</div>
  </div>
</template>
 
<script>
export default {
  computed:{
    thisCount() {
      return this.$store.state.counter.count;
    },
 
    thisDoubleCount() {
      return this.$store.getters["counter/doubleCount"];
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