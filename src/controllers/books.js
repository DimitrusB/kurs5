const { request, response } = require("express");
const Book = require('../models/book');

const getBooks = (request, response) => {
  Book.find({})
      .then(book => {
        response.status(200).send(book);
      })
      .catch(e => {
        response.status(500).send(e.message);
      });
}

const getBook = (req, res) => {
  const { user_id } = req.params;
  Book.findById(user_id)
      .then(book => {
          res.status(200).send(book);
      })
      .catch(e => {
          res.status(500).send(e.message);
      });
}

const createBook = (request, response) => {
  const data = request.body;
  Book.create(data)
      .then(book => {
        response.status(201).send(book);
      })
      .catch(e => {
        response.status(500).send(e.message);
      });
}

const updateBook = (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  Book.findByIdAndUpdate(user_id, data, { new: true, runValidators: true })
      .then(book => {
          res.status(200).send(book);
      })
      .catch(e => {
          res.status(500).send(e.message);
      });
}

const deleteBook = (req, res) => {
  const { user_id } = req.params;
  Book.findByIdAndDelete(user_id)
      .then(book => {
          res.status(200).send("Done");
      })
      .catch(e => {
          res.status(500).send(e.message);
      });
}
module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
