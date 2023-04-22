import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

export interface CustomRequest extends Request {
  userId?: string;
}

export async function isAuthenticated(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send("No token provided");
  }

  try {
    const decoded = await verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
}
