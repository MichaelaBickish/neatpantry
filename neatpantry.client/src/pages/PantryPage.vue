<template>
  <div class="pantry-page container-fluid px-0">
    <div class="row">
      <button type="button" class="btn btn-outline-dark btn-lg m-3">
        Add Shelf
      </button>
    </div>
    <div class="row">
      <ShelfComponent />
    </div>
    <!-- <footer> -->
    <div class="row fixed-bottom">
      <div class="col-md-12 d-flex justify-content-around text-info mb-2">
        <i class="fas fa-home fa-3x" title="Household Members"></i>
        <i class="fas fa-clipboard-list fa-3x" title="Household Shopping List"></i>
        <i class="fas fa-user-alt fa-3x" title="Personal Account Info"></i>
      </div>
    </div>
    <!-- </footer> -->
  </div>
</template>

<script>
export default {
  name: 'PantryPage',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
