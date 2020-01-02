<template>
  <div id="app">
    {{count}}
    <br>
    {{dblCount}}
    <button @click="$store.commit('increment')">点我</button>
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: 'app',
  computed: {
    count() {
      return this.$store.state.count
    },
    dblCount() {
      return this.$store.getters.dblCount;
    }
  }
}
</script>

<style>
</style>
