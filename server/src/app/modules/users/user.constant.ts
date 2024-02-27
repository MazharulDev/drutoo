import { roleType, statusType } from "./user.interface";

export const roles: roleType[] = ["user", "agent", "admin"];
export const status: statusType[] = ["active", "inactive", "block"];

export const userSearchableFields = ["email", "name", "mobile"];

export const userFilterableFields = [
  "searchTerm",
  "mobile",
  "email",
  "name",
  "role",
];
