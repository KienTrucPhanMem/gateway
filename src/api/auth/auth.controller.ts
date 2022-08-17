import axios from "axios";
import { Request, Response } from "express";
import { ErrorResponse } from "../../helpers/response";

const authController = {
  async register(req: Request, res: Response) {
    const body = req.body;

    try {
      const registerRes = await axios.post(
        "https://ktpm-authen.herokuapp.com/api/register",
        { phone: body.phone, password: body.password }
      );

      if (body.password) delete body.password;

      await axios.post(
        body.role === "USER"
          ? "https://ktpm-user.herokuapp.com/api/passengers"
          : "https://ktpm-driver.herokuapp.com/api/drivers",
        body
      );

      return res.send({
        accessToken: registerRes.data.accessToken,
        refreshToken: registerRes.data.refreshToken,
      });
    } catch (err: any) {
      return ErrorResponse(
        res,
        err?.response?.data?.error?.message || "Hệ thống bảo trì"
      );
    }
  },
};

export default authController;
