import { Request, Response } from "express";
import { registerSchema } from "../validation/auth.validation";
import { registerService } from "../service/register.service";

export const registerController = async (req: Request, res: Response) => {
  try {
    // 1️⃣ validate request
    const validatedData = registerSchema.parse(req.body);

    // 2️⃣ call service
    const user = await registerService(validatedData);

    // 3️⃣ response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
