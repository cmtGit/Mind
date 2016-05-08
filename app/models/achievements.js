var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AchievementsSchema = new Schema({
  title: { type: String, required: true},
  content: { type: String, required: true},
  publiced: { type: Number, required: true, default: 0},
  type: { type: Number, required: true, default: 0},
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true},
  announcer: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  created: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Achievements',AchievementsSchema);

