import { Pool } from "pg";
import config from "../config";

const getDbPool = new Pool({
  connectionString: config.db.connectionString,
  max: config.db.poolSize,
});

export default getDbPool;
