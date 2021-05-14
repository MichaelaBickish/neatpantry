import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ShoppingListItemsService {
  async toggleCheck(items) {
    document.getElementById('check-all-box').checked ? document.getElementById('check-one-box').checked = true : document.getElementById('check-one-box').checked = false
    // $('#check-all-box').click(function() {
    //   $('input[type=checkbox]').prop('checked', $(this).prop('checked'))
    // })
  }

  async createShoppingListItem(body) {
    debugger
    const res = await api.post('api/shoppinglistitems', body)
    AppState.shoppingListItems = [...AppState.shoppingListItems, res.data]
  }

  async getAllShoppingListItems() {
    const res = await api.get('api/shoppinglistitems')
    logger.log('this is shopping list items', res.data)
    AppState.shoppingListItems = res.data
  }
}

export const shoppingListItemsService = new ShoppingListItemsService()
