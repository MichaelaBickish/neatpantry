<!------------------------------------------------------------------->

<template>
  <!-- TODO how do we GET members? -->
  <div class="container-fluid" v-if="state.activeHousehold">
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
          <button type="button" class="btn btn-danger btn-block">
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
  name: 'AboutPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeHousehold: computed(() => AppState.activeHousehold),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
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
.desktop-margin{
  width: 80vw;
}
</style>

<!------------------------------------------------------------------->
