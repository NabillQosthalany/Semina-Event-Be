const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const categoriesRouter = require("./app/api/v1/categories/router");
const imageRouter = require("./app/api/v1/images/router");
const talentRouter = require("./app/api/v1/talents/router");
const eventRouter = require("./app/api/v1/events/router");
const refreshTokenRouter = require("./app/api/v1/userRefreshToken/router");
const organizerRouter = require("./app/api/v1/organizers/router");
const authRouter = require("./app/api/v1/auth/routes");
const paymentsRouter = require("./app/api/v1/payments/router");
const orderRouter = require("./app/api/v1/orders/router");
const participantsRouter = require("./app/api/v1/participants/routes");

const urlV1 = "/api/v1/cms";

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handle-error");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${urlV1}/categories`, categoriesRouter);
app.use(`${urlV1}/talents`, talentRouter);
app.use(`${urlV1}/events`, eventRouter);
app.use(`${urlV1}/organizers`, organizerRouter);
app.use(`${urlV1}/images`, imageRouter);
app.use(`${urlV1}/auth`, authRouter);
app.use(`${urlV1}/refresh-token`, refreshTokenRouter);
app.use(`${urlV1}/payments`, paymentsRouter);
app.use(`${urlV1}/orders`, orderRouter);
app.use(`/api/v1`, participantsRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
