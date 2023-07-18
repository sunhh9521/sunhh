<template>
  <div class="container">
    <h3>ComponentA</h3>
    <button @click="increment">计数器加1</button>
    <button @click="asyncIncrement">计数器异步加1</button>
  </div>
</template>
 
<script>
import {createNamespacedHelpers} from "vuex";
 
const {mapMutations, mapActions} = createNamespacedHelpers('counter');
export default {
  methods: {
    ...mapMutations(["increment", "decrement"]),
    ...mapActions(["asyncIncrement"])
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