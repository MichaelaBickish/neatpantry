import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { isAuthorized } from '../utils/HouseAuth'

class ShelvesService {
  async find(query = {}) {
    const shelves = await dbContext.Shelves.find(query)
    return shelves
  }

  async findByShelfId(id) {
    const shelves = await dbContext.Shelves.findOne({ _id: id })
    if (!shelves) {
      throw new BadRequest('Invalid')
    }
    return shelves
  }

  async create(body, userId) {
    await isAuthorized(userId, body.householdId)
    return await dbContext.Shelves.create(body)
  }

  async edit(body, userId) {
    await isAuthorized(userId, body.householdId)
    const data = await dbContext.Shelves.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Shelf Successfully Edited'
  }

  async delete(householdId, shelfId, userId) {
    await isAuthorized(userId, householdId)
    const data = await dbContext.Shelves.findOneAndDelete({ _id: shelfId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Shelf Successfully Deleted!'
  }
}

export const shelvesService = new ShelvesService()
