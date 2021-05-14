import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { shoppingListItemsService } from '../services/ShoppingListItemsService'

export class ShoppingListItemsController extends BaseController {
  constructor() {
    super('api/shoppinglistitems')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await shoppingListItemsService.create(req.body, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await shoppingListItemsService.edit(req.body, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await shoppingListItemsService.getAll(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
