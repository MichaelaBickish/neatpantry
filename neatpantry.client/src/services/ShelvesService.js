import { AppState } from '../AppState'
import router from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
class ShelvesService {
  async createShelf(body) {
    const res = await api.post('api/shelves', body)
    router.push({ name: 'ShelfDetailsPage', params: { id: res.data.id } })
    // this.getAllShelves()
  }

  async activeHousehold(householdId) {
    const res = await api.get('api/households/' + householdId)
    AppState.activeHousehold = res.data
    logger.log(res.data)
  }

  async getShelvesByHouseholdId(id) {
    const res = await api.get(`api/households/${id}/shelves`)
    // logger.log(res.data)
    AppState.shelves = res.data
  }
}

export const shelvesService = new ShelvesService()
