import express from "express";
let loginR = express.Router();

import { singUp, singIn } from "./../controllers/loginRegisterCTRL.js";
import { signup } from "./../middlewares/validation-middleware.js";

loginR.post("/sing-up", signup, singUp);
loginR.post("/sing-in", singIn);

export { loginR };
