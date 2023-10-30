const http = require('http')
const getUsers = require('./data/modules/getUsers');


const hostname = '127.0.0.1'
const port = 3003

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1')
  const searchParams = url.searchParams

  if (!searchParams.toString().length) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello, World!')
    response.statusCode = 200
    response.statusMessage = 'OK'
    response.setHeader('Content-Type', 'text/plain')
    response.write('Hello, World!')
    response.end()

    return
  }

  for (let [key, value] of searchParams.entries()) {
    switch (key) {
      case 'users':
        response.statusCode = 200
        response.statusMessage = 'OK'
        response.setHeader('Content-Type', 'application/json')
        response.write(getUsers())
        response.end()
        break
      case 'hello':
        if (value) {
          response.statusCode = 200
          response.statusMessage = 'OK'
          response.setHeader('Content-Type', 'text/plain')
          response.write(`Hello, ${value}.`)
          response.end()
        } else {
          response.statusCode = 400
          response.setHeader('Content-Type', 'text/plain')
          response.write('Enter a name')
          response.end()
        }
        break
      default:
        response.statusCode = 500
        response.end()
        break
    }
  }
})

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`)
})
