import express from "express";
import { config } from "dotenv";
import cors from "cors";

import indexRouter from "./routes/index.js";
import emailRouter from "./routes/email.js";
import actionsRouter from "./routes/actions.js";
import usersRouter from "./routes/users.js";

import authenticator from "./middleware/authenticator.js";

//.env Config
config();
const allowedOrigins = {
  origin: process.env.ALLOWED_ORIGIN,
};

const app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(allowedOrigins));
app.use(authenticator);
//Routes
app.use("/", indexRouter);
app.use("/email", emailRouter);
app.use("/users", usersRouter);
app.use("/actions", actionsRouter);

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
export default app;
