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

const ShoppingListItem = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    itemId: { type: ObjectId, ref: 'Item', required: true },
    householdId: { type: ObjectId, ref: 'Household', required: true },
    quantity: { type: Number, default: 1 },
    wishlist: { type: Boolean, default: false },
    notes: [Note]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// FIXME
ShoppingListItem.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
// FIXME virtual needed for Item and Household
// copy the section and replace lines with the model value as well as the reference name

ShoppingListItem.post('find', async(docs) => {
  for (const doc of docs) {
    await doc.populate('notes.creator', 'name picture').execPopulate()
  }
})

export default ShoppingListItem
