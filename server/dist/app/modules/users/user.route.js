"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const router = express_1.default.Router();
router.post("/create-user", fileUploadHelper_1.fileUploadHelper.upload.single("profilePicture"), (req, res, next) => {
    var _a;
    try {
        const parsedData = JSON.parse(req.body.data || "{}");
        req.body = {
            data: parsedData,
            profilePicture: ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || undefined,
        };
        (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema)(req, res, next);
    }
    catch (err) {
        return res.status(400).json({ message: "Invalid JSON in 'data' field" });
    }
}, (req, res, next) => {
    return user_controller_1.UserController.createUser(req, res, next);
});
router.get("/filter", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.agents);
router.patch("/update/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.updateAgentStatus);
router.get("/profile/:mobile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.AGENT), user_controller_1.UserController.singleUser);
router.patch("/update-my-profile/:mobile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.AGENT), fileUploadHelper_1.fileUploadHelper.upload.single("profilePicture") ||
    fileUploadHelper_1.fileUploadHelper.upload.none(), (req, res, next) => {
    return user_controller_1.UserController.updateMyProfile(req, res, next);
});
exports.UserRoutes = router;
