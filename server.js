const fs = require("fs");
const path = require("path");

const standaloneServerPath = path.join(__dirname, ".next", "standalone", "server.js");

if (!fs.existsSync(standaloneServerPath)) {
  // cPanel needs a stable startup file. This wrapper lets you keep `server.js`
  // as the startup file while still running the Next.js standalone server.
  // Build first: `npm run build:cpanel`
  // Then restart the Node app.
  // eslint-disable-next-line no-console
  console.error(
    "Missing `.next/standalone/server.js`. Run `npm run build:cpanel` then restart the app.",
  );
  process.exit(1);
}

process.chdir(path.dirname(standaloneServerPath));
// eslint-disable-next-line import/no-dynamic-require, global-require
require(standaloneServerPath);

