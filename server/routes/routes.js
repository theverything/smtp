module.exports = [

  {
    path: "/",
    method: "GET",
    handler: function (request, reply) {
      console.log(request.url);
      reply.view("hello", request.url.query);
    }
  },

  {
    path: "/mail",
    method: "POST",
    handler: function (request, reply) {
      console.log(request.payload);
      reply("success");
    }
  }

];
