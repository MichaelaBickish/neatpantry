import { AppState } from '../AppState'
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
    debugger
    await api.delete('api/shelves/' + activeShelf.id)
    this.getShelvesByHouseholdId(activeShelf.householdId)

    // AppState.shelves = AppState.shelves.filter(s => s.id !== activeShelf.id)
  }
}

export const shelvesService = new ShelvesService()
