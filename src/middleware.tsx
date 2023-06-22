import { NextRequest, NextResponse } from "next/server";
import { USER_TOKEN } from "./lib/constants";
import { decodeJwt } from "./lib/auth";

export const config = {
  matcher: ["/admin"],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(USER_TOKEN)?.value;
  if (!token) return NextResponse.redirect(new URL("/signin", req.url));
  const payload = await decodeJwt(token);

  console.log("payload", payload);
  if (!payload) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}
