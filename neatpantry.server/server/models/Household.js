import mongoose from 'mongoose'
import { makePasscode } from '../utils/GenerateId'
const Schema = mongoose.Schema

const Household = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    collaborators: [{ type: String }],
    passcode: { type: String, default: makePasscode() }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Household.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Household
