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
exports.CashinService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../users/user.model");
const transIdGenarate_1 = require("../../../utils/transIdGenarate");
const transactions_model_1 = require("../transactions/transactions.model");
const cashin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receivedId, amount, pin } = payload;
    const session = yield mongoose_1.default.startSession();
    try {
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            // Fetch sender and receiver details
            const sender = yield user_model_1.User.findOne({ mobile: senderId }).session(session);
            const receiver = yield user_model_1.User.findOne({ mobile: receivedId }).session(session);
            if ((receiver === null || receiver === void 0 ? void 0 : receiver.role) !== "user") {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This number is not a personal number");
            }
            if (!sender || !receiver) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Sender or receiver not found");
            }
            //check user pin correct or wrong
            const isUserExist = yield user_model_1.User.isUserExist(senderId);
            if (!isUserExist) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
            }
            if ((sender === null || sender === void 0 ? void 0 : sender.status) === "inactive") {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Your account is inactive");
            }
            if (isUserExist.pin &&
                !(yield user_model_1.User.isPasswordMatched(pin, isUserExist.pin))) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Pin is incorrect");
            }
            //check sender balance
            if (sender.balance < amount) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Insufficient balance");
            }
            // check balance less than 10 taka
            if (sender.balance < 10) {
                throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, "Send less than 10 taka cannot be accepted");
            }
            let transferAmount = Number(amount);
            sender.balance -= Number(transferAmount);
            receiver.balance += Number(amount);
            // Transaction id
            const transId = yield (0, transIdGenarate_1.generateTransactionId)(10);
            // Save updated balances
            yield user_model_1.User.findOneAndUpdate(sender._id, {
                balance: sender.balance,
            });
            yield user_model_1.User.findOneAndUpdate(receiver._id, {
                balance: receiver.balance,
            });
            const transData = {
                senderId: senderId,
                receivedId: receivedId,
                amount: amount,
                transactionId: transId,
                through: "cashin",
            };
            const transHistory = yield transactions_model_1.Transaction.create(transData);
            // push user transaction store array
            yield user_model_1.User.findByIdAndUpdate(sender === null || sender === void 0 ? void 0 : sender._id, {
                $push: { transactions: { $each: [transHistory === null || transHistory === void 0 ? void 0 : transHistory._id], $position: 0 } },
            });
            yield user_model_1.User.findByIdAndUpdate(receiver === null || receiver === void 0 ? void 0 : receiver._id, {
                $push: { transactions: { $each: [transHistory === null || transHistory === void 0 ? void 0 : transHistory._id], $position: 0 } },
            });
        }));
        return `${amount} taka has been cashin to number  ${receivedId}`;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `${error}`);
    }
    finally {
        session.endSession();
    }
});
exports.CashinService = {
    cashin,
};
