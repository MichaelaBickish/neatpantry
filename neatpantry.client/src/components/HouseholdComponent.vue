<template>
  <div class="col col-sm-6 col-md-4 d-flex justify-content-center mt-2">
    <div class="row">
      <div class="card shadow" style="width: 20rem;">
        <router-link class="text-white" :to="{name: 'PantryPage', params: {id: householdProp.id}}">
          <div class="card-header text-center bg-primary">
            <h4><b>{{ householdProp.title }}</b></h4>
          </div>
        </router-link>
        <!-- Icon Link -->
        <div class="card-body p-0 bg-light">
          <!--
          <router-link class="text-dark" :to="{name: 'PantryPage', params: {id: householdProp.id}}">
            <div class="row border-bottom mb-3">
              <div class="col d-flex justify-content-center pb-4">
                <i class="fas fa-carrot fa-5x text-orange" :title="householdProp.title"></i>
              </div>
            </div>
          </router-link> -->
          <div class="row my-3">
            <div class="col d-flex justify-content-center border-right">
              <router-link :to="{ name: 'HouseholdMembersPage', params: { id: householdProp.id} }">
                <button type="button" class="btn btn-primary btn-sm">
                  members
                </button>
              </router-link>
            </div>
            <div class="col d-flex justify-content-center">
              <router-link :to="{ name: 'HouseholdShoppingListPage', params: { id: householdProp.id} }">
                <button type="button" class="btn btn-primary btn-sm">
                  shopping list
                </button>
              </router-link>
            </div>
          </div>
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
  name: 'HouseholdComponent',
  props: {
    householdProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      households: computed(() => AppState.households)
      // icon RNG
    //   max: icons.length,
    //   icons: [
    //     'fas fa-carrot fa-5x text-orange',
    //     'fas fa-lemon fa-5x text-secondary',
    //     'fas fa-pepper-hot fa-5x text-danger',
    //     'fas fa-bacon fa-5x text-maroon',
    //     'fas fa-drumstick-bite fa-5x text-brown',
    //     'fas fa-ice-cream fa-5x text-pink',
    //     'fas fa-seedling fa-5x text-green',
    //     'fas fa-pizza-slice fa-5x text-secondary',
    //     'fas fa-utensils fa-5x text-gray',
    //     'fas fa-hamburger fa-5x text-wheat',
    //     'fas fa-hotdog fa-5x text-danger',
    //     'fas fa-apple-alt fa-5x text-danger',
    //     'fas fa-bread-slice fa-5x text-wheat',
    //     'fas fa-cheese fa-5x text-secondary',
    //     'fas fa-egg fa-5x text-wheat']
    })
    return {
      state
      // icon RNG
      // getIcon() {
      //   const iconPick = state.icons[Math.floor(Math.random() * state.max)]
      //   return iconPick
      // }
    }
  },
  components: {}
}
</script>

<style scoped>
h4{
  margin: 0;
  padding: 0;
}
.text-gray{
  color: gray
}
.text-orange{
  color: orange
}
.text-maroon{
  color: maroon
}
.text-brown{
  color: brown
}
.text-pink{
  color: palevioletred
}
.text-green{
  color: green
}
.text-wheat{
  color: wheat
}

</style>
