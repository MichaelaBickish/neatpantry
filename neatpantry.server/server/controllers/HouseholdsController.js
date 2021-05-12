import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { householdsService } from '../services/HouseholdsService'
import { shelvesService } from '../services/ShelvesService'
import { makePasscode } from '../utils/GenerateId'

export class HouseholdsController extends BaseController {
  constructor() {
    super('api/households')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getByHouseholdId)
      // .get('/:passcode/passcode', this.getByHouseholdPasscode)
      .get('/:id/shelves', this.getShelvesByHouseholdId)
      .post('', this.create)
      .put('/:id', this.edit)
      .post('/:passcode/collaborators', this.joinHousehold)
      .delete('/:id/collaborators/:collaboratorId', this.deleteCollaborator)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await householdsService.findAll({ collaborators: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getShelvesByHouseholdId(req, res, next) {
    try {
      const data = await shelvesService.findShelvesByHouseholdId({ householdId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async joinHousehold(req, res, next) {
    try {
      const data = await householdsService.joinHousehold(req.userInfo.id, req.params.passcode) // NOTE added .userId
      return res.send(data)
    } catch (error) {
      next(error)
    }
    // expect incoming object, that has a house id(params, userinfoid) body has passcode.
  }
  // service find house, verify passcode, push id to callaborator arrray and save it.

  async deleteCollaborator(req, res, next) {
    try {
      const household = await householdsService.deleteCollaborator(req.params.id, req.params.collaboratorId, req.userInfo.id)
      res.send({ message: 'collaborator removed', data: household })
    } catch (error) {
      next(error)
    }
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

  // async getByHouseholdPasscode(req, res, next) {
  //   try {
  //     const data = await householdsService.findByPasscode(req.params.passcode) // TODO How to authenticate a collaborator's token
  //     return res.send(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async create(req, res, next) {
    try {
      req.body.passcode = makePasscode()
      req.body.collaborators = [req.userInfo.id]
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
