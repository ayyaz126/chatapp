import { Router } from "express";
import { getMyProfile } from "../controllers/user.controller";
import { searchUsers } from "../controllers/user.controller"
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getMyProfile);
router.get("/search", authMiddleware, searchUsers);

export default router;
