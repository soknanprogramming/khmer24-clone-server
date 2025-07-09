import type { Request, Response } from "express";
import { Router } from "express";
import passport from "passport";
import type { AuthRequest } from "../types/AuthRequest";


const router = Router();

// Your existing POST / and GET /status routes
router.post(
  "/",
  passport.authenticate("local"),
  (req: any, res: Response) => {
    // On success, send back user data but exclude the password
    const { Password, ...userData } = req.user;
    res.status(200).json(userData);
  }
);

router.get("/status", (req: AuthRequest, res: any) => {
    if (req.isAuthenticated() && req.user) {
        // Corrected: Use .status().json() or .status().send()
        const { Password, ...userData } = req.user;
        return res.status(200).json(userData);
    }
    return res.sendStatus(401);
});

// ✅ Corrected Logout Route
router.post("/logout", (req: Request, res: Response, next: any) => {
  req.logout((err) => {
    if (err) {
      // If there's an error during logout, pass it to the error handler
      return next(err);
    }
    
    // Explicitly destroy the session for a clean logout
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out, please try again.'});
        }
        // Send a success response after session is destroyed
        res.status(200).json({ message: "Logged out successfully" });
    });
  });
});


export default router;