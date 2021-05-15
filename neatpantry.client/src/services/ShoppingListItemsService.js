import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
// import { itemsService } from './ItemsService'

class ShoppingListItemsService {
  async createShoppingListItem(body) {
    const res = await api.post('api/shoppinglistitems', body)
    AppState.shoppingListItems = [...AppState.shoppingListItems, res.data]
    await this.getAllShoppingListItems()
  }

  async getAllShoppingListItems() {
    const res = await api.get('api/shoppinglistitems')
    logger.log('this is shopping list items', res.data)
    AppState.shoppingListItems = res.data
  }

  async deleteShoppingListItem(item) {
    await api.delete('api/households/' + item.householdId + '/shoppinglistitems/' + item.id)
    AppState.shoppingListItems = AppState.shoppingListItems.filter(i => i.id !== item.id)

    return 'Successfully Deleted!'
  }

  async purchaseItems(selected) {
    // iterate over each object. ||||| take shopping list item quantity and add it to item quantity.||||then remove item off shopping list.
    debugger
    for (let i = 0; i < selected.length; i++) {
      // console.log(selected[i])
      // in server, use a forEach item, get item, bring it back. take that items quantity that we found and add to it the selecteditem.quantity.

      // this.deleteShoppingListItem(selected[i])
    }
  }
}

export const shoppingListItemsService = new ShoppingListItemsService()
