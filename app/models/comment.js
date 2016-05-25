var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
  content: {type: String, required: true},
  commentator: {type: ObjectId, ref: 'User', required: true},
  created: {type: Date, default: Date.now},
  type: {type: String, default: 'group'},
  replies: [{ type: ObjectId, ref: 'Reply' }],
  source: {type: String}
});

module.exports = mongoose.model('Comment',CommentSchema);