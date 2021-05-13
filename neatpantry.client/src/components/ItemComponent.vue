<template>
  <div class="item-component">
    item hello
    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <!-- NOTE Step1 bind the data target and add the item.id -->
            <button class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    :data-target="'#collapseOne'+ item.id"
                    aria-expanded="true"
                    aria-controls="collapseOne"
            >
              {{ item.title }}
            </button>
          </h2>
        </div>
        <!-- NOTE step2 bind the thing thats being targeted the :id and add the same thing minus the # -->
        <div :id="'collapseOne'+ item.id" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            <span> Quantity:  {{ item.quantity }}

            </span>
            <!-- Add bttns increase by one or decrease by1 -->

            <div>
              <i class="fas fa-plus" title="Add 1"></i>
            </div>
            <div>
              <i class="fas fa-minus" title="Remove 1"></i>
            </div>
            <row class="editItem ">
              <div class="col d-flex align-items-end justify-content-end">
                //TODO Edit Item function modal
                <button type="button" class="btn btn-outline-primary">
                  Edit Item
                </button>
              </div>
            </row>
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
