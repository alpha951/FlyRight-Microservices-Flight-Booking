const express = require("express");

const rateLimit = require("express-rate-limit");

const { ServerConfig } = require("./config");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { AuthMiddlewares } = require("./middlewares");
const apiRoutes = require("./routes");
const app = express();

// READ requests are allowed by all the users but to perform write action user_role has to be `admin` or `flight_company`
app.use(
  "/flightService",
  [AuthMiddlewares.checkAuth, AuthMiddlewares.checkRights],
  createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/flightService": "/" },
  })
);

app.use(
  "/bookingService",
  [AuthMiddlewares.checkAuth],
  createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/bookingService": "/" },
  })
);

// If you keep these lines above proxy then POST requests doesn't work

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // Limit each IP to 20 requests per `window` (here, per 1 minutes)
  standardHeaders: "draft-7", // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
  legacyHeaders: false, // X-RateLimit-* headers
  // store: ... , // Use an external store for more precise rate limiting
});

app.use(limiter);

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
