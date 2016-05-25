var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: { type: String, required: true, unique: true},
  description: { type: String, required: true},
  creator: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  created: { type: Date, default: Date.now},
  fever: { type: Number, default: 0},
  share: { type: Number, default: 0},
  follow: { type: Number, default: 0}
});

module.exports = mongoose.model('Group',GroupSchema);