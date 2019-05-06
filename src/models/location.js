import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { stringify } from 'querystring';

const locationSchema = new Schema({
  name: {
    type: String,
    unique: true,
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

const