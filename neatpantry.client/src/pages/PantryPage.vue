<template>
  <div class="pantry-page container-fluid px-0 " v-if="state.activeHousehold">
    <div class="row">
      <div class="col-md-12">
        <h1>
          {{ state.activeHousehold.title }}
        </h1>
      </div>
      <div class="col-md-12">
        <button title="Create New Shelf"
                type="button"
                class="btn btn-outline-dark btn-lg m-3"
                data-toggle="modal"
                data-target="#new-shelf-form"
        >
          <!-- v-if="state.user.isAuthenticated" -->
          <span> Add Shelf
            {{ state.shelves.title }}
          </span>
        </button>
      </div>
    </div>
    <div class="row ">
      <ShelfComponent v-for="shelf in state.shelves" :key="shelf.id" :shelf="shelf" />
    </div>
    <!-- TODO Make sure this content doesnt bleed into the footer w the icons -->
    <!-- <footer> -->
    <div class="row footer mt-2">
      <div class="col-md-12 d-flex justify-content-around text-info mb-2">
        <router-link :to="{ name: 'HouseholdMembersPage', params: state.households.id }">
          <i class="fas fa-home fa-3x" title="Household Members"></i>
        </router-link>
        <router-link :to="{ name: 'HouseholdShoppingListPage', params: state.households.id}">
          <i class="fas fa-clipboard-list fa-3x" title="Household Shopping List"></i>
        </router-link>
        <router-link :to="{ name: 'Account'}">
          <i class="fas fa-user-alt fa-3x" title="Personal Account Info"></i>
        </router-link>
      </div>
    </div>
    <!-- </footer> -->
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { shelvesService } from '../services/ShelvesService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  name: 'PantryPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeHousehold: computed(() => AppState.activeHousehold),
      households: computed(() => AppState.households),
      shelves: computed(() => AppState.shelves),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await shelvesService.activeHousehold(route.params.id)
        await shelvesService.getShelvesByHouseholdId(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      route,
      state

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.pantry-page{
  max-height: 80vh;
}

</style>
