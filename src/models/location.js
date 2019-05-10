import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const locationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  totalMale: {
    type: Number,
    required: true
  },
  totalFemale: {
    type: Number,
    required: true,
  },
  subLocations: [{
    type: Schema.Types.ObjectId,
    ref: 'location'
  }],
  parentLocation: {
    type: Schema.Types.ObjectId,
    ref: 'location'
  }
}, {
  toObject: { virtuals: true},
  toJSON: { virtuals: true }
});

locationSchema.plugin(mongoosePaginate);

locationSchema.virtual('totalPopulation').get(function () {
  return this.totalFemale + this.totalMale;
})

// locationSchema.methods.getTotalMale = function () {
//   const subLocations = this.subLocations;

//   if (subLocations.length > 0) {
//     const totalMale = subLocations.reduce((total, subLocation) => {
//       return subLocation.totalMale + total;
//     }, 0);

//     return totalMale;
//   }

//   return this.totalMale;
// }

const Location = mongoose.model('location', locationSchema);

export default Location;
