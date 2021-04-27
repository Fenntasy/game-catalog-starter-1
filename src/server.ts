import express, { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { Db } from "mongodb";
import nunjucks from "nunjucks";

export function makeApp(db: Db): core.Express {
  const app = express();

  nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });

  app.set("view engine", "njk");

  app.get("/", (request: Request, response: Response) => {
    const url = `https://fewlines.connect.prod.fewlines.tech/oauth/authorize?client_id=${process.env.CONNECT_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/oauth/callback&scope=email%20openid`;
    response.render("index", {
      connectLoginURL: url,
    });
  });

  return app;
}
