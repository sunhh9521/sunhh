<template>
  <div class="container">
    <h3>ComponentB</h3>
    <div>计数器的值：{{ count }}</div>
    <div>计数器的2倍：{{ doubleCount }}</div>
  </div>
</template>
 
<script>
import {mapState, mapGetters} from 'vuex'
 
export default {
  computed: {
    ...mapState('counter', ['count', 'info']),
    ...mapGetters('counter', ['doubleCount'])
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