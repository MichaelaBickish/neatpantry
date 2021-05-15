import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

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

  async purchaseItems() {
    // take shopping list item quantity and add it to item quantity.
    // then remove item off shopping list.
  }
}

export const shoppingListItemsService = new ShoppingListItemsService()
