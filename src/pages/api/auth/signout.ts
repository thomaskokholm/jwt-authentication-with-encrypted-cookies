// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { USER_TOKEN } from "@/lib/constants";
import { setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      setCookie(USER_TOKEN, "", {
        req,
        res,
        httpOnly: true,
        maxAge: 0,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  }
  return res.status(400).json({ error: { message: "Method not supported" } });
}
