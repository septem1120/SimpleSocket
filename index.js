const { createServer } = require("http");
const url = require('url');
const { Server } = require("socket.io");

const httpServer = createServer(function (request, response) {
  const path = url.parse(request.url).pathname;

  switch (path) {
    case '/':
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write('I don\'t need to reload~');
      response.end();

      // let json = JSON.stringify({
      //     "heee":123
      // });
      // response.write(json);
      // response.end();
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
});
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log("connection!!");

  socket.on("message", (cmd) => {

    console.log("收到Client傳:" + cmd);

    let array = cmd.split(' ');
    let key = array[0];
    let value = array[1];


    if (value) {
      let json = JSON.parse(value);
      console.log(json);
    }

    switch (key) {
      case "SM_start":
        socket.emit("message", "SM_start " + JSON.stringify({
          "item": [11, 12, 13]
        }));
        break;

    }

  });
});

const sendCmdToClient = function () {

};

httpServer.listen(3000);