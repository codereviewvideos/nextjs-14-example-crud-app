import pgPool from "../pool";
import { Thing } from "@/types";

const getAll = async () => {
  const client = await pgPool.connect();

  try {
    const result = await client.query("SELECT * FROM things");
    const things: Thing[] = result.rows;
    return things;
  } catch (e) {
    console.error(e);
  } finally {
    client.release();
  }
};

export default getAll;
