
const fs = require("fs");
const path = require("path");
const books = require("../books.json");

const addBook = (country) => {
  const filePath = path.join(__dirname, "../selectedBooks.json");
  const target = books.find((book) => book.country === country);
  fs.writeFile(filePath, target);
};

module.exports = addBook;