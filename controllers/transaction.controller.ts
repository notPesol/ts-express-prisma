import { NextFunction, Response } from "express";
import prisma from "../prisma";
import { ITransactionSearch } from "../core/types/transaction-search.type";
import { transactions } from "@prisma/client";
import { createResponse, hasTransactionTypeKey } from "../utils/functions.util";

export const searchMyTransaction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req["user"].id;
  const query: ITransactionSearch = req.query;

  const where: any = {
    userId,
  };
  const options: any = {};

  if (query?.type && hasTransactionTypeKey(query?.type)) {
    where["type"] = query.type;
  }

  if (!query?.ignorePage) {
    options["take"] = query?.limit || 10;
    options["skip"] = ((query?.page || 1) - 1) * (query?.limit || 10);
  }
  if (query?.orderBy) {
    options["orderBy"] = {
      [query.orderBy]: query.orderType || "asc",
    };
  }

  const transactions = await prisma.transactions.findMany({
    where,
    ...options,
  });

  let count = 0;
  if (query?.count) {
    count = await prisma.transactions.count({
      where,
    });
  }

  res.json(createResponse<transactions[]>(transactions, count));
};
