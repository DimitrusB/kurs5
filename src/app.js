const http = require('http')
const getUsers = require('./data/modules/getUsers.js');
const { hostname } = require('os');



const port = 3003

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1')
  const searchParams = url.searchParams


  if (!searchParams.toString().length) {
    sendResponse(response, 200, 'OK', 'text/plain', 'Hello, World!');
    return;
  }

  for (let [key, value] of searchParams.entries()) {
    switch (key) {
      case 'users':
        sendResponse(response, 200, 'OK', 'application/json', getUsers());
        break;
      case 'hello':
        if (value) {
          sendResponse(response, 200, 'OK', 'text/plain', `Hello, ${value}.`);
        } else {
          sendResponse(response, 400, 'Bad Request', 'text/plain', 'Enter a name');
        }
        break;
      default:
        sendResponse(response, 500, 'Bad Request', 'text/plain', ' ');
        break;
    }
  }
});

function sendResponse(response, statusCode, statusMessage, contentType, data) {
  response.statusCode = statusCode;
  response.statusMessage = statusMessage;
  response.setHeader('Content-Type', contentType);
  response.write(data);
  response.end();
}
server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`)
})



