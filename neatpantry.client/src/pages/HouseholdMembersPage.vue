<!------------------------------------------------------------------->

<template>
  <!-- TODO how do we GET members? -->
  <div class="container desktop-margin" v-if="state.activeHousehold">
    <div class="row justify-content-center">
      <div class="col bg-white d-flex flex-column justify-content-center align-items-center rounded-bottom shadow-sm pt-3 pb-4 text-center">
        <div class="row">
          <div class="col">
            <h3>
            </h3>
          </div>
        </div>
        <div class="row  border-bottom">
          <div class="col">
            <h1>{{ state.activeHousehold.title }}</h1>
            <!-- <div class="" v-if="state.activeHousehold.creator.id === state.account.id">
              <p class="gray-text">
                you own this household
              </p>
            </div> -->
          </div>
        </div>
        <div class="row pt-3">
          <div class="col p-2 gray-text">
            <img class="rounded-circle border shadow-sm profile-pic mb-2" :src="state.activeHousehold.creator.picture" alt="">
            <p>{{ state.activeHousehold.creator.id === state.account.id ? 'you own this household' : "owner: " + `${ state.activeHousehold.creator.name }` }}</p>
          </div>
        </div>

        <div class="row pt-3  mb-2 border-top">
          <div class="col">
            <button type="button" class="btn btn-secondary btn-lg" data-toggle="modal" data-target="#getRoomPasscode" @click="state.copied = false">
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
              <input class="text-center pb-1" type="text" :value="state.activeHousehold.passcode" id="clipboard">
            </h2>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-primary" @click="copyTheText()">
              {{ state.copied ? "copied" : "copy" }}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5 border-top pt-4">
      <div class="col d-flex justify-content-center">
        <span class="h2-small">
          Household Members
        </span>
      </div>
    </div>
    <div class="row pb-3 border-bottom justify-content-center">
      <div class="col" v-if="state.activeHousehold.collaboratorsProfiles.length > 1">
        <HouseholdMembers v-for="c in state.activeHousehold.collaboratorsProfiles" :key="c.id" :c-prop="c" />
      </div>
      <div class="col-6 col-md-4 my-4" v-else>
        <div class="rounded bg-white text-center py-3 shadow-sm">
          <span><b>You have no members... so sad &#128542;</b></span>
        </div>
      </div>
    </div>
    <!-- ---------- -->
    <footer class="row d-flex flex-column mt-5 bg-white shadow-sm rounded-top">
      <div class="row">
        <div class="col border-right justify-content-end d-flex ml-4 my-4">
          <button type="button" class="btn btn-danger btn-sm btn-block" :disabled="state.activeHousehold.creator.id != state.account.id ? disabled : ''" @click="removeYourself">
            Remove Yourself
          </button>
        </div>
        <div class="col justify-content-start d-flex mr-4 my-4">
          <button type="button" class="btn btn-danger btn-sm btn-block" data-toggle="modal" data-target="#deleteHousehold">
            Delete Household
          </button>
          <!-- Modal -->
          <div class="modal fade"
               id="deleteHousehold"
               tabindex="-1"
               role="dialog"
               aria-labelledby="deleteHouseholdLabel"
               aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteHouseholdLabel">
                    Woah, hang on!
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>You're about to permanently delete your household,</p>
                  <h6 class="mt-1">
                    are you sure about this?
                  </h6>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    I gues not...
                  </button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click="deleteHousehold(state.activeHousehold.id)">
                    Yep, Let's do this
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- @click="deleteHousehold(state.activeHousehold.id)" -->
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
import router from '../router.js'

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
          if (await Notification.confirmAction('Final warning, Are you sure you want to delete this household?')) {
            await householdsService.deleteHousehold(id)
            Notification.toast('Household Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async removeYourself() {
        try {
          if (await Notification.confirmAction('Are you sure you want leave this household?')) {
            await householdsService.deleteHouseholdCollaborator(state.activeHousehold.id, state.account.id)
            router.push({ name: 'HouseholdsPage' })
          }
        } catch (error) {
          Notification.toast('You cannot delete that!: ' + error, 'error')
        }
      },
      copyTheText() {
        if (state.copied === false) {
          state.copied = true
        }
        const copyText = document.getElementById('clipboard')
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        document.execCommand('copy')
        Notification.toast('Copied to clipboard!', 'success')
      }

    }
  },
  components: {
    HouseholdMembers
  }
}
</script>

<!------------------------------------------------------------------->

<style lang="css" scoped>
.size-lock{
  font-size: 6rem;
}

.center-input{
  text-align: center;
}
.h2-small {
  font-size: 1.75rem;
  color: gray;
}
.gray-text{
  color: gray;
}
.profile-pic{
width: 5rem;
height: 5rem;
object-fit: cover;
}
p{
  margin: 0 ;
  padding: 0
}
@media only screen and (min-width: 600px) {
.desktop-margin{
  width: 75vw;
}
}
</style>

<!------------------------------------------------------------------->
