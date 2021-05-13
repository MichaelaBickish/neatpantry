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
                Quantity
              </th>
              <th scope="col">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <input type="checkbox"
                       class="check-one-checkbox cursor-pointer"
                       id="check-one-box"
                       name="check-one-box"
                       title="Check This Item"
                >
              </th>
              <td>Peanut Butter</td>
              <td><input type="number" title="Enter Quantity" placeholder="#..." min="1" style="max-width:80px;"></td>
              <td><i class="fa fa-trash text-danger cursor-pointer" aria-hidden="true" title="Remove Item From Shopping List"></i></td>
            </tr>
            <tr>
              <th scope="row">
                <input type="checkbox"
                       class="check-one-checkbox cursor-pointer"
                       id="check-one-box"
                       name="check-one-box"
                       title="Check This Item"
                >
              </th>
              <td>Lettuce Shmettuce</td>
              <td><input type="number" title="Enter Quantity" placeholder="#..." min="1" style="max-width:80px;"></td>
              <td><i class="fa fa-trash text-danger cursor-pointer" aria-hidden="true" title="Remove Item From Shopping List" @click="deleteListItem"></i></td>
            </tr>
            <tr>
              <th scope="row">
                <input type="checkbox"
                       class="check-one-checkbox cursor-pointer"
                       id="check-one-box"
                       name="check-one-box"
                       title="Check This Item"
                >
              </th>
              <td>Weed of the Sea</td>
              <td><input type="number" title="Enter Quantity" placeholder="#..." min="1" style="max-width:80px;"></td>
              <td><i class="fa fa-trash text-danger cursor-pointer" aria-hidden="true" title="Remove Item From Shopping List"></i></td>
            </tr>
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
// import { AppState } from '../AppState'
// import { computed, reactive } from 'vue'
import Notification from '../utils/Notification'
import { shoppingListItemsService } from '../services/ShoppingListItemsService'
import { onMounted, reactive } from 'vue'
import { shelvesService } from '../services/ShelvesService'
import { useRoute } from 'vue-router'
export default {
  name: 'HouseholdShoppingListPage',
  setup() {
    const route = useRoute()
    const state = reactive({
    //   shoppingListItems: computed(() => AppState.shoppingListItems)
    // TODO create shoppingListItems in AppState
    })
    onMounted(async() => {
      try {
        await shelvesService.getShelvesByHouseholdId(route.params.id)
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
