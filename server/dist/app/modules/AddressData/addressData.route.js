"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressDataRoutes = void 0;
const express_1 = __importDefault(require("express"));
const addressData_controller_1 = require("./addressData.controller");
const router = express_1.default.Router();
router.get("/division", addressData_controller_1.AddressDataController.getDivision);
router.get("/districts", addressData_controller_1.AddressDataController.getDistricts);
router.get("/upazilas", addressData_controller_1.AddressDataController.getUpazilas);
router.get("/unions", addressData_controller_1.AddressDataController.getUnions);
exports.AddressDataRoutes = router;
