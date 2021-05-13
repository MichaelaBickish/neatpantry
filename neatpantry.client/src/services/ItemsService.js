import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ItemsService {
  async createItem(body) {
    // logger.log(body)
    await api.post('api/items', body)
    this.getItemsByShelfId(body.shelfId, body.householdId)
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
    logger.log(item)
    await api.delete('api/items/' + item.id)
  }
}

export const itemsService = new ItemsService()
