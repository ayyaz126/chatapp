import { Request, Response } from "express";
import { logoutService } from "../service/logout.service";

export const logoutController = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.body.refreshToken;

    if (!accessToken || !refreshToken) {
      return res.status(400).json({ status: "error", message: "Tokens required" });
    }

    await logoutService(accessToken, refreshToken);

    return res.json({ status: "success", message: "Logged out successfully" });
  } catch (error: any) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
