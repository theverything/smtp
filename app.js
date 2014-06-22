var server = require('./server/server');
//var mailin = require('./server/smtp');

server.start(function () {
  console.log("Hapi server started @", server.info.uri);
});


/* Start the Mailin server. The available options are:
 *  options = {
 *     port: 25,
 *     webhook: 'http://mydomain.com/mailin/incoming,
 *     disableWebhook: false,
 *     logFile: '/some/local/path'
 *  };
 * Here disable the webhook posting so that you can do what you want with the
 * parsed message. */
// mailin.start({
//   port: 25,
//   disableWebhook: true // Disable the webhook posting.
// });
