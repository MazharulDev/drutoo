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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const user_constant_1 = require("./user.constant");
const pagination_1 = require("../../../constants/pagination");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const result = yield user_service_1.UserService.createUser(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User created successfully",
        data: result,
    });
}));
const agents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constant_1.userFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield user_service_1.UserService.agents(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Retrived agents successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const updateAgentStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const statusData = __rest(req.body, []);
    const result = yield user_service_1.UserService.updateAgentStatus(id, statusData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Agent status update successfully",
        data: result,
    });
}));
const singleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile } = req.params;
    const result = yield user_service_1.UserService.singleUser(mobile);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile fetch successfully",
        data: result,
    });
}));
exports.UserController = {
    createUser,
    agents,
    updateAgentStatus,
    singleUser,
};
