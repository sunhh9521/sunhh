<template>
  <div>
    <div class="outer">
      <h3>父组件</h3>
      <component-a></component-a>
      <component-b></component-b>
    </div>
    <div class="outer">
      <h3>父组件（map写法）</h3>
      <ComponentMapA></ComponentMapA>
      <ComponentMapB></ComponentMapB>
    </div>
    <div class="outer">
      <h3>父组件（map+helper写法）</h3>
      <ComponentMapHelperA></ComponentMapHelperA>
      <ComponentMapHelperB></ComponentMapHelperB>
    </div>
  </div>
</template>
 
<script>
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import ComponentMapA from "./ComponentMapA";
import ComponentMapB from "./ComponentMapB";
import ComponentMapHelperA from "./ComponentMapHelperA";
import ComponentMapHelperB from "./ComponentMapHelperB";
 
export default {
  name: 'Parent',
  components: {ComponentA, ComponentB, ComponentMapA, ComponentMapB, ComponentMapHelperA, ComponentMapHelperB},
}
</script>
 
<style scoped>
.outer {
  margin: 20px;
  border: 2px solid red;
  padding: 20px;
}
</style>