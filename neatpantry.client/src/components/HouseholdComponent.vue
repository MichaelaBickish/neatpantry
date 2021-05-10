<template>
  <div class="row mt-5">
    <div class="col">
      <div class="card w-75">
        <div class="card-body">
          <h5 class="card-title">
            {{ householdProp.title }}
          </h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <button type="button" class="btn btn-primary">
            Remove
          </button>
          <!-- <router-link :to="{name: 'PantryPage', params: {id: householdProp.id}}">
            <span>
              Go To
            </span>
          </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Household',
  props: {
    householdProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      households: computed(() => AppState.households)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style>

</style>
