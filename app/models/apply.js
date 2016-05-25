var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var ApplySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  group: { type: Schema.Types.ObjectId, ref: 'Group'},
  note: { type: String, required: true},
  reason: { type: String},
  result: { type: String},
  created: { type: Date, default: Date.now},
  updated: { type: Date, default: Date.now}
});


module.exports = mongoose.model('Apply', ApplySchema);