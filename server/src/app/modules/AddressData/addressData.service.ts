import path from "path";
import fs from "fs/promises";
const getDivision = async () => {
  const filePath = path.join(__dirname, "address", "divisions.json");
  const data = await fs.readFile(filePath, "utf-8");
  const divisions = JSON.parse(data);
  return divisions;
};

export const AddressDataService = {
  getDivision,
};
