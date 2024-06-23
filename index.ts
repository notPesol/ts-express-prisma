import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import loggerMiddleware from "./middleware/logger.middleware";
import authenticationRouter from "./routes/authentication.routes";
import queryTransformMiddleware from "./middleware/query-transform.middleware";
import walletRouter from "./routes/wallet.routes";
import transactionRouter from "./routes/transaction.routes";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(loggerMiddleware);
app.use(queryTransformMiddleware);

// routes
app.use("/authentication", authenticationRouter);
app.use("/wallet", walletRouter);
app.use("/transaction", transactionRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({ error: err.message });
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
