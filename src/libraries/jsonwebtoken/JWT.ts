import * as jsonwebtoken from "jsonwebtoken";
import { configuration } from "../../config";

let { privateKey, publicKey, algorithm } = configuration.get("jwt") as any;

export const sign = async (
  payload: any,
  options?: { expiresIn?: string | number }
) => {
  return await jsonwebtoken.sign(
    payload as any,
    Buffer.from(privateKey, "base64"),
    {
      algorithm,
      expiresIn: "1h",
      ...options,
    }
  );
};

export const verify = async (token: string) => {
  return await jsonwebtoken.verify(token, Buffer.from(publicKey, "base64"), {
    algorithms: [algorithm],
  });
};
