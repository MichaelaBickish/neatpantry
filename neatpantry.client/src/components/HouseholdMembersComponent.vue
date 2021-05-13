<template>
  <div class="mt-5 shadow-sm bg-white">
    <div class="row p-3  d-flex d-row">
      <div class="col-3 mx-3 d-flex flex-row justify-content-center align-items-center">
        <img :src="cProp.picture"
             alt="profile picture"
             class="profile-pic shadow-sm rounded-circle border"
        >
      </div>
      <div class="col d-flex flex-column justify-content-center align-items-start">
        <div class="row">
          <div class="col">
            <h2>
              {{ cProp.name }}
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col">
            {{ cProp.email }}
          </div>
        </div>
      </div>
      <div class="col col-md-3 d-flex flex-row justify-content-end align-items-center pt-3">
        <button type="button" class="btn btn-danger " @click="deleteHouseholdCollaborator()">
          Remove
        </button>
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

<style scoped>
h2{
  font-size: 24px;
  margin: 0;
  padding: 0;
}
.profile-pic{
width: 5rem;
height: 5rem;
object-fit: cover;

}

</style>
