const http = require('http');
const url = require('url');
// const hostanme = 127.0.0.1
const { hostname } = require('os');
const users = require('../src/data/users.json');
const getUsers = require('./data/modules/getUsers');
const port = 3003;

const getUserByName = (name) => users.find(user => user.name === name);

const server = http.createServer((request, response) => {
    const reqUrl = url.parse(request.url, true);
    const pathName = reqUrl.pathname;
    const userName = reqUrl.query.userName;
    const user = getUserByName(userName);
    

    if (pathName === '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello, World!')
    } else if (pathName === '/users') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(getUsers());
    } else if (pathName === '/hello') {
        if (!userName) {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end('Enter a name');
        } else if (user) {
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(`Hello, ${user.name}!`);}
            //  else {
        //     response.writeHead(404, { 'Content-Type': 'text/plain' });
        //     response.end('No user found with this name.');
        // }
    } else {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end(' ');
    }
});


server.listen(port, () => {
    console.log(`Server is running on http://${hostname()}:${port}`);
});
