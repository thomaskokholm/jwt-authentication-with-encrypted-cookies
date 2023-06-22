// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { encodeJwt } from "@/lib/auth";
import { JWT_SECRET, USER_TOKEN } from "@/lib/constants";
import { setCookie } from "cookies-next";
import { EncryptJWT, SignJWT } from "jose";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const token = await encodeJwt();

      setCookie(USER_TOKEN, token, {
        req,
        res,
        httpOnly: true,
        maxAge: 60 * 60 * 2,
      }); // 2 hours in seconds

      return res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  }
  return res.status(400).json({ error: { message: "Method not supported" } });
}
