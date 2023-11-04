const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  author: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: Number,
    required: true,
    minLength: 4,
  },
});

module.exports = mongoose.model("book", bookSchema);