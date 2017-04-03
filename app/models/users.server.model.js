var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
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

var User = mongoose.model('User', UserSchema);

var findUserByEmail = function(email, callback){
  User.findOne({ email: email}, callback);
};

var findUserById = function(id, callback){
  User.findById( id, callback);
}

var saveUser = function(user, callback){
  User.collection.insert(user, callback);
};


/*Compare password in db with user's input*/
 var comparePassword = function(password){
  if (this.password == password) return true;
  else return false;
};

//Random user's avatar
var avatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/'+ md5 + '?s=' + size + '%d=retro';
};


module.exports = {
  User: User,
  saveUser: saveUser,
  findUserByEmail: findUserByEmail,
  findUserById: findUserById,
  comparePassword: comparePassword,
  avatar: avatar
};
