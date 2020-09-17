import bcrypt from "bcrypt";

export const generatePassword = async (password) => {
  return await new Promise((res, rej) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) rej(err);
      res(hash);
    });
  });
};

export const verifyPassword = async (
  password: any,
  hash: any
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
