import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
/**
 * Takes in userId and householdId and returns if the user is a collaborator
 * @param {String} id
 * @param {String} householdId
 * @returns {Boolean}
 */
export async function isAuthorized(id, householdId) {
  const house = await dbContext.Households.findOne({ _id: householdId })
  if (!house) {
    throw new BadRequest('Invalid House Id')
  }
  if (!house.collaborators.includes(id)) {
    throw new Forbidden('You are not a collaborator on this house!')
  }
  return true
}
