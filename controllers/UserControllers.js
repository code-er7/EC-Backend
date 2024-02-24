import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";

const prisma = new PrismaClient();

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user || user.password !== password) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});
