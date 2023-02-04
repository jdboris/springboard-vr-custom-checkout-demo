import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import path from "path";
import checkoutRouter from "./routes/checkouts.js";

// NOTE: Must define __dirname manually since this is an ES module
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const { CLIENT_APP_PATH, PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// API Routes
app.use("/v1/checkouts", checkoutRouter);

// Serve the static files from the client app
app.use(
  express.static(path.resolve(__dirname, CLIENT_APP_PATH), {
    // NOTE: Allow serving the client .env file, which should never contain secrets anyway
    dotfiles: "allow",
  })
);

app.get(/.*/, (req, res) => {
  // Fall back on serving index.html for any other route
  res.sendFile(`${path.resolve(__dirname, CLIENT_APP_PATH)}/index.html`);
});

// Error handler...
app.use((err, req, res, next) => {
  res.status(err.status || 500).json(
    // NOTE: Must manually copy the message property to include it in the JSON string
    { error: { ...err, message: err.message } }
  );
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
