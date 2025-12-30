import { Request, Response } from "express";
import { getMyProfileService,  searchUsersService  } from "../services/user.service";

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const profile = await getMyProfileService(user.id);

    return res.json({
      status: "success",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to get profile",
    });
  }
};


export const searchUsers = async (req: Request, res: Response) => {
    try {
      const q = (req.query.q as string) || "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
  
      const users = await searchUsersService(q, page, limit);
  
      return res.json({
        status: "success",
        meta: {
          page,
          limit,
        },
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Failed to search users",
      });
    }
  };
