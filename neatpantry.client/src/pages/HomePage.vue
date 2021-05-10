<!----------------------------------------------------------------------------------------------->

<template>
  <div class="container-fluid">
    <div class="row justify-content-center bg-light py-5">
      <div class="col col-md-6">
        <div class="card shadow-sm">
          <div class="card-header">
            Create a New Household
          </div>
          <div class="card-body">
            <h5 class="card-title">
              Create a New Household (HOOK)
            </h5>
            <p class="card-text">
              Flavor text about why they would want to get started
            </p>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary mb-2" data-toggle="modal" data-target="#createhouseholdmodal" title="Click Here to Get Started">
              Get Started!
            </button><br>
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

    <!-- Modal -->
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
            <form>
              <!-- TODO @submit.prevent(createHousehold) -->
              <div class="form-group">
                <label for="household-title">Enter Household Name</label>
                <input type="text" class="form-control" id="household-title" aria-describedby="createhousehold" required>
                <!-- TODO v-model = "newHousehold.title" -->
                <small id="createhousehold" class="form-text text-muted">What would you like your household to be called?</small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" title="Close Modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary" title="Click Here to Create Your New Household">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Scrollable modal -->

    <!-- <div class="row">
      <div class="col-md-12">
        <h1>How it Works</h1>
      </div>
    </div>

    <div class="row justify-content-around">
      <div class="col-md-4">
        <img src="//placehold.it/200x200" alt="">
        <h2>Create</h2>
        <p class="text-left">
          Start your household <br>Add household members<br>Invite members with your household's unique passcode
        </p>
      </div>
      <div class="col-md-4">
        <img src="//placehold.it/200x200" alt="">
        <h2>Customize</h2>
        <p class="text-left">
          Add "shelves"<br>Add items to your shelves<br>Utilize a shopping list
        </p>
      </div>
      <div class="col-md-4">
        <img src="//placehold.it/200x200" alt="">
        <h2>Organize</h2>
        <p class="text-left">
          Access your accurate item quantities<br>Get notified on expiration dates or when your item quantity reaches a certain number<br>
        </p>
      </div>
    </div> -->

    <!-- <div class="row">
      <div class="col-md-12">
        <div class="shadow p-5 my-5 vw-75">
          <div class="text-left">
            <h3>
              Create Your Household!
            </h3>
            <p>1. Login or register an account to create a household!</p>
            <p>2. Create your household!</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<!----------------------------------------------------------------------------------------------->

<script>
import { reactive } from 'vue'
// import { AppState } from '../AppState'
// import { householdsService } from '../services/HouseholdsService'
// import Notification from '../utils/Notification'
// import $ from 'jquery'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newHousehold: {}
    })
    return {
      state
      // async createHousehold() {
      //   try {
      //     await householdsService.createHousehold(state.newHousehold) // NOTE router.push goes in the services part of this function
      //     state.newHousehold = {}
      //     $('#createhouseholdmodal').modal('hide')
      //     Notification.toast('Nice! Your Household Was Created!', 'success')
      //   } catch (error) {
      //     Notification.toast('Error: ' + error, 'error')
      //   }
      // }
    }
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
</style>

<!----------------------------------------------------------------------------------------------->
