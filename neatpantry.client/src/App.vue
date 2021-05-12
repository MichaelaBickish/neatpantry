<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="sr-ignore">
      <AddShelfModalComponent />
      <AddItemModalComponent />
    </div>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
