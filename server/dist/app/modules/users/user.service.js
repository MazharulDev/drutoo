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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const user_constant_1 = require("./user.constant");
const user_utlis_1 = require("./user.utlis");
const system_model_1 = require("../system/system.model");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const createUser = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof payload === "string") {
        payload = JSON.parse(payload);
    }
    const userExist = yield user_model_1.User.findOne({ mobile: payload.mobile });
    if (userExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User already exists. Please login.");
    }
    if (file) {
        const uploadedImg = (yield fileUploadHelper_1.fileUploadHelper.uploadToCloudinary(file));
        payload.profilePicture = uploadedImg.secure_url;
    }
    let status;
    if (payload.role === "agent") {
        status = "inactive";
    }
    const userData = Object.assign(Object.assign({}, payload), { balance: payload.role === "agent" ? 100000 : 40, status: status });
    const newUser = yield user_model_1.User.create(userData);
    const amount = newUser.balance;
    const incrementAmount = yield (0, user_utlis_1.AddSystemBalance)(amount);
    yield system_model_1.System.updateOne({ name: "systemAmount" }, { amount: incrementAmount });
    const newUserResponse = yield user_model_1.User.findById(newUser._id).select("-pin");
    return newUserResponse;
});
const agents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map((field) => ({
                [field]: new RegExp(searchTerm, "i"),
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateAgentStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const singleUser = (mobile) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ mobile: mobile }).populate("transactions");
    return result;
});
const updateMyProfile = (mobile, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const uploadedImg = (yield fileUploadHelper_1.fileUploadHelper.uploadToCloudinary(file));
        payload.profilePicture = uploadedImg.secure_url;
    }
    const result = yield user_model_1.User.findOneAndUpdate({ mobile: mobile }, payload, {
        new: true,
    });
    return result;
});
exports.UserService = {
    createUser,
    agents,
    updateAgentStatus,
    singleUser,
    updateMyProfile,
};
