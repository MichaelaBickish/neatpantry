<template>
  <div class="row mt-5">
    <div class="col">
      <div class="card w-75">
        <div class="card-body">
          <h5 class="card-title">
            {{ cProp.name }}
            {{ cProp.id }}
            <!-- Household member profile name and profile picture -->
          </h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
            <!-- Household member email -->
          </p>
          <button type="button" class="btn btn-danger btn-sm" @click="deleteHouseholdCollaborator()">
            <!-- @click="deleteCollaborator(cProp.id)" -->
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { householdsService } from '../services/HouseholdsService'
import Notification from '../utils/Notification'

export default {

  name: 'HouseholdMember',
  props: {
    cProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      activeHousehold: computed(() => AppState.activeHousehold)
    })
    return {
      state,
      // TODO
      async deleteHouseholdCollaborator() {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this note?')) {
            await householdsService.deleteHouseholdCollaborator(state.activeHousehold.id, props.cProp.id)
            // await householdsService.getHouseholdById(state.activeHousehold.id)
            Notification.toast('Member Removed', 'success')
          }
        } catch (error) {
          Notification.toast('You cannot delete that!: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style>

</style>
