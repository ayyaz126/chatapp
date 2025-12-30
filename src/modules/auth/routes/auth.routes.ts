import { Router } from "express";
import { registerController } from "../controller/register.controller";
import { loginController } from "../controller/login.controller";
import { logoutController } from "../controller/logout.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { loginRateLimiter } from "../../../middlewares/rateLimiter";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController , loginRateLimiter);
router.post("/logout", authMiddleware, logoutController);

router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: (req as any).user });
});

export default router;
