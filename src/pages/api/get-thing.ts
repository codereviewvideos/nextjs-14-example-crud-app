// pages/api/get-thing.ts

import { NextApiRequest, NextApiResponse } from "next";
import getOne from "@/db/things/get-one";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const requestedId = Array.isArray(id) ? id[0] : id;

  try {
    const thing = await getOne(parseInt(requestedId, 10));

    return res.status(200).json(thing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
