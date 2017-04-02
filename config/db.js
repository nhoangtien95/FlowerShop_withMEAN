var mongoose = require('mongoose');
var secret = require('./secret');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://tien:123@ds147920.mlab.com:47920/flowershop', function(err){
  if (err)
  {
    console.log(err);
  } else {
    console.log('Database connected');
  }
});
