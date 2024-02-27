"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.status = exports.roles = void 0;
exports.roles = ["user", "agent", "admin"];
exports.status = ["active", "inactive", "block"];
exports.userSearchableFields = ["email", "name", "mobile"];
exports.userFilterableFields = [
    "searchTerm",
    "mobile",
    "email",
    "name",
    "role",
];
