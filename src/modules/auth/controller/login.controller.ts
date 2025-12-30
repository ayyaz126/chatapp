import { Request, Response } from "express";
import { loginUser } from "../service/login.service";
import { loginSchema } from "../validation/auth.validation";

export const loginController = async (req: Request, res: Response) => {
    try {
        // Validate input
        const { email, password } = loginSchema.parse(req.body);

        // Call service
        const tokens = await loginUser(email, password);

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: tokens,
        });
    } catch (error: any) {
        res.status(400).json({ status: "error", message: error.message });
    }
};
