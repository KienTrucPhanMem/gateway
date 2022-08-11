import dotenv from "dotenv";
import dotenvParseVariables from "dotenv-parse-variables";
import express from "express";
import morgan from "morgan";
import { ROUTES } from "./config";
import { setupProxies } from "./proxy";
import router from "./routes";

/* ENV */
let env = dotenv.config();
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed!, { assignToProcessEnv: true });

/* CONSTANT */
const app = express();
const HOST: string = process.env.HOST || "127.0.0.1";
const PORT: number = +(process.env.PORT || 8000);

/* LOGGING */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

/* ROUTING */
router(app);

setupProxies(app, ROUTES);

/* START SERVER */
app.listen(PORT, HOST, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode at http://${HOST}:${PORT}`
  );
});
