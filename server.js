const fs = require("fs");
const http = require("http");
const path = require("path");

const standaloneServerPath = path.join(__dirname, ".next", "standalone", "server.js");

if (!fs.existsSync(standaloneServerPath)) {
  // cPanel runs an "availability check" after installing modules. At that point
  // a build might not exist yet, and exiting here produces a 500.
  // Instead, start a tiny placeholder server so the health check succeeds.
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || "127.0.0.1";

  const message =
    "Build not found. Run `npm run build:cpanel` in the app root, then restart the Node.js app.";

  // eslint-disable-next-line no-console
  console.error("Missing `.next/standalone/server.js`.", message);

  const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.end(
        `<!doctype html><html><head><meta charset="utf-8"><title>Build pending</title></head><body><pre>${message}</pre></body></html>`,
      );
    });

  server.on("error", (err) => {
    // eslint-disable-next-line no-console
    console.error(`Placeholder server failed to listen on ${host}:${port}: ${err.message}`);
    process.exit(1);
  });

  server.listen(port, host);

  return;
}

process.chdir(path.dirname(standaloneServerPath));
// eslint-disable-next-line import/no-dynamic-require, global-require
require(standaloneServerPath);
