import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    // Get the token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required' 
      });
    }

    // Verify token and get user info
    const decoded = verifyToken(token);

    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    // Continue to next middleware/route handler
    next();

  } catch (error) {
    return res.status(403).json({ 
      error: 'Invalid or expired token' 
    });
  }
}