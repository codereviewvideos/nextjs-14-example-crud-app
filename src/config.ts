import { AppConfig } from "./types";

const config: AppConfig = {
  db: {
    connectionString: `postgres://app_user:password@0.0.0.0:5684/app_db`,
    poolSize: 4,
  },
};

export default config;
