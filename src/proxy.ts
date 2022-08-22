import { Application } from "express";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import { createLog } from "./services/log.service";

const setupProxies = (app: Application, routes: any) => {
  routes.forEach((r: any) => {
    app.use(
      r.url,
      createProxyMiddleware(r.proxy.filter || "**", {
        ...r.proxy,
        onProxyReq: async (proxyReq, req) => {
          const buffers = [];

          for await (const chunk of req) {
            buffers.push(chunk);
          }

          let data: any = {};

          try {
            const sData = Buffer.concat(buffers).toString();

            if (sData) data = JSON.parse(sData);
          } catch (e) {
            console.log(e);
          }

          const log = {
            protocol: req.protocol,
            host: req.hostname,
            path: req.path,
            reqHeaders: req.headers,
            method: req.method,
            reqData: data,
            reqTime: new Date().getTime(),
            query: req.query,
            params: req.params,
          };

          proxyReq.on("error", async (err) => {
            try {
              await createLog({ ...log, status: "ERROR", error: err } as any);
            } catch (e) {
              console.log(e);
            }
          });

          proxyReq.on("timeout", async () => {
            try {
              await createLog({ ...log, status: "TIMEOUT" } as any);
            } catch (e) {
              console.log(e);
            }
          });
        },
        onProxyRes: responseInterceptor(
          async (responseBuffer, proxyRes, req, res) => {
            console.log(1);

            const response = responseBuffer.toString("utf8"); // convert buffer to string

            console.log(2);

            const log = {
              protocol: (proxyRes as any).req.protocol,
              host: (proxyRes as any).req.host,
              path: (proxyRes as any).req.path,
              reqHeaders: req.headers,
              method: req.method,
              reqTime: new Date().getTime(),
              query: (req as any).query,
              params: (req as any).params,
              status: "SUCCESS",
              statusCode: res.statusCode,
              resHeaders: res.getHeaders(),
              resTime: new Date().getTime(),
              resData: response,
              error: res.statusMessage,
            };

            await createLog(log as any);

            return response; // manipulate response and return the result
          }
        ),

        selfHandleResponse: true,
      })
    );
  });
};

export { setupProxies };
