// pages/api/update-thing.ts

import { NextApiRequest, NextApiResponse } from "next";
import updateOne from "@/db/things/update-one";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, name, quantity } = req.body;

  if (!id || !name || !quantity) {
    return res
      .status(400)
      .json({ error: "ID, name, and quantity are required" });
  }

  try {
    const parsedId = parseInt(id, 10);
    const parsedQuantity = parseInt(quantity, 10);

    const updatedThing = await updateOne(parsedId, name, parsedQuantity);

    if (updatedThing) {
      return res.status(200).json(updatedThing);
    } else {
      return res.status(404).json({ error: `Thing with ID ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
