<template>
  <div class="modal"
       id="new-shelf-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title" id="exampleModalLabel">
            Create a Shelf
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createShelf">
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
                     v-model="state.newShelf.title"
                     required
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-link btn-outline-dark text-danger" data-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary text-dark">
              Add
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
import { shelvesService } from '../services/ShelvesService'
import $ from 'jquery'
import Notification from '../utils/Notification'
export default {
  name: 'AddShelfModalComponent',
  setup() {
    const state = reactive({
      newShelf: {},
      shelves: computed(() => AppState.shelves)
    })
    return {
      state,
      async createShelf() {
        try {
          await shelvesService.createShelf(state.newShelf)
          state.newShelf = {}
          $('#new-shelf-form').modal('hide')
          Notification.toast('Shelf Successfully Created!', 'success')
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

</style>
