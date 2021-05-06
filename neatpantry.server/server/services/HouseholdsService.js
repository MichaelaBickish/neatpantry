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

  async delete(id, userId) {
    const data = await dbContext.Households.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Household Successfully Deleted!'
  }
}

export const householdsService = new HouseholdsService()
