<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
/*
 * Root component
 */
export default {
  components: {
    Hello
  },
  mame: 'app'
}
</script>

<style></style>
