<!------------------------------------------------------------------->

<template>
  <!-- TODO how do we GET members? -->
  <div class="container-fluid" v-if="state.activeHousehold">
    <div class="row">
      <div class="">
        <button @click="deleteHousehold(state.activeHousehold.id)">
          DELETE HOUSEHOLD
        </button>
        <span>{{ state.activeHousehold.title }}</span>
      </div>
    </div>
    <HouseholdMembers v-for="c in state.activeHousehold.collaboratorsProfiles" :key="c.id" :c-prop="c" />
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

<style scoped>

</style>

<!------------------------------------------------------------------->
