import { AppState } from '../AppState'
import router from '../router.js'
import { api } from './AxiosService'

class HouseholdsService {
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

  async getAllHouseholds() {
    const res = await api.get('api/households')
    AppState.households = res.data
  }
}

export const householdsService = new HouseholdsService()
