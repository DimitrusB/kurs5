const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    const pathName = url.parse(request.url, true).pathname;

    const getUsers = () => {
        try {
            const data = fs.readFileSync(path.join(__dirname, '../src/data/users.json'), 'utf8');
            return data;
        } catch (err) {
            console.error(err);
        }
    };

    if (pathName === '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello, World!');
    } else if (pathName === '/users' && request.method === 'GET') {
        const data = getUsers();
        if (data) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(data);
        } 
        else {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error: Unable to read users.json file');
        }
    }
});

server.listen(3003, () => {
    console.log('Server is running on ${ } port 3003');
});
