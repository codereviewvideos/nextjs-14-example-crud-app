// src/db/things/update-one.ts

import pgPool from "../pool";
import { Thing } from "@/types";

const updateOne = async (
  thingId: Thing["id"],
  newName: Thing["name"],
  newQuantity: Thing["quantity"],
): Promise<Thing | null> => {
  const client = await pgPool.connect();

  try {
    const result = await client.query(
      "UPDATE things SET name = $1, quantity = $2 WHERE id = $3 RETURNING *",
      [newName, newQuantity, thingId],
    );

    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    client.release();
  }
};

export default updateOne;
