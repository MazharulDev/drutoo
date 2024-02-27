"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cashout = exports.cashoutSchema = void 0;
const mongoose_1 = require("mongoose");
exports.cashoutSchema = new mongoose_1.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receivedId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cashout = (0, mongoose_1.model)("Cashout", exports.cashoutSchema);
