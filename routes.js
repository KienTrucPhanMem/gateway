const ROUTES = [
  {
    url: "/login",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 50,
    },
    proxy: {
      target: "http://localhost:8001",
      changeOrigin: true,
      pathRewrite: {
        [`^/`]: "/api/",
      },
    },
  },
];

exports.ROUTES = ROUTES;
