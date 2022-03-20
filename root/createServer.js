var fs = require("fs");
var http = require("http");

var mimeTypes = {
  html: "text/html",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  json: "application/json",
  js: "text/javascript",
  css: "text/css",
};

http
  .createServer(function (req, res) {
    console.log("Listen on port: 8080");

    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      var mimeType = mimeTypes[req.url.split(".").pop()];
      
      if (!mimeType) {
        mimeType = "text/plain";
      }

      res.writeHead(200, { "Content-Type": mimeType });
      res.write(data, "binary");
      res.end();
    });
  })
  .listen(8080);
