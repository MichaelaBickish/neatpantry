import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { isAuthorized } from '../utils/HouseAuth'

class ItemsService {
  async create(body, userId) {
    await isAuthorized(userId, body.householdId)
    return await dbContext.Items.create(body)
  }

  async edit(body, userId) {
    await isAuthorized(userId, body.householdId)
    const data = await dbContext.Items.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async delete(itemId, userId, householdId) {
    await isAuthorized(userId, householdId)
    const data = await dbContext.Items.findOneAndDelete({ _id: itemId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }

  async findItemsByShelfId(query = {}) {
    const shelves = await dbContext.Items.find(query)
    if (!shelves) {
      throw new BadRequest('Invalid Shelf Id')
    }
    return shelves
  }
}

export const itemsService = new ItemsService()
