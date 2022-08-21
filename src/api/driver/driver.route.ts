import express, { Router } from "express";
import driverController from "./driver.controller";

const router = Router();

router.post(
  "/drivers/booking",
  [express.json(), express.urlencoded({ extended: true })],
  driverController.booking
);

module.exports = router;
