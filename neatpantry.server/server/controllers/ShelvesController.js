import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { shelvesService } from '../services/ShelvesService'
import BaseController from '../utils/BaseController'

export class ShelvesController extends BaseController {
  constructor() {
    super('api/shelves')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // .get('', this.getAll)
      .get('/:id', this.getByShelfId)
      .get('/:id/items', this.getItemsByShelfId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  // async getAll(req, res, next) {
  //   try {
  //     const data = await shelvesService.find(req.query)
  //     return res.send(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getByShelfId(req, res, next) {
    try {
      const data = await shelvesService.findByShelfId({ _id: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getItemsByShelfId(req, res, next) {
    try {
      // TODO authentication and rules
      const data = await itemsService.findItemsByShelfId({ shelfId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await shelvesService.create(req.body, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await shelvesService.edit(req.body, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id

      const data = await shelvesService.delete(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
