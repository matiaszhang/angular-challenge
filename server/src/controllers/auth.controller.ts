import { Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const newUser = new User({ email, password });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      res.status(500).send(error);
    }
  }
}
