const mongoose = require('mongoose');

const Post = mongoose.model('Post', mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
}));

export default Post;
