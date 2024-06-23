import { NextFunction, Response } from "express";
import prisma from "../prisma";
import { IUpdateWallet } from "../core/types/wallet.type";
import { Decimal } from "@prisma/client/runtime/library";
import { createResponse, hasTransactionTypeKey } from "../utils/functions.util";
import { transaction_type, wallets } from "@prisma/client";

export const updateWallet = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const body: IUpdateWallet = req.body;
  body.amount = +body.amount;
  try {
    if (!hasTransactionTypeKey(body.transactionType)) {
      throw new Error(`Invalid transaction type.`);
    }

    let wallet = await prisma.wallets.findFirst({
      where: { user_id: req["user"].id },
    });
    if (!wallet) {
      throw new Error("Wallet not found.");
    }

    const balance = wallet.balance ? +wallet.balance : 0;
    if (
      body.transactionType !== transaction_type.deposit &&
      balance < body.amount
    ) {
      throw new Error(`There is not enough money in the wallet.`);
    }

    wallet.balance =
      body.transactionType === transaction_type.deposit
        ? new Decimal(balance + body.amount)
        : new Decimal(balance - body.amount);
    wallet.updated_at = new Date();

    wallet = await prisma.wallets.update({
      where: { id: wallet.id },
      data: wallet,
    });
    await prisma.transactions.create({
      data: {
        user_id: req["user"].id,
        amount: body.amount,
        type: body.transactionType,
      },
    });

    res.json(createResponse<wallets>(wallet));
  } catch (error) {
    next(error);
  }
};

export const getMyWallet = async (req: any, res: Response, next: NextFunction) => {
  const user = req["user"];
  const wallet = await prisma.wallets.findFirst({
    where: { user_id: user.id },
  });

  res.json(createResponse<wallets | null>(wallet));
};
