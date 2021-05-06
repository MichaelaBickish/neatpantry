import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { isAuthorized } from '../utils/HouseAuth'
class ShoppingListItemsService {
  async create(body, userId) {
    await isAuthorized(userId, body.householdId)
    return await dbContext.Items.create(body)
  }

  async getAll(query = {}) {
    const data = await dbContext.ShoppingListItems(query)
    return data
  }

  async edit(body, userId) {
    await isAuthorized(userId, body.householdId)
    const data = await dbContext.Items.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async delete(householdId, userId) {
    await isAuthorized(userId, householdId)
    const data = await dbContext.Items.findOneAndDelete({ _id: householdId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const shoppingListItemsService = new ShoppingListItemsService()
