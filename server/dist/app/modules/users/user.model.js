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
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    pin: {
        type: String,
        required: true,
        select: false,
        minlength: 4,
        maxlength: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    nid: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    address: {
        type: {
            division: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            upazila: {
                type: String,
                required: true,
            },
            union: {
                type: String,
                required: true,
            },
        },
    },
    role: {
        type: String,
        enum: user_constant_1.roles,
        required: true,
        default: "user",
    },
    status: {
        type: String,
        enum: user_constant_1.status,
        default: "active",
    },
    bloodGroup: {
        type: String,
        enum: user_constant_1.bloodGroup,
        required: true,
    },
    balance: {
        type: Number,
    },
    gender: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    transactions: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.UserSchema.statics.isUserExist = function (mobile) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ mobile }, { mobile: 1, pin: 1, role: 1 });
    });
};
exports.UserSchema.statics.isPasswordMatched = function (givenPin, savedPin) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPin, savedPin);
    });
};
exports.UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.pin = yield bcrypt_1.default.hash(this.pin, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", exports.UserSchema);
