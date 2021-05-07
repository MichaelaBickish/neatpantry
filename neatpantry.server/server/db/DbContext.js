import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import HouseholdSchema from '../models/Household'
import ShelfSchema from '../models/Shelf'
import ItemSchema from '../models/Item'
import ShoppingListItemSchema from '../models/ShoppingListItem'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Households = mongoose.model('Household', HouseholdSchema);

  Shelves = mongoose.model('Shelf', ShelfSchema);
  Items = mongoose.model('Item', ItemSchema);

  ShoppingListItems = mongoose.model('ShoppingListItem', ShoppingListItemSchema)
}

export const dbContext = new DbContext()
