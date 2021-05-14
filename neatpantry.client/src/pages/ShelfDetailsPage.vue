<template>
  <div class="shelf-details-page container-fluid">
    <div class="row" v-if="state.activeShelf">
      <!-- TODO mark to teach on contenteditable concept -->
      <div contenteditable="true" id="contenteditable" class="shelfTitle m2" @blur="saveEdits(state.activeShelf)">
        <h1 class="m-3">
          {{ state.activeShelf.title }}
        </h1>
      </div>
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
    <div class="row itemComponentRow" v-if="state.activeShelf">
      <div class="col-md-12">
        <ItemComponent v-for="item in state.items" :key="item.id" :item="item" />
      </div>
    </div>
    <div class="row">
      <button type="button" class="btn btn-outline-dark text-danger m-4" @click="deleteShelf(state.activeShelf)">
        Delete Shelf
      </button>
      <!-- <button type="button" class="btn btn-outline-dark text-warning m-4" @click="editShelf(state.activeShelf)">
        Edit Shelf
      </button> -->
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { itemsService } from '../services/ItemsService'
import { shelvesService } from '../services/ShelvesService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  name: 'ShelfDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      items: computed(() => AppState.items),
      activeShelf: computed(() => AppState.activeShelf),
      activeHousehold: computed(() => AppState.activeHousehold)
    })
    onMounted(async() => {
      try {
        await itemsService.activeShelf(route.params.id)
        await itemsService.getItemsByShelfId(route.params.id)
        await shelvesService.getShelvesByHouseholdId(state.activeShelf.householdId)
      } catch (error) {

      }
    })
    return {
      state,
      route,

      async deleteShelf() {
        try {
          // state.activeShelf.householdId = state.activeShelf
          if (await Notification.confirmAction()) {
            await shelvesService.deleteShelf(state.activeShelf)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async saveEdits() {
        try {
          if (await document.getElementById('contenteditable')) {
            await shelvesService.saveEdits(state.activeShelf)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
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
