import path from "path";
import fs from "fs/promises";
const getDivision = async () => {
  const filePath = path.join(__dirname, "address", "divisions.json");
  const data = await fs.readFile(filePath, "utf-8");
  const divisions = JSON.parse(data);
  return divisions;
};

const getDistricts = async (divisionId: string) => {
  const filePath = path.join(__dirname, "address", "districts.json");
  const data = await fs.readFile(filePath, "utf-8");
  const districtsData = JSON.parse(data);
  const districts = districtsData.filter(
    (district: { division_id: string }) => district.division_id === divisionId
  );
  return districts;
};

const getUpazilas = async (districtId: string) => {
  const filePath = path.join(__dirname, "address", "upazilas.json");
  const data = await fs.readFile(filePath, "utf-8");
  const upazilasData = JSON.parse(data);
  const upazilas = upazilasData.filter(
    (upazila: { district_id: string }) => upazila.district_id === districtId
  );
  return upazilas;
};

const getUnions = async (upazilaId: string) => {
  const filePath = path.join(__dirname, "address", "unions.json");
  const data = await fs.readFile(filePath, "utf-8");
  const unionsData = JSON.parse(data);
  const unions = unionsData.filter(
    (union: { upazila_id: string }) => union.upazila_id === upazilaId
  );
  return unions;
};

export const AddressDataService = {
  getDivision,
  getDistricts,
  getUpazilas,
  getUnions,
};
