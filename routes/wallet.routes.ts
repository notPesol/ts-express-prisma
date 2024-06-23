import express from "express";
import checkAuthMiddleware from "../middleware/check-auth.middleware";
import { getMyWallet, updateWallet } from "../controllers/wallet.controller";

const walletRouter = express.Router();

walletRouter.post("/", checkAuthMiddleware, updateWallet);

walletRouter.get("/me", checkAuthMiddleware, getMyWallet);

export default walletRouter;
