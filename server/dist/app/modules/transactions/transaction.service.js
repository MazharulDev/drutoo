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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionServices = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const transaction_constant_1 = require("./transaction.constant");
const transactions_model_1 = require("./transactions.model");
const myTransaction = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, senderId } = filters, filtersData = __rest(filters, ["searchTerm", "senderId"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search term filtering
    if (searchTerm) {
        andConditions.push({
            $or: transaction_constant_1.transactionsSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    // Sender or Receiver filtering
    if (senderId) {
        andConditions.push({
            $or: [{ senderId: senderId }, { receivedId: senderId }],
        });
    }
    // Other filters
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Sorting logic
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // Final query conditions
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    // Fetching results
    const result = yield transactions_model_1.Transaction.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    // Counting total documents
    const total = yield transactions_model_1.Transaction.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.TransactionServices = {
    myTransaction,
};
