import express from "express";
let apiR = express.Router();

import { create, delete_news, getAll, update } from "./../controllers/apiCTRL.js";
import { checkToken } from "./../middlewares/validation-middleware.js";

apiR.post("/create", checkToken, create);
apiR.post("/update", checkToken, update);
apiR.post("/delete",checkToken, delete_news);
apiR.post("/get-all", getAll);

export { apiR };
