import express from "express";
import "express-async-errors";
import { json } from "body-parser";

const cookieSession = require("cookie-session");
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //https cookies only going to be shared only in https connections
                  //if environment is test it can be false
  })
);
//hi i changed
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);
export { app };

//app.ts dosyasinda serveri baslatilmiyor artik sadece configure ediliyor

