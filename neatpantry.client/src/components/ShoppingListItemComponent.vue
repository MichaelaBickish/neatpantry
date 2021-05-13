<template class="shopping-list-item-component">
  <tr>
    <th scope="row">
      <input type="checkbox"
             class="check-one-checkbox cursor-pointer"
             id="check-one-box"
             name="check-one-box"
             title="Check This Item"
      >
    </th>
    <td>{{ item.title }}</td>
    <td>{{ item.creator }}</td>

    <td><input type="number" title="Enter Quantity" placeholder="#..." min="1" style="max-width:80px;">{{ item.quantity }}</td>

    <td><i class="fa fa-trash text-danger cursor-pointer" aria-hidden="true" title="Remove Item From Shopping List"></i></td>
  </tr>
</template>

<script>
export default {
  name: 'ShoppingListItemComponent',
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
