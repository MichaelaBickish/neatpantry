import router from '../router'
import { api } from './AxiosService'
class ShelvesService {
  async createShelf(body) {
    const res = await api.post('api/shelves', body)
    router.push({ name: 'ShelfDetailsPage', params: { id: res.data.id } })
    // this.getAllShelves()
  }
}

export const shelvesService = new ShelvesService()
