// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((request, response) => {
//     const pathName = url.parse(request.url, true).pathname;

//     const getUsers = () => {
//         try {
//             const data = fs.readFileSync(path.join(__dirname, '../src/data/users.json'), 'utf8');
//             return data;
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     if (pathName === '/') {
//         response.writeHead(200, { 'Content-Type': 'text/plain' });
//         response.end('Hello, World!');
//     } else if (pathName === '/users' && request.method === 'GET') {
//         const data = getUsers();
//         if (data) {
//             response.writeHead(200, { 'Content-Type': 'application/json' });
//             response.end(data);
//         } 
//         else {
//             response.writeHead(500, { 'Content-Type': 'text/plain' });
//             response.end('Internal Server Error: Unable to read users.json file');
//         }
//     }
// });

// server.listen(3003, () => {
//     console.log('Server is running on ${ } port 3003');
// });
const http = require('http');
const getUsers = require("./modules/allUsers");

const hostName = "http://127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, hostName);
  const userName = url.searchParams.get("name");


  if (userName) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello ${userName}`);
    response.end();
    return;
  }


  switch (request.url) {
    case "/?users":
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "application/json");
      response.write(getUsers());
      response.end();
      break;


    case "/?name":
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Enter a name`);
      response.end();
      break;

    case "/":
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello world`);
      response.end();
      break;

    default:
      response.statusCode = 500;
      response.statusMessage = "Internal Server Error";
      response.setHeader("Content-Type", "text/plain");
      response.write("wrong");
      response.end();
      break;
  }
});


server.listen(port, () => {
    console.log(`сервер запущен по адресу ${hostName}:${port}`);
} )