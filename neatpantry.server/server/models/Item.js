import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Note = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

const Item = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number },
    expiration: { type: Date },
    quantity: { type: Number, default: 1 },
    creatorId: { type: String, ref: 'Account', required: true },
    shelfId: { type: ObjectId, ref: 'Shelf', required: true },
    householdId: { type: ObjectId, ref: 'Household', required: true },
    listId: { type: ObjectId, ref: 'ShoppingListItem' },
    notes: ''

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Item.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Item.post('find', async(docs) => {
  for (const doc of docs) {
    await doc.populate('notes.creator', 'name picture').execPopulate()
  }
})

export default Item
