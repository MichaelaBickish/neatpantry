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

  async delete(itemId, userId) {
    // TODO get shelf
    const item = await this.findOneItem({ _id: itemId })
    // send shelf.householdId
    await isAuthorized(userId, item.householdId)
    const data = await dbContext.Items.findOneAndDelete({ _id: itemId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }

  async findItemsByShelfId(query = {}) {
    const items = await dbContext.Items.find(query)
    if (!items) {
      throw new BadRequest('Invalid Shelf Id')
    }
    return items
  }

  async findOneItem(query = {}) {
    const items = await dbContext.Items.findOne(query)
    if (!items) {
      throw new BadRequest('Invalid Shelf Id')
    }
    return items
  }
}

export const itemsService = new ItemsService()
