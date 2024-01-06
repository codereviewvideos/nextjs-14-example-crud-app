// src/db/things/add-one.ts

import pgPool from "../pool";
import { Thing } from "@/types";

const addOne = async (
  name: string,
  quantity: number,
): Promise<Thing | null> => {
  const client = await pgPool.connect();

  try {
    const result = await client.query(
      "INSERT INTO things (name, quantity) VALUES ($1, $2) RETURNING *",
      [name, quantity],
    );

    // Return the newly inserted thing
    return result.rows[0];
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    client.release();
  }
};

export default addOne;
