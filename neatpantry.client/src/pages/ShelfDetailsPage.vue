<template>
  <div class="shelf-details-page container-fluid">
    <div class="row" v-if="state.activeShelf">
      <h1 class="ml-3">
        {{ state.activeShelf.title }}
      </h1>
    </div>
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
    <div class="row itemComponentRow">
      <div class="col-md-12">
        <ItemComponent v-for="item in state.items" :key="item.id" :item="item" />
      </div>
    </div>
    <div class="row">
      <button type="button" class="btn btn-outline-dark text-danger m-4">
        Delete Shelf
      </button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { itemsService } from '../services/ItemsService'
import { useRoute } from 'vue-router'
export default {
  name: 'ShelfDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      items: computed(() => AppState.items),
      activeShelf: computed(() => AppState.activeShelf)
    })
    onMounted(async() => {
      try {
        await itemsService.activeShelf(route.params.id)
        await itemsService.getItemsByShelfId(route.params.id)
      } catch (error) {

      }
    })
    return {
      state,
      route
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.itemComponentRow{
min-height: 65vh;
}
</style>
