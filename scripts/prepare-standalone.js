const fs = require("fs");
const path = require("path");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  ensureDir(path.dirname(to));
  fs.cpSync(from, to, { recursive: true });
}

function main() {
  const root = process.cwd();
  const standaloneRoot = path.join(root, ".next", "standalone");
  const nextStatic = path.join(root, ".next", "static");
  const publicDir = path.join(root, "public");

  if (!fs.existsSync(standaloneRoot)) {
    throw new Error(
      "Missing .next/standalone. Ensure next.config.js has output: 'standalone' and run `npm run build` first.",
    );
  }

  copyDir(nextStatic, path.join(standaloneRoot, ".next", "static"));
  copyDir(publicDir, path.join(standaloneRoot, "public"));
}

main();

