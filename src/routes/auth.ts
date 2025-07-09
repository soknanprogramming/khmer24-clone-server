import type { Request, Response } from "express";
import { Router } from "express";
import passport from "passport";
import type { AuthRequest } from "../types/AuthRequest";


const router = Router();

router.post(
  "/",
  passport.authenticate("local"),
  (req: any, res: Response) => {
    res.sendStatus(200);
  }
);
router.get("/status", (req: AuthRequest, res: any) => {
    if (req.isAuthenticated() && req.user) {
        return res.sendStatus(200).send(req.user.UserName);
    }
    return res.sendStatus(401);
});


export default router;