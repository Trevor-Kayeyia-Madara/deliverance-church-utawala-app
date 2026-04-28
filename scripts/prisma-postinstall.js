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
  if (process.env.PRISMA_SKIP_POSTINSTALL === "1") process.exit(0);

  const projectRoot = getProjectRoot();
  const schemaPath = pickSchemaPath();
  const schemaPathForCli = path.relative(projectRoot, schemaPath);

  if (!fs.existsSync(schemaPath)) {
    // eslint-disable-next-line no-console
    console.error(
      `Prisma schema not found at "${schemaPath}". ` +
        "Set PRISMA_SCHEMA_PATH to the absolute schema path on your server.",
    );
    process.exit(process.env.PRISMA_POSTINSTALL_STRICT === "1" ? 1 : 0);
  }

  const result =
    process.platform === "win32"
      ? spawnSync(
          "cmd.exe",
          ["/d", "/s", "/c", `npx prisma generate --schema ${schemaPathForCli}`],
          { stdio: "inherit", cwd: projectRoot },
        )
      : spawnSync(
          "npx",
          ["prisma", "generate", "--schema", schemaPathForCli],
          { stdio: "inherit", cwd: projectRoot },
        );

  if (result.error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to run Prisma generate: ${result.error.message}`);
  }

  if ((result.status ?? 1) !== 0) {
    // eslint-disable-next-line no-console
    console.error(
      "Prisma generate failed during postinstall. " +
        "Continuing install; run `npm run prisma:generate` after resolving the issue.",
    );
    process.exit(process.env.PRISMA_POSTINSTALL_STRICT === "1" ? 1 : 0);
  }

  process.exit(0);
}

main();
