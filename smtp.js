var mailin = require('mailin');

/* Event emitted when a connection with the Mailin smtp server is initiated. */
mailin.on('startMessage', function (messageInfo) {
  /* messageInfo = {
      from: 'sender@somedomain.com',
      to: 'someaddress@yourdomain.com',
      connectionId: 't84h5ugf'
  }; */
  console.log(messageInfo);
});

/* Event emitted after a message was received and parsed.
 * The message parameters contains the parsed email. */
mailin.on('message', function (message) {
  console.log(message);
  /* Do something useful with the parsed message here.
   * Use it directly or modify it and post it to a webhook. */
});

module.exports = mailin;
