<!------------------------------------------------------------------->

<template>
  <!-- Need edit profile server function -->
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col col-md-4">
        <div class="card p-4 shadow-sm mt-3">
          <div class="row">
            <div class="col-12 d-flex justify-content-center align-items-center">
              <img class="rounded-circle" :src="state.account.picture" width="100" alt="Profile Picture" />
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
                <form>
                  <!-- @submit.prevent="editProfile" -->
                  <div class="form-group">
                    <label for="profileNameEdit">Update Profile Name</label>
                    <input type="text" class="form-control" id="profileNameEdit" aria-describedby="profileNameEdit" placeholder="enter new name">
                    <!-- v-model="profileEdit.name" -->
                  </div>
                  <div class="form-group">
                    <label for="profilePictureEdit">Update Profile Picture</label>
                    <input type="text" class="form-control" id="profilePictureEdit" aria-describedby="profilePictureEdit" placeholder="paste image URL">
                    <!-- v-model="profileEdit.picture" -->
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
// import Notification from '../utils/Notification'

export default {
  name: 'Account',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      profileEdit: {}
    })
    return {
      state

      // TODO
      // async editProfile() {
      //   try {
      //     await NOTE accountService.editBug(state.profileEdits, WHAT id GOES HERE?)
      //     state.profileEdits = {}
      //     Notification.toast('All Done!', 'success')
      //   } catch (error) {
      //     Notification.toast('Error: ' + error, 'error')
      //   }
      // }

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
</style>

<!------------------------------------------------------------------->
