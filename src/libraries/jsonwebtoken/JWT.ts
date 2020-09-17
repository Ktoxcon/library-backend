import * as jsonwebtoken from "jsonwebtoken";
import { configuration } from "../../config";

let { privateKey, algorithm } = configuration.get("jwt") as any;

export const sign = async (
  payload: any,
  options?: { expiresIn?: string | number }
) => {
  return await jsonwebtoken.sign(payload as any, privateKey, {
    algorithm,
    expiresIn: "1h",
    ...options,
  });
};

export const verify = async (token: string) => {
  return await jsonwebtoken.verify(token, privateKey, {
    algorithms: [algorithm],
  });
};
