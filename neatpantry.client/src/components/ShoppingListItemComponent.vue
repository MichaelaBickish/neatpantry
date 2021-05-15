<template class="shopping-list-item-component">
  <tr>
    <th scope="row" class="item-row">
      <input type="checkbox"
             class="check-one-box cursor-pointer"
             id="check-one-box"
             name="check-one-box"
             title="Check This Item"
             :checked="state.shoppingListItemsAreChecked"
             v-model="item.selected"
      >
    </th>
    <td>{{ item.title }}</td>
    <td v-if="item.creator">
      {{ item.creator.name }}
    </td>

    <td>
      <input type="number"
             title="Enter Quantity"
             placeholder="#..."
             min="1"
             style="max-width:80px;"
             :value="item.quantity"
      >
    </td>

    <td><i class="fa fa-trash text-danger cursor-pointer" aria-hidden="true" title="Remove Item From Shopping List" @click="deleteShoppingListItem(item)"></i></td>
  </tr>
</template>

<script>
import Notification from '../utils/Notification'
import { shoppingListItemsService } from '../services/ShoppingListItemsService'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'ShoppingListItemComponent',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      shoppingListItemsAreChecked: computed(() => AppState.shoppingListItemsAreChecked)
    })
    return {
      state,
      async deleteShoppingListItem() {
        try {
          if (await Notification.confirmAction()) {
            await shoppingListItemsService.deleteShoppingListItem(props.item)
            Notification.toast('Item Successfully Deleted!', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
