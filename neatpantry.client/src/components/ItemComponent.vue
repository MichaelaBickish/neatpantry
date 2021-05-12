<template>
  <div class="item-component">
    item hello
    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
            >
              {{ item.title }}
            </button>
          </h2>
        </div>
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> class.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemComponent',
  props: {
    item: {
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

</style>
