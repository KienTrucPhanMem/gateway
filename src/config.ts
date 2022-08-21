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
      target: "https://ktpm-authen.herokuapp.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/auth`]: "/api/",
      },
    },
  },
  {
    url: "/passengers",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 50,
    },
    proxy: {
      target: "https://ktpm-user.herokuapp.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/`]: "/api/",
      },
    },
  },
  {
    url: "/drivers/socket",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 50,
    },
    proxy: {
      target: "https://ktpm-driver.herokuapp.com",
      changeOrigin: true,
      ws: true,
      logLevel: "debug",
    },
  },
  {
    url: "/drivers",
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 50,
    },
    proxy: {
      target: "https://ktpm-driver.herokuapp.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/`]: "/api/",
      },
    },
  },
];

export { ROUTES };
