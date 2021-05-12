<!----------------------------------------------------------------------------------------------->

<template>
  <div class="container-fluid">
    <div class="row justify-content-center bg-light py-5">
      <div class="col col-md-6">
        <div class="card text-center shadow-sm">
          <div class="card-body">
            <h1 class="card-title">
              {{ state.user.isAuthenticated ? "You're logged in" : "You're not logged in" }}
            </h1>
            <p class="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum omnis qui sint aliquam beatae quibusdam accusamus,
            </p><div class="row">
              <div class="col border-right justify-content-end d-flex ml-5">
                <!-- Button trigger modal for create a household -->
                <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#createhouseholdmodal" title="Create A New Household">
                  Create
                </button>
              </div>
              <div class="col justify-content-start d-flex mr-5">
                <!-- Button trigger modal for JOIN a household -->
                <button type="button" class="btn btn-secondary btn-block" data-toggle="modal" data-target="#joinhouseholdmodal" title="Join A Household">
                  Join
                </button>
              </div>
            </div>

            <br>
            <p>
              Do you already have a household?
              <!-- TODO change router link path -->
              <router-link :to="{ name: 'About' }" class="">
                <span>
                  Sign In
                </span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Household Modal -->
    <div class="modal fade" id="createhouseholdmodal" tabindex="-1" aria-labelledby="createhouseholdmodalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createhouseholdmodalLabel">
              Create a New Household
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!--FORM-->
            <form @submit.prevent="createHousehold">
              <div class="form-group">
                <label for="household-title">Enter Household Name</label>
                <input type="text"
                       class="form-control"
                       id="household-title"
                       aria-describedby="createhousehold"
                       required
                       v-model="state.newHousehold.title"
                >
                <small id="createhousehold" class="form-text text-muted">What would you like your household to be called?</small>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" title="Close Modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary" title="Click Here to Create Your New Household">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Join Household Modal -->
    <div class="modal fade" id="joinhouseholdmodal" tabindex="-1" aria-labelledby="joinhouseholdmodalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="joinhouseholdmodalLabel">
              Your Household Is Waiting! Join It Now.
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!--FORM-->
            <form @submit.prevent="joinHousehold">
              <div class="form-group">
                <label for="household-title">Enter Household Passcode</label>
                <input type="text"
                       class="form-control"
                       id="household-passcode"
                       aria-describedby="joinhousehold"
                       required
                       v-model="state.joinHousehold.passcode"
                >
                <small id="joinhousehold" class="form-text text-muted">Enter the passcode you received from the creator of the household.</small>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" title="Close Modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary" title="Click Here to Join Your Household">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1>How it Works</h1>
          </div>
        </div>

        <div class="row">
          <div class="col col-md-4 d-flex flex-column align-items-center">
            <img src="//placehold.it/200x200" alt="">
            <h2>Create</h2>
            <p class="">
              Start your household <br>Add household members<br>Invite members with your household's unique passcode
            </p>
          </div>
          <div class="col col-md-4 d-flex flex-column align-items-center">
            <img src="//placehold.it/200x200" alt="">
            <h2>Customize</h2>
            <p class="">
              Add "shelves"<br>Add items to your shelves<br>Utilize a shopping list
            </p>
          </div>
          <div class="col col-md-4 d-flex flex-column align-items-center">
            <img src="//placehold.it/200x200" alt="">
            <h2>Organize</h2>
            <p class="">
              Access your accurate item quantities<br>Get notified on expiration dates or when your item quantity reaches a certain number<br>
            </p>
          </div>
        </div>
      </div>
    </div> -->
    <div class="row">
      <!--  v-if="state.households" ?????????????? -->
      <div class="col">
        <Households v-for="household in state.households" :key="household.id" :household-prop="household" />
      </div>
    </div>
  </div>
</template>

<!----------------------------------------------------------------------------------------------->

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { householdsService } from '../services/HouseholdsService'
import $ from 'jquery'
import Notification from '../utils/Notification'
import Households from '../components/HouseholdComponent.vue'
// import { logger } from '../utils/Logger'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      households: computed(() => AppState.households),
      newHousehold: {},
      joinHousehold: {}
    })
    onMounted(async() => {
      try {
        await householdsService.getAllHouseholds()
        // logger.log('connected to bandaid') // NOTE what the ACTUAL heck?!!!!!!!!!!!!!! This makes it work for SOME reason?
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,
      async createHousehold() {
        try {
          await householdsService.createHousehold(state.newHousehold)
          state.newHousehold = {}
          $('#createhouseholdmodal').modal('hide')
          Notification.toast('Nice! Your Household Was Created!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async joinHousehold() {
        try {
          await householdsService.joinHousehold(state.joinHousehold.passcode)
          state.joinHousehold = {}
          $('#joinhouseholdmodal').modal('hide')
          Notification.toast('You have joined your household!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {
    Households
  }
}
</script>

<!----------------------------------------------------------------------------------------------->

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.border-right{
  border-right-width: 1rem;
  border-right-color: black;
}
</style>

<!----------------------------------------------------------------------------------------------->
