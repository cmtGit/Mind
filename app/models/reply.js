var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

var ReplySchema = new Schema({
  content: {type: String, required: true},
  created: {type: Date, default: Date.now},
  comment: {type: ObjectId, ref: 'Comment', required: true},
  responder: {type: ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Reply',ReplySchema);