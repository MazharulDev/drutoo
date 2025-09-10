"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("../users/user.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const hashingHelpers_1 = require("../../../helpers/hashingHelpers");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile, pin } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(mobile);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isUserExist.pin &&
        !(yield user_model_1.User.isPasswordMatched(pin, isUserExist.pin))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Pin is incorrect");
    }
    //create access token & refresh token
    const { mobile: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const changePin = (userId, old_pin, new_pin) => __awaiter(void 0, void 0, void 0, function* () {
    if (new_pin.length !== 4 || isNaN(Number(new_pin))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "New Pin must be a 4-digit number");
    }
    const user = yield user_model_1.User.findOne({ mobile: userId }).select("+pin");
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.pin && !(yield user_model_1.User.isPasswordMatched(old_pin, user.pin))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old Pin is incorrect");
    }
    const hashedPin = yield hashingHelpers_1.hashingHelper.encrypt_password(new_pin);
    yield user_model_1.User.updateOne({ mobile: userId }, { pin: hashedPin });
    return {
        success: true,
        message: "Pin changed successfully",
    };
});
exports.AuthService = {
    loginUser,
    changePin,
};
