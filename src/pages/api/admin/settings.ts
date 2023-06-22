import { getToken } from "@/lib/auth";
import { getProducts } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken(req);
  console.log("TOKEN!!!!", token);
  if (!token)
    return res.status(401).json({ error: { message: "Not authorized" } });

  if (req.method === "GET") {
    const products = await getProducts();
    return res.status(200).json({ success: true, products });
  }
  return res.status(400).json({ error: { message: "Method not supported" } });
}
