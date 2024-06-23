import { transaction_type } from "@prisma/client";
import { IBaseSearch } from "./base-search.type";

export interface ITransactionSearch extends IBaseSearch {
  userId?: number;
  type?: transaction_type;
}
