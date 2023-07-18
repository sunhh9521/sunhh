<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <TplDemo/> -->
    <!-- <ConditionDemo/> -->
    <!-- <EventDemo/> -->

    <!-- <ComponentDemo/> -->

    <AdvancedUse/>

    <!-- <CartDemo/> -->
    <!-- <WatchDemo/> -->
    <!-- <ListDemo/> -->
    <!-- <FormDemo/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// import TplDemo from './components/BaseUse/TplDemo'
// import ComputedDemo from './components/BaseUse/ComputedDemo'
// import WatchDemo from './components/BaseUse/WatchDemo'
// import ListDemo from './components/BaseUse/ListDemo'
// import ConditionDemo from './components/BaseUse/ConditionDemo'
// import FormDemo from './components/BaseUse/FormDemo'
// import EventDemo from './components/BaseUse/EventDemo'

// import ComponentDemo from './components/ComponentsDemo/index'

import AdvancedUse from './components/AdvancedUse/index'



// import CartDemo from './components/Cart/index'

export default {
  name: 'app',
  components: {
    // ComputedDemo
    // WatchDemo
    // ListDemo
    // HelloWorld
    // EventDemo
    // ComponentDemo
    AdvancedUse
    // CartDemo
    // FormDemo
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
