const mongoose = require('mongoose');

const newsCardSchema = new mongoose.Schema({
  fonte: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  keyword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('newsCard', newsCardSchema);
