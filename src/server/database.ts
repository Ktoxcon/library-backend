import mongoose from "mongoose";
import { configuration } from "../config";

const { protocol, ip, port, name } = configuration.get("database");

export const initDataBase = async (): Promise<boolean> => {
  const connection = await mongoose.connect(
    `${protocol}://${ip}:${port}/${name}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  );

  return connection ? true : false;
};
