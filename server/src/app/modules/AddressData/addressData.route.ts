import express from "express";
import { AddressDataController } from "./addressData.controller";
const router = express.Router();

router.get("/division", AddressDataController.getDivision);

export const AddressDataRoutes = router;
