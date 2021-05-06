import mongoose from 'mongoose'
const Schema = mongoose.Schema

// NOTE in case collaborators IS a subdoc??
// const Collaborator = new Schema(
//   {
//     body: { type: String, required: true },
//     creatorId: { type: String, ref: 'Account', required: true }
//   },
//   { timestamps: true, toJSON: { virtuals: true } }
// )
// Collaborator.virtual('creator', {
//   localField: 'creatorId',
//   ref: 'Account',
//   foreignField: '_id',
//   justOne: true
// })

const Household = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    collaborators: ['']
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Household.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// NOTE in case collaborators IS a subdoc??
// Household.post('find', async(docs) => {
//   for (const doc of docs) {
//     await doc.populate('collaborators.creator', 'name picture').execPopulate()
//   }
// })

export default Household
