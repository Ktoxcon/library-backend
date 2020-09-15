import convict from "convict";

export const configuration = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "test",
    env: "NODE_ENV",
  },
  database: {
    protocol: {
      doc: "Database protocol",
      format: "*",
      default: "mongodb",
      env: "DATABASE_PROTOCOL",
      arg: "database-protocol",
    },
    name: {
      doc: " Database name",
      format: String,
      default: "LibraryDB",
      env: "LIBRARY_DB_NAME",
    },
    port: {
      doc: "Database port",
      format: "port",
      default: 27017,
      env: "LIBRARY_DB_PORT",
    },
    ip: {
      doc: "Database host ip",
      format: String,
      default: "127.0.0.1",
      env: "LIBRARY_DB_HOST_IP",
    },
  },
  server: {
    host: {
      doc: "The IP address to bind",
      format: String,
      default: "127.0.0.1",
      env: "SERVER_ADDRESS",
      arg: "server-address",
    },
    port: {
      doc: "Deafult port of the app",
      format: "port",
      default: 3000,
      env: "SERVER_PORT",
      arg: "server-port",
    },
    endpoint: {
      doc: "Endpoint of the app",
      format: String,
      default: "http://localhost",
      env: "SERVER_ENDPOINT",
      arg: "server-endpoint",
    },
  },
  jwt: {
    algorithm: {
      doc: "The algorithm to use for signing tokens",
      format: ["HS256", "HS384", "HS512"],
      default: "HS256",
      env: "JWT_ALGORITHM",
      arg: "jwt-algorithm",
    },
    privateKey: {
      doc: "privateKey",
      format: "String",
      default: "privateKey",
      env: "JWT_PRIVATE_KEY",
      arg: "jwt-private-key",
    },

    publicKey: {
      doc: "publicKey",
      format: "String",
      default: "publicKey",
      env: "JWT_PUBLIC_KEY",
      arg: "jwt-public-key",
    },
  },
});
