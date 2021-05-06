import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import HouseholdSchema from '../models/Household'
import ShelfSchema from '../models/Shelf'
import ItemSchema from '../models/Item'
import ShoppingListItemSchema from '../models/ShoppingListItem'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Households = mongoose.model('Household', HouseholdSchema);

  Shelves = mongoose.model('Shelf', ShelfSchema);
  Items = mongoose.model('Item', ItemSchema);

  ShoppingListItems = mongoose.model('ShoppingListItem', ShoppingListItemSchema)
}

export const dbContext = new DbContext()
