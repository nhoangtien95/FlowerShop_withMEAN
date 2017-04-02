var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Categories = new Schema({
  name:{
    type: String,
    unique: true
  },
  level:{
    type: Number
  }
});
