import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../prisma";
import { IRegister } from "../core/types/register.type";
import { createResponse, generateAccessToken } from "../utils/functions.util";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: IRegister = req.body;
  try {
    if (!body?.username || !body?.password) {
      throw new Error("Username and password is required.");
    }
    let user = await prisma.users.findFirst({
      where: { username: { equals: body.username } },
    });
    if (user) {
      throw new Error("Username is already exists.");
    }

    body.password = await bcrypt.hash(body.password, 10);

    user = await prisma.users.create({
      data: {
        username: body.username,
        passwordHash: body.password,
        wallet: { create: { balance: 0 } },
      },
      include: {
        wallet: true,
      },
    });

    const accessToken = generateAccessToken(user);
    res.json(createResponse({ accessToken }));
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: IRegister = req.body;
  try {
    if (!body?.username || !body?.password) {
      throw new Error("Username and password is required.");
    }
    let user = await prisma.users.findFirst({
      where: { username: { equals: body.username } },
      include: {
        wallet: true,
      },
    });
    if (!user) {
      throw new Error("User not found.");
    }

    const isValidPassword = await bcrypt.compare(
      body.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      throw new Error("Invalid username or password.");
    }

    const accessToken = generateAccessToken(user);
    res.json(createResponse({ accessToken }));
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let user = req["user"];
  user = await prisma.users.findFirst({
    where: { id: user.id },
    include: { wallet: true },
  });
  res.json(createResponse(user));
};
