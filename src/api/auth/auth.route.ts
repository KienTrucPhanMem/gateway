import express, { Router } from "express";
import authController from "./auth.controller";

const router = Router();

router.post(
  "/auth/register",
  [express.json(), express.urlencoded({ extended: true })],
  authController.register
);

module.exports = router;
