import { NextFunction, Response } from "express";
import { verifyAccessToken } from "../utils/functions.util";

const checkAuthMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401);
    }

    const token = req.headers["authorization"].replace("Bearer ", "");
    const user = verifyAccessToken(token);
    req["user"] = user;
    console.log("req.user:", user);

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export default checkAuthMiddleware;
