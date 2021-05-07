<template>
  <div class="shelf-component container-fluid">
    <div class="shelf bg-white shadow">
      <div class="col-md-10 shelf mb-1 mt-1">
        shelf
      <!-- {{ prop.title }} -->
      </div>
      <div class="col-2 d-flex flex-end align-items-center justify-content-end">
        <i class="fas fa-chevron-right fa-2x"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShelfComponent',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.shelf{
  min-height: 4rem;
    display: flex;
  width: 100%;
}

</style>
