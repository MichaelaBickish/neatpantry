import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class HouseholdsService {
  async findAll(query = {}) {
    return await dbContext.Households.find(query).populate('collaboratorsProfiles', 'name picture')
  }

  async findById(id) {
    const household = await dbContext.Households.findOne({ _id: id })
    if (!household) {
      throw new BadRequest('Invalid Household Id')
    }
    return household
  }

  async create(body) {
    const data = await dbContext.Households.create(body)
    return data
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

  // TODO reinstate stretch goal collaborator funcitons

  async deleteCollaborator(householdId, collaboratorId, userId) {
    const household = await this.findById(householdId)
    const found = household.collaborators.find(c => c === collaboratorId)
    if ((household.creatorId === userId || collaboratorId === userId) && found) {
      household.collaborators = household.collaborators.filter(c => c !== collaboratorId)
      await household.save()
      return household
    }
    throw new BadRequest('Invalid')
  }

  async joinHousehold(userId, householdId, passcode) {
    const household = await this.findById(householdId)
    const found = household.collaborators.find(c => c === userId)
    if (household.passcode === passcode && !found) {
      household.collaborators.push(userId)
      await household.save()
      return household
    }
    throw new BadRequest('Invalid')
  }
}

export const householdsService = new HouseholdsService()
