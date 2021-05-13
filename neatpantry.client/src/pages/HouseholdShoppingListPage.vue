<template>
  <div class="household-shopping-list-page container-fluid">
    <div class="row">
      <div class="col text-center">
        <h1>Shopping List</h1>
      </div>
    </div>
    <!-- Add Item -->
    <div class="row mb-2 mb-md-5">
      <div class="col">
        <button title="Create New Item"
                type="button"
                class="btn btn-outline-dark btn-lg m-3"
                data-toggle="modal"
                data-target="#new-item-form-on-shopping-page"
        >
          <span> Add Item
          </span>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="row mb-2 mb-md-5 justify-content-center">
      <div class="col-12 col-md-10 d-flex justify-content-center table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox"
                       class="check-all-checkbox cursor-pointer"
                       id="check-all-box"
                       name="check-all-box"
                       title="Check All Items"
                       @click="toggleCheck"
                >
              </th>
              <th scope="col">
                Item
              </th>
              <th scope="col">
                Added By
              </th>
              <th scope="col">
                Quantity
              </th>
              <th scope="col">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- inject component -->
            <ShoppingListItemComponent v-for="item in state.shoppingListItems" :key="item.id" :item="item" />
            <!-- inject component -->
          </tbody>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col d-flex justify-content-center">
        <button title="Mark Checked Items As Purchased and Send to Shelves"
                type="button"
                class="btn btn-outline-dark btn-lg m-3"
                @click="purchaseItems"
        >
          <span><b>Purchased!</b> <br> Clear checked items and update items on shelves.</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { shoppingListItemsService } from '../services/ShoppingListItemsService'
import { onMounted, reactive, computed } from 'vue'
import { shelvesService } from '../services/ShelvesService'
import { useRoute } from 'vue-router'
export default {
  name: 'HouseholdShoppingListPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      shoppingListItems: computed(() => AppState.shoppingListItems)
    })
    onMounted(async() => {
      try {
        await shelvesService.getShelvesByHouseholdId(route.params.id)
        await shoppingListItemsService.getAllShoppingListItems()
      } catch (error) {
        Notification.toast('Error: ', error, 'error')
      }
    })
    return {
      route,
      state,
      async toggleCheck(shoppingListItems) {
        try {
          await shoppingListItemsService.toggleCheck()
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async newShoppingListItem() {
        try {
          await shoppingListItemsService.newShoppingListItem()
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
      // async deleteListItem() {
      //   try {

      //   } catch (error) {
      //     Notification.toast('Error: ' + error, 'error')
      //   }
      // },
      // async purchaseItems() {
      //   try {

      //   } catch (error) {
      //     Notification.toast('Error: ' + error, 'error')
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.cursor-pointer{
    cursor: pointer;
  }

</style>
