// const http = require("http");
// const getUsers = require("./data/modules/getUsers.js");
// const getBooks = require("./data/modules/getBooks.js");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const route = require("../src/routes/routes");
const bodyParser = require("body-parser");

dotenv.config();
const {
  PORT = 3000,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://127.0.0.1:27017/backendHW",
} = process.env;

const server = express();

mongoose
.connect(MONGO_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));



const helloWorld = (request, response) => {
  sendResponse(response, 200, "OK", "text/plain", "Hello, World!");
};

server.use(cors());

server.use(bodyParser.json());

server.get("/", helloWorld);

// const server = http.createServer((request, response) => {
//   const url = new URL(request.url, 'http://127.0.0.1')
//   const searchParams = url.searchParams

//   if (!searchParams.toString().length) {
//     sendResponse(response, 200, 'OK', 'text/plain', 'Hello, World!');
//     return;
//   }

//   for (let [key, value] of searchParams.entries()) {
//     switch (key) {
//       case 'users':
//         sendResponse(response, 200, 'OK', 'application/json', getUsers());
//         break;
//         case 'books':
//           sendResponse(response, 200, 'OK', 'application/json', getBooks());
//           break;
//       case 'hello':
//         if (value) {
//           sendResponse(response, 200, 'OK', 'text/plain', `Hello, ${value}.`);
//         } else {
//           sendResponse(response, 400, 'Bad Request', 'text/plain', 'Enter a name');
//         }
//         break;
//       default:
//         sendResponse(response, 500, 'Bad Request', 'text/plain', ' ');
//         break;
//     }
//   }
// });

function sendResponse(response, statusCode, statusMessage, contentType, data) {
  response.statusCode = statusCode;
  response.statusMessage = statusMessage;
  response.setHeader("Content-Type", contentType);
  response.write(data);
  response.end();
}

server.use(route);

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://${API_URL}:${PORT}/`);
});
