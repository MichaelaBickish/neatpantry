<template>
  <div class="modal"
       id="new-item-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="exampleModalLabel">
            Create a Item
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
              <label for="title">Title</label>
              <input type="text"
                     class="form-control"
                     id="title"
                     placeholder="Title..."
                     min="3"
                     max="15"
                     v-model="state.newItem.title"
                     required
              >
              <label for="quantity">Quantity</label>
              <input type="number"
                     class="form-control"
                     id="quantity"
                     placeholder="quantity..."
                     min="0"

                     v-model="state.newItem.quantity"
              >
              <div class="AutoAddCheckbox text-left mr-5">
                <input class="action m-2"
                       type="checkbox"
                       id="AutoAdd"
                       name="AutoAdd"
                       title="Click to Auto Add Item"
                       @click="state.setToAutoAdd.autoAdd = !state.setToAutoAdd.autoAdd"
                >
                <!-- step1 this state.setToAutoAdd.autoAdd is the global variable called autoAdd that is set in appState -->
                <span
                  class="setThreshhold "
                >
                  Auto add item to shopping list at quantity:</span>

                <div>
                  <!-- step 1.5  v-if="state.setToAutoAdd.autoAdd"-->
                  <input type="number"
                         class="ml-5"
                         v-if="state.setToAutoAdd.autoAdd"
                         placeholder="set threshold"
                         title="Auto Add threshold"
                         id="threshold"
                         v-model="state.newItem.threshold"
                  >
                </div>
              </div>
              <div class="recieveNotification text-left mr-5">
                <input class="action m-2"
                       type="checkbox"
                       id="recieveNotification"
                       name="recieveNotification"
                       title="Click to Recieve Notification"
                       @click="state.recieveNotification = !state.recieveNotification"
                >

                <span class="addNotification "> Notify me when item reaches quantity:</span>
                <div>
                  <input type="number"
                         class="ml-5"
                         v-if="state.recieveNotification"
                         placeholder="set threshold"
                         title="Notify me threshold"
                         id="notifyMeThreshold"
                  >
                </div>
                <br>
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
      newItem: { },
      // newNote: {},
      shelves: computed(() => AppState.shelves),
      activeShelf: computed(() => AppState.activeShelf),
      items: computed(() => AppState.items),
      // this is bringing in the entire appstate and saving it to setToAutoAdd so we can drill into it and get the global variable autoAdd
      setToAutoAdd: computed(() => AppState),
      // autoAdd: false,
      recieveNotification: false
    })
    return {
      state,
      async createItem() {
        try {
          state.newItem.shelfId = route.params.id
          state.newItem.householdId = state.activeShelf.householdId
          // step3 if they clicked the checkbox above then flip the server model to true
          if (state.setToAutoAdd.autoAdd) {
            state.newItem.autoAdd = true
          }
          await itemsService.createItem(state.newItem)
          // if(state.autoAdd){
          //   AppState.autoAdd.push(body)}
          state.newItem = {}
          $('#new-item-form').modal('hide')
          Notification.toast('Item Successfully Created!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
      // async setToAutoAdd() {
      //   try {
      //     await itemsService.setToAutoAdd()
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

</style>
