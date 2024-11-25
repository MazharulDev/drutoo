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
exports.AddressDataService = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const getDivision = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, "address", "divisions.json");
    const data = yield promises_1.default.readFile(filePath, "utf-8");
    const divisions = JSON.parse(data);
    return divisions;
});
const getDistricts = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, "address", "districts.json");
    const data = yield promises_1.default.readFile(filePath, "utf-8");
    const districtsData = JSON.parse(data);
    const districts = districtsData.filter((district) => district.division_id === divisionId);
    return districts;
});
const getUpazilas = (districtId) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, "address", "upazilas.json");
    const data = yield promises_1.default.readFile(filePath, "utf-8");
    const upazilasData = JSON.parse(data);
    const upazilas = upazilasData.filter((upazila) => upazila.district_id === districtId);
    return upazilas;
});
const getUnions = (upazilaId) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, "address", "unions.json");
    const data = yield promises_1.default.readFile(filePath, "utf-8");
    const unionsData = JSON.parse(data);
    const unions = unionsData.filter((union) => union.upazila_id === upazilaId);
    return unions;
});
exports.AddressDataService = {
    getDivision,
    getDistricts,
    getUpazilas,
    getUnions,
};
