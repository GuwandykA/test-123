import "dotenv/config";
import jwt from "jsonwebtoken";
import { validator } from "./../helper/validate.js";

const signup = async (req, res, next) => {
  const validationRule = {
    email: "required|string|email",
    username: "required|string",
    phone: "required|string",
    password: "required|string|min:6|confirmed",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token != undefined) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_KEY,
        (error, decoded) => {
          if (!error) {
            req.user_id = decoded.id;
            next();
          } else {
            console.log(error);
            res.status(403).json({ status: 403 });
          }
        }
      );
    } else {
      console.log("not found token");
      res.status(401).json({ status: 401 });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ status: 500 });
  }
};

export { signup, checkToken };
