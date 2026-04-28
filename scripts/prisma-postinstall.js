const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function getProjectRoot() {
  // On cPanel, npm scripts may run with CWD under nodevenv (e.g. .../22/lib).
  // INIT_CWD points to the folder where `npm install` was invoked.
  const initCwd = process.env.INIT_CWD;
  if (initCwd && String(initCwd).trim()) return String(initCwd).trim();
  return path.resolve(__dirname, "..");
}

function pickSchemaPath() {
  const fromEnv = process.env.PRISMA_SCHEMA_PATH;
  if (fromEnv && String(fromEnv).trim()) return String(fromEnv).trim();

  const projectRoot = getProjectRoot();
  return path.resolve(projectRoot, "prisma", "schema.prisma");
}

function main() {
  const projectRoot = getProjectRoot();
  const schemaPath = pickSchemaPath();

  if (!fs.existsSync(schemaPath)) {
    // eslint-disable-next-line no-console
    console.error(
      `Prisma schema not found at "${schemaPath}". ` +
        "Set PRISMA_SCHEMA_PATH to the absolute schema path on your server.",
    );
    process.exit(1);
  }

  const result = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["prisma", "generate", "--schema", schemaPath],
    { stdio: "inherit", cwd: projectRoot },
  );

  process.exit(result.status ?? 1);
}

main();
