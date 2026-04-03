import http from "node:http";
import "dotenv/config";
import { createExpressApp } from "./app/app.js";

async function main() {
  try {
    // load your express app
    const server = http.createServer(createExpressApp());

    // server start-up
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error while starting the server.");
    throw error;
  }
}

main();
