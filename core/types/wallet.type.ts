import { transaction_type } from "@prisma/client";

export interface IUpdateWallet {
  amount: number;
  transactionType: transaction_type;
}
