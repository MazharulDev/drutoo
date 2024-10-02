import express from "express";
import { AddressDataController } from "./addressData.controller";
const router = express.Router();

router.get("/division", AddressDataController.getDivision);
router.get("/districts", AddressDataController.getDistricts);
router.get("/upazilas", AddressDataController.getUpazilas);
router.get("/unions", AddressDataController.getUnions);

export const AddressDataRoutes = router;
