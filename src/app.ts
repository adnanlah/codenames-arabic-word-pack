import express from "express";
import { Response, Request } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import serverless from "serverless-http";

const app = express();
const port = process.env.PORT || 3000;

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
    const allFileContents = fs.readFileSync(
      path.join(__dirname, "../data/pack.txt"),
      "utf-8"
    );
    return res.json({
      words: allFileContents.split(/\r?\n/).filter((e) => e.length > 0),
    });
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

router.post("/download", (req: Request, res: Response) => {});

app.use("/.netlify/functions/server", router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
module.exports.handler = serverless(app);
