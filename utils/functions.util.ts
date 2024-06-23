import * as jwt from "jsonwebtoken";
import { Response } from "../core/classes/response.class";
import { transaction_type } from "@prisma/client";

const JWT_SECRET = "" + process.env.JWT_SECRET;

export const generateAccessToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const hasTransactionTypeKey = (key: transaction_type) => {
  return Object.values(transaction_type).includes(key);
};

export const createResponse = <T>(
  data: T,
  totalItem = 0,
  message = "success"
) => {
  return new Response<T>({ data, totalItem, message });
};
