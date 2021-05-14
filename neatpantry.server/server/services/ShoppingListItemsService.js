import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { isAuthorized } from '../utils/HouseAuth'
class ShoppingListItemsService {
  async create(body, userId) {
    await isAuthorized(userId, body.householdId)
    return await dbContext.ShoppingListItems.create(body)
  }

  async getAll(query = {}) {
    const data = await dbContext.ShoppingListItems.find(query).populate('creator', 'name picture')
    return data
  }

  async edit(body, userId) {
    await isAuthorized(userId, body.householdId)
    const data = await dbContext.ShoppingListItems.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Edited'
  }

  async delete(householdId, userId, shoppinglistitemId) {
    await isAuthorized(userId, householdId)
    const data = await dbContext.ShoppingListItems.findOneAndDelete({ _id: shoppinglistitemId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const shoppingListItemsService = new ShoppingListItemsService()
