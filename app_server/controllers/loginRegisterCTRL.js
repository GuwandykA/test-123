import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { database } from "./../db/index.js";
const saltRounds = 10;

const singUp = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const { username, email, phone, password } = req.body;

    const u_text = "SELECT email FROM users where email = $1 ;";
    const { rows } = await database.query(u_text, [email]);
    if (rows[0] != null) {
      res.status(409).send({
        msg: "This email is already in use!",
      });
    } else {
      const hash = bcrypt.hashSync(password, saltRounds);
      if (hash !== null && hash !== undefined) {
        const q_text = `
              INSERT INTO users 
                  (username, email, phone, password) 
              VALUES ($1, $2, $3, $4)`;
        const { rows } = await database(q_text, [username, email, phone, hash]);

        res.json({
          status: 201,
          msg: "successfully registered",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const singIn = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const { password, email } = req.body;
    const q_text = "select id, password from users where email=$1;";
    const { rows } = await database(q_text, [email]);
    console.log(rows[0]);

    if (rows.length > 0) {
      const match = await bcrypt.compare(password, rows[0].password);
      if (match == true) {
        if (rows[0] && rows[0].id) {
          user_token = await jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, {
            expiresIn: 60 * 60 * 24,
          });

          res.status(200).json({
            status: true,
            token: user_token,
          });
        } else {
          res.status(400).json({
            status: false,
            msg: "User NOT FOUND",
          });
        }
      } else {
        res.status(400).json({
          status: false,
          msg: "Password Fail",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "User NOT FOUND",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

export { singUp, singIn };
