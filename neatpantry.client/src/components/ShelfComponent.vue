<template>
  <div class="shelf-component col-12 my-2">
    <router-link class="shelf bg-white shadow" :to="{name: 'ShelfDetailsPage', params:{id: shelf.id}}">
      <div class="col-md-10 shelf mb-1 mt-1 d-flex align-items-center pl-4">
        <span class="shelf-title">
          {{ shelf.title }}
        </span>
      </div>
      <div class="col-md-2 d-flex flex-end align-items-center  pr-4 justify-content-end">
        <i class="fas fa-chevron-right fa-2x"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ShelfComponent',
  props: {
    shelf: {
      type: Object,
      required: true
    }
  },
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
}
.shelf-title{
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1;
}

</style>
