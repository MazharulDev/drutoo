import { ISystem } from "./system.interface";
import { System } from "./system.model";

const systemInfo = async (): Promise<ISystem[] | null> => {
  const result = await System.find({});
  return result;
};

export const SystemServices = {
  systemInfo,
};
