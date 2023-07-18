<template>
  <div class="container">
    <h3>ComponentB</h3>
    <div>计数器的值：{{ count }}</div>
    <div>计数器的2倍：{{ doubleCount }}</div>
  </div>
</template>
 
<script>
import { createNamespacedHelpers } from 'vuex'
 
const {mapState, mapGetters} = createNamespacedHelpers('counter');
 
export default {
  computed: {
    ...mapState(['count', 'info']),
    ...mapGetters(['doubleCount'])
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