import { AppState } from '../AppState'
import router from '../router.js'
import { api } from './AxiosService'

class HouseholdsService {
  async getAllHouseholds() {
    const res = await api.get('api/households')
    AppState.households = res.data
  }

  async getHouseholdById(householdId) {
    const res = await api.get('api/households/' + householdId)
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
  // '/:id/collaborators/:collaboratorId'

  async deleteHouseholdCollaborator(householdId, collaboratorId) {
    await api.delete(`api/households/${householdId}/collaborators/${collaboratorId}`)
    await this.getHouseholdById(householdId)
  }

  async deleteHousehold(id) {
    await api.delete('api/households/' + id)
    router.push({ name: 'HouseholdsPage' })
  }
}

export const householdsService = new HouseholdsService()
