
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = Number(process.env.DATABRICKS_APP_PORT || process.env.PORT || 8000);

const server = http.createServer((req, res) => {
  if (req.url !== "/" && req.url !== "/index.html") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Unable to load Focus Lab");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Focus Lab running on port ${port}`);
});
