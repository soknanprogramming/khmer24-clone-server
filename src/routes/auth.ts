// src/routes/auth.ts

import type { Request, Response, NextFunction } from "express"; // 👈 Import NextFunction
import { Router } from "express";
import passport from "passport";
import type { AuthRequest } from "../types/AuthRequest";

const router = Router();

// ✅ ADD THIS DEBUGGING MIDDLEWARE
const debugMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    next(); // Continue to the next middleware
};

router.post(
  "/",
  debugMiddleware, // ✅ Add this middleware
  // ✅ Use a custom callback to provide better error messages
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err); // Handle server errors
      }
      if (!user) {
        // Handle failed login with a specific message from the strategy
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // On success, send back user data (excluding password)
        const { Password, ...userData } = user;
        return res.status(200).json(userData);
      });
    })(req, res, next);
  }
);

router.get("/status", (req: AuthRequest, res: any) => {
    if (req.isAuthenticated() && req.user) {
        // This response is incorrect, it should not chain .send() after .sendStatus()
        // Corrected version:
        const { Password, ...userData } = req.user;
        return res.status(200).send(userData);
    }
    return res.sendStatus(401);
});

export default router;