var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName : { type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true},
  level: { type: Number, default: 0},
  sex: { type: Number, default: 0},
  industry: { type: String},
  birthdate: { type: Date},
  created: { type: Date, default: Date.now},
  profile: { type: String}
});

module.exports = mongoose.model('User',UserSchema);