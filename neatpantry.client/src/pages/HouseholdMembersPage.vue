<!------------------------------------------------------------------->

<template>
  <!-- TODO how do we GET members? -->
  <div class="container-fluid" v-if="state.activeHousehold">
    <div class="row justify-content-center">
      <div class="col-6 bg-white d-flex flex-column justify-content-center align-items-center rounded-bottom shadow-sm pt-3 pb-4">
        <div class="row">
          <div class="col">
            <h3>
            </h3>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h1>{{ state.activeHousehold.title }}</h1>
          </div>
        </div>

        <div class="row pt-3">
          <div class="col">
            <button type="button" class="btn btn-secondary btn-lg" data-toggle="modal" data-target="#getRoomPasscode">
              Get Room Passcode
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade"
         id="getRoomPasscode"
         tabindex="-1"
         role="dialog"
         aria-labelledby="getRoomPasscodeLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header justify-content-center bg-light">
            <h5 id="getRoomPasscodeLabel">
              Use this Passcode to Join <span class="">{{ state.activeHousehold.title }}</span>
            </h5>
          </div>
          <div class="modal-body text-center">
            <h2>
              <input class="text-center pb-1" type="text" :value="state.activeHousehold.passcode">
            </h2>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-primary" @click="copyTest">
              {{ state.copied ? "copied" : "copy" }}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5 pb-3 mb-3 border-bottom">
      <div class="col d-flex justify-content-center">
        <h2>Household Members</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <HouseholdMembers v-for="c in state.activeHousehold.collaboratorsProfiles" :key="c.id" :c-prop="c" />
      </div>
    </div>
    <!-- ---------- -->
    <footer class="row d-flex flex-column mt-5 bg-light">
      <div class="row">
        <div class="col border-right justify-content-end d-flex ml-4 my-4">
          <button type="button" class="btn btn-danger btn-block">
            Remove Yourself
          </button>
        </div>
        <div class="col justify-content-start d-flex mr-4 my-4">
          <button type="button" class="btn btn-danger btn-block" @click="deleteHousehold(state.activeHousehold.id)">
            Delete Household
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<!------------------------------------------------------------------->

<script>
import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { householdsService } from '../services/HouseholdsService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
import HouseholdMembers from '../components/HouseholdMembersComponent.vue'

export default {
  name: 'HouseHoldMemberPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeHousehold: computed(() => AppState.activeHousehold),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      copied: false
    })
    onMounted(async() => {
      try {
        await householdsService.getHouseholdById(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      route,
      state,
      async deleteHousehold(id) {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this household?')) {
            await householdsService.deleteHousehold(id)
            Notification.toast('Household Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      copyTest() {

      },
      copyText() {
        /* Get the text field */
        const copyText = document.getElementById('myInput')

        /* Select the text field */
        copyText.select()
        copyText.setSelectionRange(0, 99999) /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand('copy')

        /* Alert the copied text */
        alert('Copied the text: ' + copyText.value)
      }

    }
  },
  components: {
    HouseholdMembers
  }
}
</script>

<!------------------------------------------------------------------->

<style scoped>

</style>

<!------------------------------------------------------------------->

<style lang="css" scoped>
.size-lock{
  font-size: 6rem;
}
.desktop-margin{
  width: 80vw;
}
.center-input{
  text-align: center;
}
.h2-small {
  font-size: 10px;
}
</style>

<!------------------------------------------------------------------->
