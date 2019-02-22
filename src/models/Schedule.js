const mongoose = require('mongoose');
const {Schema} = mongoose;

const ScheduleSchema = new Schema({
  name: {type: String},
  date: {type: String},
  monday: {type: String, default: null},
  tuesday: {type: String, default: null},
  wednesday: {type: String, default: null},
  thursday: {type: String, default: null},
  friday: {type: String, default: null},
  saturday: {type: String, default: null},
  sunday: {type: String, default: null},
  user: {type: String}
});

module.exports = mongoose.model('Schedule', ScheduleSchema);