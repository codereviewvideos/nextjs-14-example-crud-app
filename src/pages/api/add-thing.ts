// pages/api/add-thing.ts
import { NextApiRequest, NextApiResponse } from "next";
import addOne from "@/db/things/add-one";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, quantity } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ error: "Name and quantity are required" });
  }

  try {
    const parsedQuantity = parseInt(quantity, 10);
    const newThing = await addOne(name, parsedQuantity);

    if (newThing) {
      return res.status(201).json(newThing);
    } else {
      return res.status(500).json({ error: "Failed to insert the new thing" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
