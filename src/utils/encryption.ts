import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
let cookie = require("cookie");
let jwt = require("jsonwebtoken");

const key = Buffer.from(process.env.AES_KEY as string, "hex");

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-192-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex").concat(encrypted.toString("hex"));
};

export const decrypt = (text: string) => {
  const iv = Buffer.from(text.substring(0, 32), "hex");
  const encryptedPassword = Buffer.from(text.substring(32), "hex");
  const decipher = crypto.createDecipheriv("aes-192-cbc", Buffer.from(key), iv);

  let decrypted = decipher.update(encryptedPassword);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

// Middleware function
export async function jwtIsValid(request: NextApiRequest, userId: Number) {
  try {
    const cookies = cookie.parse(request.headers.cookie || "");
    const token = cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.userId === userId) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}
