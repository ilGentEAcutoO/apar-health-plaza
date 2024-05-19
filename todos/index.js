const http = require('node:http');
const get = require("./actions/get");
const remove = require("./actions/remove")
const update = require("./actions/update")
const create = require("./actions/create")

const server = http.createServer(main)
server.listen(8585)

function main(request, response) {
  switch (request.method) {
    case "GET":
      return get(request, response)
    case "POST":
      return create(request, response)
    case "PUT":
      return update(request, response)
    case "DELETE":
      return remove(request, response)
    default:
      return response.end("Unsupported Method")
  }
}