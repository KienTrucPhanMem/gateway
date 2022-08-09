const express = require("express");
const morgan = require("morgan");

const { ROUTES } = require("./routes");

const { setupProxies } = require("./proxy");

const app = express();
const port = 8000;

app.use(morgan("dev"));

app.use(function (error, req, res, next) {
  console.log(req);
  console.log(res);
  next();
});

setupProxies(app, ROUTES);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
