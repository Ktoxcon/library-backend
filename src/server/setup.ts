import { configuration } from "../config";
import { initDataBase } from "./database";
import { initBanner } from "../libraries";
import server from "./server";

const { host, port } = configuration.get("server");

export const startServer = async () => {
  try {
    const dbInitialized = await initDataBase();
    if (dbInitialized) {
      server.listen(port, host);
      await initBanner();
    }
  } catch (err) {}
};
