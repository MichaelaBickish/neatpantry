<template>
  <div class="item-component">
    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <!-- NOTE Step1 bind the data target and add the item.id -->
            <button class="btn btn-link btn-block text-left"
                    title="Click for Item Info"
                    type="button"
                    data-toggle="collapse"
                    :data-target="'#collapseOne'+ item.id"
                    aria-expanded="true"
                    aria-controls="collapseOne"
            >
              <!-- NOTE look at contenteditable -->
              <textarea type="text"
                        v-if="state.edit"
                        class="form-control"
                        id="title"
                        placeholder="Title..."
                        minlength="3"
                        v-model="item.title"
                        required
              >
              </textarea>
              <div v-else class="item-title">
                <!-- make this an input based on button click -->
                <span>{{ item.title }}</span>
              </div>
            </button>
          </h2>
        </div>
        <!-- NOTE step2 bind the thing thats being targeted the :id and add the same thing minus the # -->
        <div :id="'collapseOne'+ item.id"
             class="collapse"
             aria-labelledby="headingOne"
             data-parent="#accordionExample"
        >
          <div class="card-body">
            <div class="col-md-12">
              <div class="row flex-direction-row">
                <div class="col-4">
                  <span> Quantity:

                  </span>
                  <input type="number"
                         v-if="state.edit"
                         class="form-control itemQuantity"
                         id="title"
                         placeholder="Title..."
                         minlength="3"
                         v-model="item.quantity"
                         required
                  >
                  <div v-else class="item-title">
                    <span>{{ item.quantity }}</span>
                  </div>

                  <!-- TODO Add functions for bttns increase by one or decrease by1 -->
                  <div class="row">
                    <div>
                      <i class="fas fa-minus action m-2" :key="item.id" title="Remove 1" @click="decrease(item)"></i>
                    </div>
                    <div>
                      <i class="fas fa-plus action m-2" :key="item.id" title="Add 1" @click="increase(item)"></i>
                    </div>
                  </div>
                </div>
                <div class="col-5">
                  <span> Notes:

                  </span>
                  <textarea type="text"
                            v-if="state.edit"
                            class="form-control itemNotes"
                            id="notes"
                            placeholder="Notes..."
                            minlength="3"
                            v-model="item.notes"
                            required
                  >
              </textarea>
                  <div v-else class="item-note">
                    <span>{{ item.notes }}</span>
                  </div>
                </div>
                <div class="col-3 d-flex justify-content-end" v-if="state.shelf">
                  <div class="dropdown">
                    <button class="btn btn-outline-secondary dropdown-toggle "
                            type="button"
                            title="Move item to a different shelf!"
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                    >
                      <span class="text-dark">
                        Move Item
                      </span>
                    </button>
                    <div class="dropdown-menu moveShelfDropdown locked-scroll" aria-labelledby="dropdownMenu2">
                      <a class="dropdown-item action"
                         type="button"
                         title="Move to this shelf!"
                         v-for="shelf in state.shelf"
                         :key="shelf.id"
                         @click="moveItem(item, shelf.id)"
                      >
                        <p>
                          {{ shelf.title }}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row editItem ">
              <div class="col mt-4">
                <button type="button" class="btn btn-outline-dark btn-sm text-danger m-2" title="Click to Delete Item" @click="deleteItem(item)">
                  Delete Item
                </button>
              </div>
              <div class="col d-flex align-items-end justify-content-end">
                <button type="button" class="btn btn-outline-primary m-1" title="Click to Edit Item Info" @click="state.edit = true">
                  Edit Item
                </button>
                <button type="button"
                        class="btn btn-outline-secondary action m-1"
                        v-if="state.edit"
                        :key="item.id"
                        title="Click to Save Changes"
                        @click="saveEdit(item)"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { itemsService } from '../services/ItemsService'
import { shoppingListItemsService } from '../services/ShoppingListItemsService'
import Notification from '../utils/Notification'
export default {
  name: 'ItemComponent',
  props: {
    item: {
      type: Object,
      required: true
    }

  },
  setup(props) {
    const state = reactive({
      edit: false,
      saved: false,
      shelf: computed(() => AppState.shelves),
      activeShelf: computed(() => AppState.activeShelf),
      item: computed(() => AppState.items),
      activeHousehold: computed(() => AppState.activeHousehold)
    })

    return {
      state,
      async moveItem(item, shelfId) {
        try {
          await itemsService.moveItem(item, shelfId)
          Notification.toast('Successfully Moved Item!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async saveEdit(item) {
        try {
          // if the items quantity is less than or equal to threshold AND the autoAdd box was check on creation
          if (item.threshold <= item.quantity && state.autoAdd) {
            // attatch the items id and save it as item.itemId
            item.itemId = item.id
            // then send it to be created in the shoppinglist
            await shoppingListItemsService.createShoppingListItem(item)
            // this says if the quantity will be less than zero then set it to zero. Makes sure we cannot getinto the negitives
          } else if (item.quantity < 0) {
            item.quantity = 0
            return
          }
          // item.householdId = state.activeShelf.householdId this is the same as passing it below
          await itemsService.saveEdit({ ...item, householdId: state.activeShelf.householdId })
          // state.editedItem = {}
          state.edit = false

          Notification.toast('Edit Saved!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async increase(item) {
        try {
          item.quantity++
          await itemsService.saveEdit({ quantity: item.quantity, id: item.id, householdId: state.activeShelf.householdId })
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async decrease(item) {
        try {
          // if triggered decrease by 1
          item.quantity--
          // if the items quantity is less than or equal to threshold AND the autoAdd box was check on creation
          if (item.threshold <= item.quantity && state.autoAdd) {
            // attatch the items id and save it as item.itemId
            item.itemId = item.id
            // then send it to be created in the shoppinglist
            await shoppingListItemsService.createShoppingListItem(item)
            // this says if the quantity will be less than zero then set it to zero. Makes sure we cannot getinto the negitives
          } else if (item.quantity < 0) {
            item.quantity = 0
            return
          }
          await itemsService.saveEdit({ quantity: item.quantity, id: item.id, householdId: state.activeShelf.householdId })
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteItem(item) {
        try {
          if (await Notification.confirmAction()) {
            await itemsService.deleteItem({ ...item, householdId: state.activeShelf.householdId })
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
.dropdown-menu{
  height: 20vh;
  overflow-y: auto;
  padding-bottom: 1rem;
}
.action{
  cursor: pointer;
}
// .locked-scroll {
//   height: 50vh;
//   overflow-y: scroll;
// }

// .itemQuantity{
//   max-width: 2.5rem;
//   max-height: 3rem

// }
</style>
