// src/db/things/delete-one.ts

import pgPool from "../pool";

const deleteOne = async (thingId: number): Promise<boolean> => {
  const client = await pgPool.connect();

  try {
    await client.query("DELETE FROM things WHERE id = $1", [thingId]);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    client.release();
  }
};

export default deleteOne;
