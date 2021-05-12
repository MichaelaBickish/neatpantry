import { AppState } from '../AppState'
import router from '../router.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class HouseholdsService {
  async getAllHouseholds() {
    const res = await api.get('api/households')
    AppState.households = res.data
  }

  async getHouseholdById(householdId) {
    const res = await api.get('api/households/' + householdId)
    logger.log('COME ON', res.data)
    AppState.activeHousehold = res.data
  }

  async createHousehold(data) {
    const res = await api.post('api/households', data)
    AppState.households.push(res.data)
    router.push({ name: 'PantryPage', params: { id: res.data.id } })
  }

  async joinHousehold(code) {
    // need new server function findServicebyPasscode()
    const res = await api.post(`api/households/${code}/collaborators`)
    AppState.households.push(res.data)
    router.push({ name: 'PantryPage', params: { id: res.data.id } })
  }
}

export const householdsService = new HouseholdsService()
