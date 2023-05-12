import { apiR as apiRouter } from "./apiRouter.js";
import { loginR as loginRouter } from "./loginRouter.js";

function RMngr(app) {
  app.use("/api/v1/blog", apiRouter);
  app.use("/api/v1", loginRouter);
}

export { RMngr };
