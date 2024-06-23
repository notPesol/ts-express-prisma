import { NextFunction, Request, Response } from "express";
import { IBaseSearch } from "../core/types/base-search.type";

const queryTransformMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query: IBaseSearch = {
    count: req.query.count === "true",
    ignorePage: req.query.ignorePage === "true",
    limit: req.query.limit ? +req.query.limit : 10,
    page: req.query.page ? +req.query.page : 1,
    orderBy: req.query.orderBy ? String(req.query.orderBy) : undefined,
    orderType: String(req.query.orderType === "desc" ? "desc" : "asc"),
  };

  req.query = { ...req.query, ...query } as any;

  next();
};

export default queryTransformMiddleware;
