const { createProxyMiddleware } = require("http-proxy-middleware");

const setupProxies = (app, routes) => {
  routes.forEach((r) => {
    app.use(
      r.url,
      createProxyMiddleware({
        ...r.proxy,
        onProxyReq: (proxyReq, req) => {
          console.log(proxyReq);
          console.log(req);
        },
        onProxyRes: (proxyRes, res) => {
          console.log(proxyRes);
          console.log(res);
        },
      })
    );
  });
};

exports.setupProxies = setupProxies;
