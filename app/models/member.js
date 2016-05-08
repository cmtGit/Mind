var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var MemberSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true},
  created: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Member',MemberSchema);