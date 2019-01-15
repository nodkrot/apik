import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { AccountForm } from "./models";
import { validate } from "./validator";

const app = express();
const PORT = 1991;

app.use(bodyParser.json());

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.post("/account", validate(AccountForm), (req: Request, res: Response) => {
  const caseBody = AccountForm.create(req.body);

  res.json(caseBody);
});

app.listen(PORT, () => {
  console.log("  App is running at http://localhost:%d in %s mode", PORT, app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});
