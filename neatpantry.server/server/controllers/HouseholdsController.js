import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { householdsService } from '../services/HouseholdsService'
import { makePasscode } from '../utils/GenerateId'

export class HouseholdsController extends BaseController {
  constructor() {
    super('api/households')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getByHouseholdId)
      .post('', this.create)
      .put('/:id', this.edit)
      .post('/:id/collaborators/', this.addCollaborator)
      .delete('/:id/collaborators/:collaboratorId', this.deleteCollaborator)
      .delete('/:id', this.delete)
  }

  async addCollaborator() {
    // expect incoming object, that has a house id(params, userinfoid) body has passcode.
  }
  // service find house, verify passcode, push id to callaborator arrray and save it.

  async deleteCollaborator() {

  }

  async getByHouseholdId(req, res, next) {
    try {
      // TODO authentication and rules
      const data = await householdsService.findById({ _id: req.params.id }) // TODO How to authenticate a collaborator's token
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.passcode = makePasscode()
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await householdsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      delete req.body.collaborators
      const data = await householdsService.edit(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await householdsService.delete(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
