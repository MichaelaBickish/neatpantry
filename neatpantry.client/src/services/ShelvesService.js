import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'
class ShelvesService {
  async createShelf(body) {
    await api.post('api/shelves', body)
    // logger.log(res.data)
    // router.push({ name: 'ShelfDetailsPage', params: { id: res.data.id } })
    this.getShelvesByHouseholdId(body.householdId)
  }

  async activeHousehold(householdId) {
    const res = await api.get('api/households/' + householdId)
    AppState.activeHousehold = res.data
    // logger.log(res.data)
  }

  async getShelvesByHouseholdId(id) {
    const res = await api.get(`api/households/${id}/shelves`)
    // logger.log(res.data)
    AppState.shelves = res.data
  }

  async deleteShelf(activeShelf) {
    const householdId = activeShelf.householdId
    await api.delete('api/shelves/' + activeShelf.id)
    router.push({ name: 'PantryPage', params: { id: householdId } })
    this.getShelvesByHouseholdId(activeShelf.householdId)
    // AppState.shelves = AppState.shelves.filter(s => s.id !== activeShelf.id)
  }

  async saveEdits(shelf) {
    await api.put(`api/shelves/${shelf.id}`, shelf)
  }
}

export const shelvesService = new ShelvesService()
