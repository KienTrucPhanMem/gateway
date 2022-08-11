import { Application } from "express";
import glob from "glob";

const router = (app: Application) => {
  glob(`${__dirname}/api*/**/*.route.+(js|ts)`, {}, (error, files) => {
    if (error) throw error;
    files.forEach((file) => app.use("/", require(file)));
  });
};

export default router;
