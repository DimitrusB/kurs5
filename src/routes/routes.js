const { application } = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/users");
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");
const logger = require("../middleware/logger");

const route = require("express").Router();
route.use(logger)

route.get("/users", getUsers);
route.get("/users/:user_id", getUser);
route.post("/users", createUser);
route.patch("/users/:user_id", updateUser);
route.delete("/users/:user_id", deleteUser);

route.get("/books", getBooks);
route.get("/books/:book_id", getBook);
route.post("/books", createBook);
route.patch("/books/:book_id", updateBook);
route.delete("/books/:book_id", deleteBook);

module.exports = route;
