import { configuration } from "../config";
import { initDataBase } from "./database";
import { initBanner, displayError } from "../libraries";
import { createDefaultUser } from "../controller";
import server from "./server";

const { host, port } = configuration.get("server");

export const startServer = async () => {
  try {
    const dbInitialized = await initDataBase();
    if (dbInitialized) {
      server.listen(port, host);
      const isAdminCreated = await createDefaultUser();
      await initBanner(isAdminCreated);
    }
  } catch (err) {
    displayError(err.name, err.message, err.code);
  }
};
