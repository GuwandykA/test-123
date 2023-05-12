import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import { RMngr } from "./app_server/routers/routerManager.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.listen(process.env.PORT || 3001, (error) => {
  if (!error) {
    console.log("Server run as " + process.env.PORT || 3001);
  } else {
    console.log("app.listen error ", error);
  }
});

RMngr(app);
