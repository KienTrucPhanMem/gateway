import { Request, Response } from "express";
import { ErrorResponse } from "../../helpers/response";

const authController = {
  async register(req: Request, res: Response) {
    try {
      return res.send("123");
    } catch (err: any) {
      return ErrorResponse(res, err.message);
    }
  },
};

export default authController;
