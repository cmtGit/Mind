var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InformSchema = new Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  type: { type: Number, required: true, default: 0},
  created: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Inform',InformSchema);