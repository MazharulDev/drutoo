"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = exports.systemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.systemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.System = (0, mongoose_1.model)("System", exports.systemSchema);
