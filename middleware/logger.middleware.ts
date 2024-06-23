import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log({
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
  });

  next();
};

export default loggerMiddleware;
