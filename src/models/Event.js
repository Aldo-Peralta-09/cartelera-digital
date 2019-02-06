const mongoose = require('mongoose');
const {Schema} = mongoose;

const EventSchema = new Schema({
  title: {type: String},
  description: {type: String},
  discipline: {type: String},
  category: {type: String},
  type: {type: String},
  hierarchy: {type: String},
  event: {type: String},
  start: {type: String},
  finish: {type: String},
  dates: {type: String},
  municipality: {type: String},
  place: {type: String},
  organizer: {type: String},
  speaker: {type: String},
  url: {type: String},
  entry: {type: String},
  price: {type: String},
  discount: {type: String},
  public: {type: String},
  especificPublic: {type: String},
  gender: {type: String},
  //banner: {type: String},
  image: {type: String},
  date: {type: Date, default: Date.now()},
  user: {type: String}
});

module.exports = mongoose.model('Event', EventSchema);
