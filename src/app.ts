import express from "express";
import morgan from "morgan";
import { ROUTES } from "./config";
import { setupProxies } from "./proxy";
import router from "./routes";

/* ENV */
require("dotenv").config();

/* CONSTANT */
const app = express();
const HOST: string = process.env.HOST || "0.0.0.0";
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
