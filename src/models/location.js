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
  totalPopulation: {
    type: Number,
    required: true
  },
  subLocation: [{
    type: String
  }]
});

locationSchema.plugin(mongoosePaginate);

const Location = mongoose.model('location', locationSchema);

export default Location;
