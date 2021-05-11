import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Shelf = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    householdId: { type: ObjectId, ref: 'Household', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Shelf.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Shelf
