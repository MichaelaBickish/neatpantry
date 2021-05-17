<!----------------------------------------------------------------------------------------------->

<template>
  <div class="container-fluid">
    <div class="row justify-content-center bg-light py-5">
      <div class="col col-md-6">
        <div class="card text-center shadow-sm">
          <div class="card-body">
            <h1 class="card-title">
              Welcome!
            </h1>
            <p class="card-text">
              Neat is a full-stack application that allows you to organize your pantry as well as your shopping list.
            </p><div class="row">
              <!-- TODO remove v-if they are already logged in, if not fire the log in confirm action -->
              <div class="col border-right justify-content-end d-flex ml-5">
                <!-- Button trigger modal for create a household -->
                <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#signUp" title="Create A New Household">
                  Create
                </button>
              </div>
              <div class="col justify-content-start d-flex mr-5">
                <!-- Button trigger modal for JOIN a household -->
                <button type="button" class="btn btn-secondary btn-block" data-toggle="modal" data-target="#signUp" title="Join A Household">
                  Join
                </button>
              </div>
            </div>

            <br>
            <p class="">
              <button class="btn btn-sm" @click="login">
                Do you already have a household?
              </button>
              <!-- TODO change router link path -->
              <button type="button" class="btn btn-sm text-primary m-0 p-0" @click="login">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Join Household Modal -->
    <div class="modal fade" id="signUp" tabindex="-1" aria-labelledby="signUpLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title" id="signUpLabel">
              Before we get started
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <span> You'll need to make an account first. </span>
          </div>
          <div class="modal-footer">
            <button type="button"
                    class="btn btn-secondary btn-block"
                    data-toggle="modal"
                    data-target="#signUp"
                    title="Join A Household"
                    @click="login"
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col col-md-4 d-flex flex-column align-items-center p-5">
            <i class="fas fa-edit fa-5x text-gray mb-2" />
            <h2>Create</h2>
            <p class="text-center text-gray mt-2">
              Start your household Add household members. Invite members with your household's unique passcode.
            </p>
          </div>
          <div class="col col-md-4 d-flex flex-column align-items-center p-5">
            <i class="fas fa-cogs fa-5x text-gray mb-2" />
            <h2>Customize</h2>
            <p class="text-center text-gray mt-2">
              Add shelves to your pantry. Add items to your shelves. Create a shopping list out of your chosen items.
            </p>
          </div>
          <div class="col col-md-4 d-flex flex-column align-items-center p-5">
            <i class="fas fa-clipboard-check fa-5x text-gray mb-2" />
            <h2>Organize</h2>
            <p class="text-center text-gray mt-2">
              Access accurate item quantities. Get notified on expiration dates or when your item quantity reaches a certain number.
            </p>
          </div>
          <!-- <div class="col col-md-4 d-flex flex-column align-items-center">
            <i class="fas fa-cogs fa-5x text-gray" />
            <h2>Customize</h2>
            <p class="">
              Add "shelves"<br>Add items to your shelves<br>Utilize a shopping list
            </p>
          </div>
          <div class="col col-md-4 d-flex flex-column align-items-center">
            <i class="fas fa-cogs fa-5x text-gray" />
            <h2>Organize</h2>
            <p class="">
              Access your accurate item quantities<br>Get notified on expiration dates or when your item quantity reaches a certain number<br>
            </p>
          </div> -->
        </div>
      </div>
    </div>
    <!-- TEMP LINK -->
    <!-- <div class="row">
      <div class="col">
        <router-link :to="{ name: 'HouseholdsPage', params: {id: state.account.id} }" class="">
          <span>
            go to households page
          </span>
        </router-link>
      </div>
    </div> -->
  </div>
</template>

<!----------------------------------------------------------------------------------------------->

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      households: computed(() => AppState.households)
    })
    return {
      state,
      async login() {
        await AuthService.loginWithPopup()
        if (state.user.isAuthenticated) {
          router.push({ name: 'HouseholdsPage' })
        }
      }
    }
  },
  components: {

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
.text-gray{
  color: gray
}
</style>

<!----------------------------------------------------------------------------------------------->
