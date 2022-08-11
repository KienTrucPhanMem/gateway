const ROUTES = [
  {
    url: "/auth",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 50,
    },
    proxy: {
      filter: "!/auth/register",
      target: "http://localhost:8001",
      changeOrigin: true,
      pathRewrite: {
        [`^/auth`]: "/api/",
      },
    },
  },
];

export { ROUTES };
