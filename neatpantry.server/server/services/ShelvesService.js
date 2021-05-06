import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { isAuthorized } from '../utils/HouseAuth'

class ShelvesService {
  async find(query = {}) {
    const shelves = await dbContext.Shelves.find(query)
    return shelves
  }

  async findByShelfId(query) {
    const shelves = await dbContext.Shelves.findOne(query)
    if (!shelves) {
      throw new BadRequest('Invalid Shelf Id')
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

  async delete(householdId, userId) {
    await isAuthorized(userId, householdId)
    const data = await dbContext.Shelves.findOneAndDelete({ _id: householdId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Shelf Successfully Deleted!'
  }
}

export const shelvesService = new ShelvesService()
