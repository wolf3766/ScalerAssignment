import { Router } from "express";
import morgan from "morgan";
import { apiV1 } from "./routes/v1.routes";

const router = Router();

router.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["remote-addr"](req, res),
      tokens["remote-user"](req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

router.use("/v1", apiV1);

export {router}