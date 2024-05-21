/* eslint-disable @typescript-eslint/no-unsafe-call */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { Command } from "commander";

const program = new Command();

program
  .version("1.0.0")
  .option("-u, --user <name>", "Gitea initial user name")
  .option("-e, --email <email>", "Gitea initial user email")
  .option("-p, --password <password>", "Gitea initial user password")
  .option("-s, --server <name>", "Server name", "example.com")
  .option(
    "-b, --backup-schedule <schedule>",
    "Backup cron schedule",
    "0 0 * * *"
  )
  .option("--postgres-user <user>", "Postgres user", "your_postgres_user")
  .option(
    "--postgres-password <password>",
    "Postgres password",
    "your_postgres_password"
  )
  .option(
    "--root-url <url>",
    "Root URL for Gitea server",
    "https://your_root_url"
  )
  .parse(process.argv);

const options = program.opts();

const envFilePath = join(__dirname, ".env");
let envFileContent = readFileSync(envFilePath, "utf8");

// Add or override environment variables
if (options.user) {
  envFileContent += `\nGITEA_USER_NAME=${options.user}`;
}
if (options.email) {
  envFileContent += `\nGITEA_USER_EMAIL=${options.email}`;
}
if (options.password) {
  envFileContent += `\nGITEA_USER_PASSWORD=${options.password}`;
}
if (options.server) {
  envFileContent += `\nSERVER_NAME=${options.server}`;
}
if (options.backupSchedule) {
  envFileContent += `\nBACKUP_CRON_SCHEDULE=${options.backupSchedule}`;
}
if (options.postgresUser) {
  envFileContent += `\nPOSTGRES_USER=${options.postgresUser}`;
}
if (options.postgresPassword) {
  envFileContent += `\nPOSTGRES_PASSWORD=${options.postgresPassword}`;
}
if (options.rootUrl) {
  envFileContent += `\nROOT_URL=${options.rootUrl}`;
}

writeFileSync(environmentFilePath, environmentFileContent);

execSync("docker-compose --env-file .env up", { stdio: "inherit" });
