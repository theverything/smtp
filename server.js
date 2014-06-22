var Hapi = require('hapi');
var Store = require('./data');
var routes = require('./routes');

var server_options = {
  views: {
    engines: { html: require("handlebars") },
    path: __dirname + "/views"
  }
}

var server = new Hapi.Server(8080, "localhost", server_options);

server.route(routes);

module.exports = server;
