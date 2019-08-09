"use strict";

const net = require("net");
const files = require("./files.js");

const PORT = 8080;
let date = new Date();

let HTTPrequest = "";

const server = net.createServer(socket => {
  socket.on("data", chunk => {
    // parse the string
    let dataStuff = chunk.toString();
    let url = dataStuff.split("\n")[0];

    // grab the right file
    if (url.indexOf("/helium.html") !== -1) {
      HTTPrequest = `HTTP/1.1 200 OK\nServer: matrix/9.9.9\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${
        files.helium.length
      }\nConnection: keep-alive\n\n${files.helium}`;
    } else if (url.indexOf("/hydrogen.html") !== -1) {
      HTTPrequest = `HTTP/1.1 200 OK\nServer: matrix/9.9.9\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${
        files.hydrogen.length
      }\nConnection: keep-alive\n\n${files.hydrogen}`;
    } else if (
      url.indexOf("/index.html") !== -1 ||
      url.indexOf("GET / HTTP") !== -1
    ) {
      HTTPrequest = `HTTP/1.1 200 OK\nServer: matrix/9.9.9\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${
        files.index.length
      }\nConnection: keep-alive\n\n${files.index}`;
      console.log(HTTPrequest);
    } else if (url.indexOf("/styles.css") !== -1) {
      HTTPrequest = `HTTP/1.1 200 OK\nServer: matrix/9.9.9\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${
        files.styles.length
      }\nConnection: keep-alive\n\n${files.styles}`;
    } else {
      HTTPrequest = `HTTP/1.1 404 Page Not Found\nServer: matrix/9.9.9\nDate: ${date}\nContent-Type: text/html; charset=utf-8\nContent-Length: ${
        files.err404
      }\nConnection: keep-alive\n\n${files.err404}`;
    }

    // write outgoing data
    socket.write(HTTPrequest);
    socket.end();
  });

  socket.on("end", () => {
    // handle client disconnect
    console.log("Disconnected from server.");
  });

  socket.on("error", err => {
    // handle error in connection
    console.log("An error has occurred.");
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
