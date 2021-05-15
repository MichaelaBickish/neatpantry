import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { shoppingListItemsService } from './ShoppingListItemsService'

class ItemsService {
  async createItem(body) {
    const res = await api.post('api/items', body)
    this.getItemsByShelfId(body.shelfId, body.householdId)
    // logger.log(body)
    // if checkbox is checked, add item to shopping list.
    if (body.addToShoppingList === true) {
      body.itemId = res.data.id
      body.quantity = 1
      // NOTE is this where we would assign body's properties (which are items properties) to the new ShoppingListItem's properties
      await shoppingListItemsService.createShoppingListItem(body)
    }
  }

  async activeShelf(shelfId) {
    const res = await api.get('api/shelves/' + shelfId)
    AppState.activeShelf = res.data
  }

  async getItemsByShelfId(id) {
    const res = await api.get('api/shelves/' + id + '/items')
    AppState.items = res.data
    logger.log(res.data)
  }

  async moveItem(item, shelfId) {
    const oldShelfId = item.shelfId
    item.shelfId = shelfId
    await api.put('api/items/' + item.id, item)
    this.getItemsByShelfId(oldShelfId)
    this.getItemsByShelfId(item.shelfId)
  }

  async saveEdit(item) {
    await api.put('api/items/' + item.id, item)
  }

  async deleteItem(item) {
    const shelfId = item.shelfId
    logger.log(item)
    await api.delete('api/items/' + item.id)
    this.getItemsByShelfId(shelfId)
  }

  async setToAutoAdd() {
    // take in the item
    // check if it is within auto add []
    // compare the quantity vs threshold if quantity is at or lower than threshold

    // trigger the add item to shopping list item method shoppingListItemsService
  }
}

export const itemsService = new ItemsService()
