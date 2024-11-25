"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.bloodGroup = exports.status = exports.roles = void 0;
exports.roles = ["user", "agent", "admin"];
exports.status = ["active", "inactive", "block"];
exports.bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
exports.userSearchableFields = ["email", "name", "mobile"];
exports.userFilterableFields = [
    "searchTerm",
    "mobile",
    "email",
    "name",
    "role",
];
