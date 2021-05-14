<!------------------------------------------------------------------->

<template>
  <!-- Need edit profile server function -->
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col col-sm-10 col-md-6">
        <div class="card p-4 shadow-sm mt-3">
          <div class="row mt-2">
            <div class="col-12 d-flex justify-content-center align-items-center">
              <img class="rounded-circle border shadow-sm profile-pic" :src="state.account.picture" width="100" alt="Profile Picture" />
            </div>
            <div class="col text-center">
              <div class="card-body">
                <h1 class="card-title">
                  {{ state.account.name }}
                </h1>
                <h6 class="card-subtitle mb-2 text-muted">
                  <span class="text-dark">email:</span> {{ state.account.email }}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <button type="button"
                    class="btn btn-secondary btn-lg btn-block p-2 shadow-sm"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
            >
              edit profile
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <div class="collapse" id="collapseExample">
              <div class="card card-body shadow-sm">
                <form @submit.prevent="editProfile">
                  <div class="form-group">
                    <label for="profileNameEdit">Update Profile Name</label>
                    <input type="text"
                           class="form-control"
                           id="profileNameEdit"
                           aria-describedby="profileNameEdit"
                           placeholder="enter new name"
                           v-model="state.profileEdits.name"
                    >
                  </div>
                  <div class="form-group">
                    <label for="profilePictureEdit">Update Profile Picture</label>
                    <input type="text"
                           class="form-control"
                           id="profilePictureEdit"
                           aria-describedby="profilePictureEdit"
                           placeholder="paste image URL"
                           v-model="state.profileEdits.picture"
                    >
                  </div>
                  <button type="submit" class="btn btn-secondary btn-block mt-2">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!------------------------------------------------------------------->

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import Notification from '../utils/Notification'

export default {
  name: 'Account',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      profileEdits: {}
    })
    return {
      state,

      async editProfile() {
        try {
          if (!state.profileEdits.name) {
            state.profileEdits.name = state.account.name
          }
          if (!state.profileEdits.picture) {
            state.profileEdits.picture = state.account.picture
          }
          await accountService.edit(state.profileEdits, state.account.id)
          state.profileEdits = {}
          Notification.toast('Profile Updated!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<!------------------------------------------------------------------->

<style scoped>
h1{
  font-size: 1.75rem
}
img {
  max-width: 100px;
}
.profile-pic{
width: 5rem;
height: 5rem;
object-fit: cover;
}
</style>

<!------------------------------------------------------------------->
