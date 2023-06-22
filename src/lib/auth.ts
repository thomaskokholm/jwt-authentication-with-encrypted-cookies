import hkdf from "@panva/hkdf";
import { EncryptJWT, JWTPayload, jwtDecrypt } from "jose";
import { nanoid } from "nanoid";
import { JWT_SECRET, USER_TOKEN } from "./constants";
import { NextApiRequest } from "next";
import { getCookie } from "cookies-next";

export async function encodeJwt(): Promise<string> {
  const encryptionSecret = await getDerivedEncryptionKey(JWT_SECRET);
  return await new EncryptJWT({})
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .setIssuer("invisilux")
    .setIssuedAt()
    .setSubject("someUserId1234")
    .encrypt(encryptionSecret);
}

export async function decodeJwt(token: string): Promise<JWTPayload> {
  const encryptionSecret = await getDerivedEncryptionKey(JWT_SECRET);
  const { payload } = await jwtDecrypt(token, encryptionSecret, {
    clockTolerance: 15,
  });
  return payload;
}

export async function getDerivedEncryptionKey(secret: string | Buffer) {
  return await hkdf(
    "sha256",
    secret,
    "",
    "NextEcommerce Generated Encryption Key",
    32
  );
}

export async function getToken(
  req: NextApiRequest
): Promise<JWTPayload | null> {
  try {
    const token = getCookie(USER_TOKEN, { req });
    if (token) {
      const jwt = await decodeJwt(token as string);
      if (jwt && jwt.sub) {
        return jwt;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
