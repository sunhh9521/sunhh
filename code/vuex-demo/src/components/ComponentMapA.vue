<template>
  <div class="container">
    <h3>ComponentA</h3>
    <button @click="increment">计数器加1</button>
    <button @click="asyncIncrement">计数器异步加1</button>
  </div>
</template>
 
<script>
import {mapMutations, mapActions} from 'vuex'
export default {
  methods: {
    ...mapMutations('counter', ["increment", "decrement"]),
    ...mapActions('counter', ["asyncIncrement"])
  }
}
</script>
 
<style scoped>
.container {
  margin: 20px;
  border: 2px solid blue;
  padding: 20px;
}