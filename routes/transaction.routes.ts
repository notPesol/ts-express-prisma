import express from "express";
import checkAuthMiddleware from "../middleware/check-auth.middleware";
import { searchMyTransaction } from "../controllers/transaction.controller";

const transactionRouter = express.Router();

transactionRouter.get("/me", checkAuthMiddleware, searchMyTransaction);

export default transactionRouter;
