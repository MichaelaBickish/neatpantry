import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class HouseholdsService {
  // async find(query = {}) {
  //   const values = await dbContext.Values.find(query)
  //   return values
  // }

  async findById(id) {
    const household = await dbContext.Households.findOne(id)
    if (!household) {
      throw new BadRequest('Invalid Household Id')
    }
    return household
  }

  async create(body) {
    return await dbContext.Households.create(body)
  }

  async edit(body) {
    const data = await dbContext.Households.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Household Successfully Edited'
  }

  async delete(householdId, userId) {
    const data = await dbContext.Households.findOneAndDelete({ _id: householdId, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Household Successfully Deleted!'
  }

  async deleteCollaborator(householdId, collaboratorId, userId) {
    const household = await this.findById(householdId)
    const collaborator = household.collaborator.id(collaboratorId)
    if (household.creatorId === household.id && collaborator === householdId) {
      // await dbContext.Households.findOneAndDelete({ _id: householdId, creatorId: userId })
      collaborator.remove()
      await household.save()
      return household
    }
    throw new BadRequest('Invalid Id')
  }

  async addCollaborator(householdId, body) {
    const updated = await dbContext.Households.findByIdAndUpdate({ _id: householdId }, { $push: { collaborator: body } }, { new: true })
    if (!updated) {
      throw new BadRequest('Invalid Id')
    }
    return await this.findById(householdId)
  }
}

export const householdsService = new HouseholdsService()
