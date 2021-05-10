<template>
  <div class="shelf-details-page">
     <div class="row">
      <button title="Create New Item"
              type="button"
              class="btn btn-outline-dark btn-lg m-3"
              data-toggle="modal"
              data-target="#new-item-form"
      >
        <!-- v-if="state.user.isAuthenticated" -->
        <span> Add Item
          {{ state.items.title }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
export default {
  name: 'ShelfDetailsPage',
  setup() {
    const state = reactive({
      items: computed(() => AppState.items)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
