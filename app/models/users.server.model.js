var mongoose = require('mongoose');

var User = new mongoose.Schema({
  profile:{
    name: {
      type: String,
      default: ''
    },

    avatar:{
      type: String,
      default: ''
    },

    address: String
  },

  email:{
    type: String,
    unique: true
  },

  password: String
});

/*Compare password in db with user's input*/
User.methods.comparePassword = function(password){
  if (this.password == password) return true;
  else return false;
}

//Random user's avatar
User.methods.avatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/'+ md5 + '?s=' + size + '%d=retro';
}

module.exports = mongoose.model('User', User);
