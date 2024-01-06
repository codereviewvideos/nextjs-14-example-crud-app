// src/db/things/get-one.ts

import pgPool from "../pool";
import { Thing } from "@/types";

const getOne = async (thingId: number): Promise<Thing | null> => {
  const client = await pgPool.connect();

  try {
    // Fetch the thing from the database based on its ID
    const result = await client.query("SELECT * FROM things WHERE id = $1", [
      thingId,
    ]);

    if (result.rows.length === 0) {
      console.error(`Thing with id ${thingId} not found`);
      return null; // Thing not found
    }

    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null; // Error occurred
  } finally {
    client.release();
  }
};

export default getOne;
