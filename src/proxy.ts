import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const setupProxies = (app: Application, routes: any) => {
  routes.forEach((r: any) => {
    app.use(
      r.url,
      createProxyMiddleware(r.proxy.filter || "**", {
        ...r.proxy,
        onProxyReq: (proxyReq: any, req: any) => {
          console.log(proxyReq);
          // console.log(req);
        },
        onProxyRes: (proxyRes: any, res: any) => {
          // console.log(proxyRes);
          // console.log(res);
        },
      })
    );
  });
};

export { setupProxies };
