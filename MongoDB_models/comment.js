// This script contains the Mongoose's Schema for comments
var mongoose = require("mongoose")

var commentSchema = new mongoose.Schema({
  content: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: {type: Date, default: Date.now}
})

// Sets the dateCreated parameter equal to the current time
commentSchema.pre('save', function(next){
    now = new Date();
    this.dateUpdated = now;
    if(!this.dateCreated) {
        this.dateCreated = now
    }
    next();
});

module.exports = mongoose.model("Comment", commentSchema)
