const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");

const indexRouter = require("./routes/index");
const emailRouter = require("./routes/email");
const actionsRouter = require("./routes/actions");
const usersRouter = require("./routes/users");
const transactionRouter = require("./routes/transaction");

const authenticator = require("./middleware/authenticator");

// .env Config
config();

const allowedOrigins = {
  origin: process.env.ALLOWED_ORIGIN,
};

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(authenticator);

// Routes
app.use("/", indexRouter);
app.use("/email", emailRouter);
app.use("/users", usersRouter);
app.use("/actions", actionsRouter);
app.use("/transaction", transactionRouter);

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});

module.exports = app;
