var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var InformDetailSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  inform: { type: Schema.Types.ObjectId, ref: 'Inform', required: true},
  readed: { type: Number, default: 0}
});

module.exports = mongoose.model('InformDetail',InformDetailSchema);