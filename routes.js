import glob from "glob";

const router = (app) => {
  glob(`${__dirname}/api*/**/*.route.+(js|ts)`, {}, (error, files) => {
    if (error) throw error;
    files.forEach((file) => app.use("/api", require(file)));
  });
};

export default router;
