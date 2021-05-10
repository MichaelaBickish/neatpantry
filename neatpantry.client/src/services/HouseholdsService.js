import { AppState } from '../AppState'
import { api } from './AxiosService'
// import router from '../router.js'

class HouseholdsService {
  async createHousehold(data) {
    const res = await api.post('api/households', data)
    AppState.households.push(res.data)
    // router.push({ name: 'PantryPage', params: { id: res.data.id } })
  }
}

export const householdsService = new HouseholdsService()
