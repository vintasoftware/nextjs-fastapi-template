/* eslint-disable @typescript-eslint/no-require-imports */

const chokidar = require("chokidar");
const { exec } = require("child_process");
const { config } = require("dotenv");

config({ path: ".env.local" });

const openapiFile = process.env.OPENAPI_OUTPUT_FILE;
// Watch the specific file for changes
chokidar.watch(openapiFile).on("change", (path) => {
  console.log(`File ${path} has been modified. Running generate-client...`);
  exec("npm run generate-client", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
