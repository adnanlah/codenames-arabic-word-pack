import express from "express";
import { Response, Request } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

const router = express.Router();

app.use(
  cors({
    origin: [
      "http://localhost:433",
      "https://codenames-client-2.herokuapp.com",
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

router.get("/", (req: Request, res: Response) => {
  try {
    res.send("Hello world!");
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

router.get("/data", (_req: Request, res: Response) => {
  try {
    // path of the included file will be `process.env.LAMBDA_TASK_ROOT/{name_of_function}/{included_filename}`
    console.log("process.env.LAMBDA_TASK_ROOT: ", process.env.LAMBDA_TASK_ROOT);
    const fileName = "data/pack.txt";
    const resolved = process.env.LAMBDA_TASK_ROOT
      ? path.resolve(process.env.LAMBDA_TASK_ROOT, fileName)
      : path.resolve(__dirname, fileName);

    const allFileContents = fs.readFileSync(resolved, "utf-8");

    return res.json({
      words: allFileContents.split(/\r?\n/).filter((e) => e.length > 0),
    });
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

router.post("/download", (req: Request, res: Response) => {});

app.use("/.netlify/functions/app", router);

module.exports = app;
module.exports.handler = serverless(app);
