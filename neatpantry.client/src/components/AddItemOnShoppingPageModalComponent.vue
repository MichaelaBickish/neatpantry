<template>
  <div class="modal"
       id="new-item-form-on-shopping-page"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="exampleModalLabel">
            Add a New Item
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createItem">
          <div class="col-md-12 modal-body ml-3">
            <div class="row">
            </div>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">Item Name</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     placeholder="Item Name..."
                     min="3"
                     max="15"
                     v-model="state.newItem.title"
                     required
              >
              <label for="quantity">Your Current Quantity</label>
              <input type="number"
                     class="form-control"
                     id="quantity"
                     placeholder="Current Quantity..."
                     min="0"
                     v-model="state.newItem.quantity"
                     required
              >

              Select item's shelf: <select v-model="state.newItem.shelfId" class="my-2">
                <option
                  title="Choose This Shelf"
                  v-for="shelf in state.shelves"
                  :key="shelf.id"
                  :value="shelf.id"
                  required
                >
                  {{ shelf.title }}
                </option>
              </select>

              <!-- Checkbox to add shopping list -->
              <div class="add-to-shopping-list-checkbox">
                <input class="action m-2"
                       type="checkbox"
                       id="add-to-shopping-list"
                       name="add-to-shopping-list"
                       title="Add this new item to my shopping list"
                       v-model="state.newItem.addToShoppingList"
                >Yes! Add this new item to my shopping list
              </div>
              <!-- Checkbox to add item to shopping list -->

              <div class="AutoAddCheckbox">
                <input class="action m-2"
                       type="checkbox"
                       id="AutoAdd"
                       name="AutoAdd"
                       title="Click to Auto Add Item"
                       @click="state.autoAdd = !state.autoAdd"
                >
                <span
                  class="setThreshhold "
                >
                  Auto add item to shopping list at quantity:</span>
                <!-- @click="setToAutoAdd" -->
                <div>
                  <input type="text"
                         v-if="state.autoAdd"
                         placeholder="set threshold"
                         title="Auto Add threshold"
                         id="threshold"
                  >
                </div>
                <!-- need @click="sortClosed" -->
              </div>
              <div class="recieveNotification">
                <input class="action m-2"
                       type="checkbox"
                       id="recieveNotification"
                       name="recieveNotification"
                       title="Click to Recieve Notification"
                       @click="getANotification"
                >

                <span class="addNotification ">Notify me when item reaches quantity:</span><br>
              </div>
            </div>
            <!-- <form action="" @submit.prevent="createNote">
              <div class="input-group mb-3">
                <input type="text"
                       class="form-control"
                       placeholder="Add Note..."
                       aria-describedby="basic-addon2"
                       v-model="state.newNote.body"
                       required
                >
              </div>
            </form> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link btn-outline-dark text-danger" data-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary text-dark">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { itemsService } from '../services/ItemsService'
import $ from 'jquery'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
export default {
  name: 'AddItemModalComponent',
  setup() {
    const route = useRoute()
    const state = reactive({
      newItem: {
        addToShoppingList: false
      },
      // newNote: {},
      shelves: computed(() => AppState.shelves),
      activeShelf: computed(() => AppState.activeShelf),
      items: computed(() => AppState.items),
      autoAdd: false
    })
    return {
      state,
      async createItem() {
        try {
          state.newItem.householdId = route.params.id
          await itemsService.createItem(state.newItem)
          state.newItem = {}
          $('#new-item-form-on-shopping-page').modal('hide')
          Notification.toast('Item Successfully Created!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
      //     async createNote() {
      // try {
      //   // these are saving the itemId and the shlef = to Id onto the comment before we send the object state.newNote over to service. We access the newNote using the term body in service
      //   state.newNote.itemId = props.item.id
      //   state.newNote.shelfId = props.item.shelfId
      //   await itemsService.createNote(state.newNote)
      //   Notification.toast('Successfully Created Note!', 'success')
      //   state.newNote = {}
      // } catch (error) {
      //   Notification.toast('Error: ' + error, 'error')
      // }
      // async autoAdd() {
      //   try {
      //     await itemsService.addItem()
      //   } catch (error) {

      //   }
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
